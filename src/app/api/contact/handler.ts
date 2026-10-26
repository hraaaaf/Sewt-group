import { z } from "zod";
import { createHash, createHmac, timingSafeEqual } from "crypto";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const contactSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  company: z.string().max(100).optional(),
  email: z.string().email().max(254),
  submissionId: z.string().uuid(),
  phone: z.string().max(40).optional(),
  sector: z.enum(["industrie", "agriculture", "tertiaire", "public", "marine"]).optional(),
  message: z.string().max(2000).optional(),
  rgpd: z.literal(true),
  _hp: z.string().max(200).optional().default(""),
  monthlyBill: z.number().positive().max(1_000_000).optional(),
  roi: z.record(z.unknown()).optional(),
  source: z.enum(["roi-gate", "contact-form"]).optional(),
});

type ContactRateLimitResult = { success: boolean; reset: number; reason?: string };
type ContactRateLimiter = {
  limit(identifier: string): Promise<ContactRateLimitResult>;
};

type ContactPostOptions = {
  isProduction: boolean;
  // Explicit opt-in is required in the deployed route, pending domain/mailbox setup.
  enabled?: boolean;
  rateLimiter: ContactRateLimiter | null;
  webhookUrl?: string;
  webhookSecret?: string;
  fetcher?: typeof fetch;
  resendApiKey?: string;
  resendFromEmail?: string;
  resendRecipientEmail?: string;
};

const MAX_BODY_BYTES = 32_768;
const RATE_LIMIT = 5;
const RATE_WINDOW = 3600_000;
const developmentRateLimitMap = new Map<string, { count: number; reset: number }>();

export function createRateLimiter(url?: string, token?: string): ContactRateLimiter | null {
  if (!url || !token) return null;

  try {
    if (new URL(url).protocol !== "https:") return null;
    return new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "sewt:contact",
      timeout: 2_000,
    });
  } catch {
    return null;
  }
}

function json(body: unknown, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(body), { ...init, headers });
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = developmentRateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    developmentRateLimitMap.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count += 1;
  return false;
}

function csrfMatch(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

async function readBoundedJson(request: Request): Promise<
  { ok: true; body: unknown } | { ok: false; status: 400 | 413 }
> {
  const reader = request.body?.getReader();
  if (!reader) return { ok: false, status: 400 };

  const chunks: Uint8Array[] = [];
  let byteLength = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      byteLength += value.byteLength;
      if (byteLength > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        return { ok: false, status: 413 };
      }
      chunks.push(value);
    }

    const bytes = new Uint8Array(byteLength);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return { ok: true, body: JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)) };
  } catch {
    return { ok: false, status: 400 };
  }
}

