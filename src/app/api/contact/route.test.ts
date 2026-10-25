import assert from "node:assert/strict";
import { test } from "node:test";
import { createContactPostHandler } from "./handler";
import { createRateLimiter } from "./handler";
import { parseServerEnv } from "@/lib/env-schema";

const csrfToken = "contact-test-csrf-token";
const webhookSecret = "test-webhook-secret-that-is-at-least-32-characters";
const submissionId = "11111111-1111-4111-8111-111111111111";
const validContact = {
  name: "Samira Test",
  company: "SEWT Test",
  email: "prospect@example.test",
  submissionId,
  phone: "+212600000000",
  sector: "industrie",
  message: "Test integration",
  monthlyBill: 15_000,
  roi: { annualSavings: 120_000 },
  rgpd: true,
  _hp: "",
  source: "contact-form",
};

function requestFor(
  body: unknown = validContact,
  options: { csrf?: string; cookie?: string; ip?: string } = {},
) {
  const headers = new Headers({
    "content-type": "application/json",
    "x-csrf-token": options.csrf ?? csrfToken,
    "x-real-ip": options.ip ?? "203.0.113.42",
  });
  if (options.cookie !== undefined) headers.set("cookie", options.cookie);
  else headers.set("cookie", `__csrf=${csrfToken}`);

  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

function allowedRateLimiter() {
  return { limit: async (_identifier: string) => ({ success: true, reset: Date.now() + 60_000 }) };
}

type TestRateLimiter = {
  limit(identifier: string): Promise<{ success: boolean; reset: number; reason?: string }>;
};

function makeHandler(options: {
  isProduction?: boolean;
  rateLimiter?: TestRateLimiter | null;
  webhookUrl?: string | null;
  webhookSecret?: string | null;
  fetcher?: typeof fetch;
} = {}) {
  return createContactPostHandler({
    isProduction: options.isProduction ?? true,
    rateLimiter: options.rateLimiter === undefined ? allowedRateLimiter() : options.rateLimiter,
    webhookUrl: options.webhookUrl === null ? undefined : options.webhookUrl ?? "https://receiver.example.test/leads",
    webhookSecret: options.webhookSecret === null ? undefined : options.webhookSecret ?? webhookSecret,
    fetcher: options.fetcher ?? (async () => new Response(null, { status: 202 })),
  });
}

async function statusOf(
  handler: ReturnType<typeof createContactPostHandler>,
  body: unknown = validContact,
) {
  return (await handler(requestFor(body))).status;
}

test("partial optional service configuration parses without throwing", () => {
  assert.doesNotThrow(() => parseServerEnv({ CONTACT_WEBHOOK_URL: "https://receiver.example.test" }));
  assert.doesNotThrow(() => parseServerEnv({ CONTACT_WEBHOOK_SECRET: webhookSecret }));
  assert.doesNotThrow(() => parseServerEnv({ UPSTASH_REDIS_REST_URL: "https://redis.example.test" }));
  assert.doesNotThrow(() => parseServerEnv({ UPSTASH_REDIS_REST_TOKEN: "token" }));
});

test("rate limiting is unavailable unless both valid Redis settings are present", () => {
  assert.equal(createRateLimiter("https://redis.example.test", undefined), null);
  assert.equal(createRateLimiter(undefined, "token"), null);
  assert.equal(createRateLimiter("http://redis.example.test", "token"), null);
});

test("invalid CSRF returns 403 before rate limiting or delivery", async () => {
  let rateLimitCalls = 0;
  let deliveryCalls = 0;
  const handler = makeHandler({
    rateLimiter: { limit: async () => { rateLimitCalls += 1; return { success: true, reset: Date.now() }; } },
    fetcher: async () => { deliveryCalls += 1; return new Response(null, { status: 202 }); },
  });
  const response = await handler(requestFor(validContact, { csrf: "wrong", cookie: `__csrf=${csrfToken}` }));

  assert.equal(response.status, 403);
  assert.equal(rateLimitCalls, 0);
  assert.equal(deliveryCalls, 0);
});

test("invalid contact data returns 422", async () => {
  assert.equal(await statusOf(makeHandler(), { ...validContact, email: "not-an-email" }), 422);
});

test("a body larger than 32 KiB is rejected even without Content-Length", async () => {
  const tooLarge = { ...validContact, message: "x".repeat(33_000) };
  assert.equal(await statusOf(makeHandler(), tooLarge), 413);
});

test("rate limited requests return 429", async () => {
  const handler = makeHandler({
    rateLimiter: { limit: async () => ({ success: false, reset: Date.now() + 30_000 }) },
  });
  const response = await handler(requestFor());

  assert.equal(response.status, 429);
  assert.ok(Number(response.headers.get("retry-after")) > 0);
});

test("Redis timeout or error returns 503", async () => {
  const timedOut = makeHandler({
    rateLimiter: { limit: async () => ({ success: true, reset: Date.now(), reason: "timeout" }) },
  });
  const unavailable = makeHandler({ rateLimiter: { limit: async () => { throw new Error("Redis unavailable"); } } });

  assert.equal(await statusOf(timedOut), 503);
  assert.equal(await statusOf(unavailable), 503);
});

test("production without a complete Redis or webhook configuration returns 503", async () => {
  assert.equal(await statusOf(makeHandler({ rateLimiter: null })), 503);
  assert.equal(await statusOf(makeHandler({ webhookUrl: null, webhookSecret: null })), 503);
  assert.equal(await statusOf(makeHandler({ webhookUrl: "not a URL" })), 503);
  assert.equal(await statusOf(makeHandler({ webhookSecret: "short" })), 503);
});

test("webhook rejection or timeout returns 502 without logging prospect data", async () => {
  const originalInfo = console.info;
  const originalError = console.error;
  const logs: unknown[][] = [];
  console.info = (...args: unknown[]) => { logs.push(args); };
  console.error = (...args: unknown[]) => { logs.push(args); };

  try {
    const rejected = makeHandler({ fetcher: async () => new Response(null, { status: 500 }) });
    const timedOut = makeHandler({ fetcher: async () => { throw new Error("webhook timeout"); } });
    assert.equal(await statusOf(rejected), 502);
    assert.equal(await statusOf(timedOut), 502);
  } finally {
    console.info = originalInfo;
    console.error = originalError;
  }

  assert.equal(JSON.stringify(logs).includes(validContact.email), false);
});

test("a successful webhook acknowledges the contact and receives the complete payload", async () => {
  let delivery: { url: string; authorization: string | null; idempotencyKey: string | null; body: Record<string, unknown> } | undefined;
  const handler = makeHandler({
    fetcher: async (input, init) => {
      delivery = {
        url: String(input),
        authorization: new Headers(init?.headers).get("authorization"),
        idempotencyKey: new Headers(init?.headers).get("Idempotency-Key"),
        body: JSON.parse(String(init?.body)) as Record<string, unknown>,
      };
      return new Response(null, { status: 202 });
    },
  });
  const response = await handler(requestFor());

  assert.equal(response.status, 200);
  assert.equal(delivery?.url, "https://receiver.example.test/leads");
  assert.equal(delivery?.authorization, `Bearer ${webhookSecret}`);
  assert.equal(delivery?.idempotencyKey, submissionId);
  assert.equal(delivery?.body.event, "contact.submission");
  assert.equal(delivery?.body.submissionId, submissionId);
  assert.equal((delivery?.body.data as typeof validContact).email, validContact.email);
});

test("ROI gate and contact form payload shapes are both accepted", async () => {
  const handler = makeHandler();
  const roiGate = {
    email: "roi@example.test",
    submissionId: "22222222-2222-4222-8222-222222222222",
    phone: "+212611111111",
    monthlyBill: 15_000,
    roi: { annualSavings: 120_000 },
    rgpd: true,
    source: "roi-gate",
  };
  const contactForm = { ...validContact, _hp: "" };

  assert.equal(await statusOf(handler, roiGate), 200);
  assert.equal(await statusOf(handler, contactForm), 200);
});
