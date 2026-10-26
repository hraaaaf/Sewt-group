import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { serverEnv } from "@/lib/env";
import {
  webhookPayloadSchema,
  type ProjectInput,
} from "@/lib/validations/project";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json(
    { ok: false, error: "Unauthorized" },
    {
      status: 401,
      headers: { "WWW-Authenticate": 'Bearer realm="sewt-erp"' },
    },
  );
}

// Hash les deux chaînes avant comparaison : masque la longueur réelle
// et délègue la comparaison timing-safe à la librairie crypto native.
function safeCompare(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export async function POST(request: Request): Promise<NextResponse> {
  // 1. Vérifier la configuration serveur
  const expected = serverEnv.ERP_WEBHOOK_SECRET;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "Service unavailable" },
      { status: 503 },
    );
  }

  // 2. Vérification taille du payload avant parsing
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 1_048_576) {
    return NextResponse.json(
      { ok: false, error: "Payload too large" },
      { status: 413 },
    );
  }

  // 3. Authentification (timing-safe via crypto native)
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    return unauthorized();
  }
  const provided = authHeader.slice("Bearer ".length).trim();
  if (!safeCompare(provided, expected)) {
    return unauthorized();
  }

  // 4. Parsing JSON
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  // 5. Validation Zod
  const parsed = webhookPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Payload validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  // 6. Normalisation : un projet seul devient un lot de 1
  const projects: ProjectInput[] = Array.isArray(parsed.data)
    ? parsed.data
    : [parsed.data];

  // eslint-disable-next-line no-console
  console.info(
    `[webhook/projects] ${projects.length} projet(s) reçu(s) : ${projects
      .map((p) => p.slug)
      .join(", ")}`,
  );

  // 7. Invalidation des caches Next.js
  try {
    revalidateTag("projects");
    revalidatePath("/");
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("[webhook/projects] revalidation soft-error:", err);
    }
  }

  return NextResponse.json(
    {
      ok: true,
      received: projects.length,
      slugs: projects.map((p) => p.slug),
      revalidatedAt: new Date().toISOString(),
    },
    { status: 200 },
  );
}

// GET supprimé — ne pas exposer le schéma d'auth ni l'état de configuration.
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ ok: true }, { status: 200 });
}
