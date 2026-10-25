import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createHash, timingSafeEqual } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().min(1).max(100),
  email: z.string().email().max(254),
  sector: z.enum(["industrie", "agriculture", "tertiaire", "public", "marine"]),
  message: z.string().max(2000).optional(),
  rgpd: z.literal(true),
  _hp: z.string().max(0), // honeypot — doit être vide
  monthlyBill: z.number().positive().max(1_000_000),
  roi: z.record(z.unknown()).optional(),
});

// Rate limiting simple en mémoire (par IP, reset toutes les heures).
// Pour une vraie prod haute charge : remplacer par Upstash Redis.
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
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
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
  if (parsed.data._hp !== "") {
    // Réponse 200 silencieuse pour ne pas alerter le bot
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 8. Log structuré (remplacer par Resend / SendGrid / webhook Slack en V2)
  // eslint-disable-next-line no-console
  console.info("[contact] nouvelle demande", {
    name: parsed.data.name,
    company: parsed.data.company,
    email: parsed.data.email,
    sector: parsed.data.sector,
    monthlyBill: parsed.data.monthlyBill,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
