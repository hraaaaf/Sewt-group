import { NextResponse } from "next/server";
import { projects } from "@/data/projects";
import type { Sector } from "@/types/project";

/**
 * GET /api/projects
 * -----------------------------------------------------------------------------
 * Endpoint public de lecture des projets.
 *
 * Query params (tous optionnels) :
 *   ?sector=marine|agriculture|industrie|tertiaire|public
 *   ?year=2024
 *   ?limit=10 (1..50, défaut 50)
 *
 * Cache : `s-maxage=300, stale-while-revalidate=86400` côté CDN.
 * Invalidation : déclenchée par `revalidateTag('projects')` depuis le webhook
 * `POST /api/webhook/projects`.
 *
 * V1 lit `data/projects.ts` (hardcoded typé). V2 lira la couche de persistance.
 */
export const runtime = "nodejs";
export const revalidate = 300;

const VALID_SECTORS: ReadonlyArray<Sector> = [
  "agriculture",
  "industrie",
  "tertiaire",
  "public",
  "marine",
];

function isSector(value: string): value is Sector {
  return (VALID_SECTORS as readonly string[]).includes(value);
}

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const sectorParam = url.searchParams.get("sector");
  const yearParam = url.searchParams.get("year");
  const limitParam = url.searchParams.get("limit");

  let result = [...projects];

  if (sectorParam) {
    if (!isSector(sectorParam)) {
      return NextResponse.json(
        {
          ok: false,
          error: `Paramètre sector invalide. Valeurs autorisées : ${VALID_SECTORS.join(", ")}.`,
        },
        { status: 400 },
      );
    }
    result = result.filter((p) => p.sector === sectorParam);
  }

  if (yearParam) {
    const year = Number(yearParam);
    if (!Number.isInteger(year) || year < 1990 || year > 2050) {
      return NextResponse.json(
        { ok: false, error: "Paramètre year invalide (entier 1990–2050)." },
        { status: 400 },
      );
    }
    result = result.filter((p) => p.year === year);
  }

  let limit = 50;
  if (limitParam) {
    const n = Number(limitParam);
    if (!Number.isInteger(n) || n < 1 || n > 50) {
      return NextResponse.json(
        { ok: false, error: "Paramètre limit invalide (entier 1–50)." },
        { status: 400 },
      );
    }
    limit = n;
  }

  return NextResponse.json(
    {
      ok: true,
      count: result.length,
      total: projects.length,
      projects: result.slice(0, limit),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
      },
    },
  );
}
