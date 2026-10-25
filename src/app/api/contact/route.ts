import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createHash, createHmac, timingSafeEqual } from "crypto";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { serverEnv } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  company: z.string().max(100).optional(),
  email: z.string().email().max(254),
  phone: z.string().max(40).optional(),
  sector: z.enum(["industrie", "agriculture", "tertiaire", "public", "marine"]).optional(),
  message: z.string().max(2000).optional(),
  rgpd: z.literal(true),
  _hp: z.string().max(200).optional().default(""), // honeypot
  monthlyBill: z.number().positive().max(1_000_000),
  roi: z.record(z.unknown()).optional(),
  source: z.enum(["roi-gate", "contact-form"]).optional(),
});

// Shared across serverless instances; production requires the Redis credentials.
const rateLimiter = serverEnv.UPSTASH_REDIS_REST_URL && serverEnv.UPSTASH_REDIS_REST_TOKEN
  ? new Ratelimit({
      redis: new Redis({ url: serverEnv.UPSTASH_REDIS_REST_URL, token: serverEnv.UPSTASH_REDIS_REST_TOKEN }),
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "sewt:contact",
      timeout: 2_000,
    })
  : null;

// Development fallback only; it is never used as production protection.
const rateLimitMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;       // max 5 soumissions
const RATE_WINDOW = 3600_000; // par heure

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + RATE_WINDOW });
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

export async function POST(request: NextRequest): Promise<NextResponse> {
  // 1. CSRF double-submit cookie validation
  const csrfHeader = request.headers.get("x-csrf-token") ?? "";
  const csrfCookie = request.cookies?.get("__csrf")?.value ?? "";
  if (!csrfHeader || !csrfCookie || !csrfMatch(csrfHeader, csrfCookie)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  // 3. Rate limiting par IP
  const ip = request.headers.get("x-real-ip")?.trim() ||
    (process.env.NODE_ENV !== "production"
      ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "localhost"
      : "");
  if (!ip) {
    return NextResponse.json({ ok: false, error: "Protection indisponible" }, { status: 503 });
  }

  if (rateLimiter) {
    try {
      const identifier = createHmac("sha256", serverEnv.CONTACT_WEBHOOK_SECRET ?? "local-rate-limit")
        .update(ip)
        .digest("hex");
      const limit = await rateLimiter.limit(identifier);
      if (limit.reason === "timeout") {
        return NextResponse.json({ ok: false, error: "Protection indisponible" }, { status: 503 });
      }
      if (!limit.success) {
        return NextResponse.json(
          { ok: false, error: "Trop de tentatives. Réessayez dans une heure." },
          { status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000))) } },
        );
      }
    } catch {
      return NextResponse.json({ ok: false, error: "Protection indisponible" }, { status: 503 });
    }
  } else if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false, error: "Protection indisponible" }, { status: 503 });
  } else if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Trop de tentatives. Réessayez dans une heure." },
      { status: 429 },
    );
  }

  // 4. Vérification taille
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 32_768) {
    return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  // 5. Parsing
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // 6. Validation Zod
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Données invalides", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  // 7. Honeypot : bot détecté si _hp non vide
  if (parsed.data._hp.trim() !== "") {
    // Réponse 200 silencieuse pour ne pas alerter le bot
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const { CONTACT_WEBHOOK_URL, CONTACT_WEBHOOK_SECRET } = serverEnv;
  if (!CONTACT_WEBHOOK_URL || !CONTACT_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, error: "Service de contact indisponible" }, { status: 503 });
  }

  const webhookUrl = new URL(CONTACT_WEBHOOK_URL);
  if (process.env.NODE_ENV === "production" && webhookUrl.protocol !== "https:") {
    return NextResponse.json({ ok: false, error: "Service de contact indisponible" }, { status: 503 });
  }

  try {
    const delivery = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${CONTACT_WEBHOOK_SECRET}` },
      body: JSON.stringify({
        event: "contact.submission",
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
    if (!delivery.ok) {
      return NextResponse.json({ ok: false, error: "Échec de transmission" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "Échec de transmission" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