export function createContactPostHandler(options: ContactPostOptions) {
  const { isProduction, rateLimiter, webhookUrl, webhookSecret, resendApiKey, resendFromEmail, resendRecipientEmail } = options;
  const fetcher = options.fetcher ?? fetch;

  return async function POST(request: Request): Promise<Response> {
    if (options.enabled === false) {
      return json({ ok: false, error: "Service e-mail en attente de l'activation du domaine" }, { status: 503 });
    }

    const csrfHeader = request.headers.get("x-csrf-token") ?? "";
    const csrfCookie = request.headers.get("cookie")
      ?.split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("__csrf="))
      ?.slice("__csrf=".length) ?? "";
    if (!csrfHeader || !csrfCookie || !csrfMatch(csrfHeader, csrfCookie)) {
      return json({ ok: false, error: "Forbidden" }, { status: 403 });
    }

    const ip = request.headers.get("x-real-ip")?.trim() ||
      (!isProduction
        ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "localhost"
        : "");
    if (!ip) return json({ ok: false, error: "Protection indisponible" }, { status: 503 });

    if (rateLimiter) {
      try {
        const identifier = createHmac("sha256", webhookSecret ?? resendApiKey ?? "local-rate-limit")
          .update(ip)
          .digest("hex");
        const limit = await rateLimiter.limit(identifier);
        if (limit.reason === "timeout") {
          return json({ ok: false, error: "Protection indisponible" }, { status: 503 });
        }
        if (!limit.success) {
          return json(
            { ok: false, error: "Trop de tentatives. Réessayez dans une heure." },
            { status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000))) } },
          );
        }
      } catch {
        return json({ ok: false, error: "Protection indisponible" }, { status: 503 });
      }
    } else if (isProduction) {
      return json({ ok: false, error: "Protection indisponible" }, { status: 503 });
    } else if (isRateLimited(ip)) {
      return json(
        { ok: false, error: "Trop de tentatives. Réessayez dans une heure." },
        { status: 429 },
      );
    }

    const contentLength = request.headers.get("content-length");
    if (contentLength) {
      const declaredLength = Number(contentLength);
      if (!Number.isSafeInteger(declaredLength) || declaredLength < 0) {
        return json({ ok: false, error: "Invalid content length" }, { status: 400 });
      }
      if (declaredLength > MAX_BODY_BYTES) {
        return json({ ok: false, error: "Payload too large" }, { status: 413 });
      }
    }

    const parsedBody = await readBoundedJson(request);
    if (!parsedBody.ok) {
      return json(
        { ok: false, error: parsedBody.status === 413 ? "Payload too large" : "Invalid JSON" },
        { status: parsedBody.status },
      );
    }

    const parsed = contactSchema.safeParse(parsedBody.body);
    if (!parsed.success) {
      return json(
        { ok: false, error: "Données invalides", issues: parsed.error.flatten() },
        { status: 422 },
      );
    }

    if (parsed.data._hp.trim() !== "") return json({ ok: true }, { status: 200 });

    // The Resend transport is optional and server-side only. The existing
    // authenticated webhook remains available for CRM installations.
    const resendSelected = Boolean(resendApiKey || resendFromEmail || resendRecipientEmail);
    if (resendSelected) {
      // Incomplete settings must fail closed; no silent fallback to another destination.
      const sender = resendFromEmail?.trim() ?? "";
      const receiver = resendRecipientEmail?.trim() ?? "";
      if (
        !resendApiKey?.startsWith("re_") ||
        !sender ||
        /[\r\n]/.test(sender) ||
        !z.string().email().safeParse(receiver).success
      ) {
        return json({ ok: false, error: "Service de contact indisponible" }, { status: 503 });
      }

      const data = parsed.data;
      const message = [
        "Nouvelle demande depuis le site SEWT",
        `Identifiant : ${data.submissionId}`,
        `E-mail : ${data.email}`,
        `Nom : ${data.name ?? "Non indiqué"}`,
        `Société : ${data.company ?? "Non indiquée"}`,
        `Téléphone : ${data.phone ?? "Non indiqué"}`,
        `Secteur : ${data.sector ?? "Non indiqué"}`,
        `Facture mensuelle : ${data.monthlyBill === undefined ? "Non indiquée" : `${data.monthlyBill} MAD`}`,
        "",
        "Message :",
        data.message ?? "(sans message)",
      ].join("\n");
      try {
        const delivery = await fetcher("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
            "Idempotency-Key": `sewt-contact/${data.submissionId}`,
          },
          body: JSON.stringify({
            from: sender,
            to: [receiver],
            reply_to: data.email,
            subject: "Nouvelle demande — site SEWT",
            text: message,
          }),
          cache: "no-store",
          redirect: "error",
          signal: AbortSignal.timeout(5_000),
        });
        if (!delivery.ok) return json({ ok: false, error: "Échec de transmission" }, { status: 502 });
        // Resend accepts the email for delivery; this does not confirm inbox receipt.
        return json({ ok: true }, { status: 200 });
      } catch {
        return json({ ok: false, error: "Échec de transmission" }, { status: 502 });
      }
    }

    if (!webhookUrl || !webhookSecret || webhookSecret.length < 32) {
      return json({ ok: false, error: "Service de contact indisponible" }, { status: 503 });
    }

    let destination: URL;
    try {
      destination = new URL(webhookUrl);
    } catch {
      return json({ ok: false, error: "Service de contact indisponible" }, { status: 503 });
    }
    if (isProduction && destination.protocol !== "https:") {
      return json({ ok: false, error: "Service de contact indisponible" }, { status: 503 });
    }

    try {
      const delivery = await fetcher(destination, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${webhookSecret}`,
          "Idempotency-Key": parsed.data.submissionId,
        },
        body: JSON.stringify({
          event: "contact.submission",
          submissionId: parsed.data.submissionId,
          submittedAt: new Date().toISOString(),
          data: {
            name: parsed.data.name,
            company: parsed.data.company,
            email: parsed.data.email,
            phone: parsed.data.phone,
            sector: parsed.data.sector,
            message: parsed.data.message,
            monthlyBill: parsed.data.monthlyBill,
            roi: parsed.data.roi,
            source: parsed.data.source,
          },
        }),
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(5_000),
      });
      if (!delivery.ok) return json({ ok: false, error: "Échec de transmission" }, { status: 502 });
    } catch {
      return json({ ok: false, error: "Échec de transmission" }, { status: 502 });
    }

    return json({ ok: true }, { status: 200 });
  };
}
