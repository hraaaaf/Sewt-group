import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest): NextResponse {
  const response = NextResponse.next();

  // Bloquer les méthodes HTTP non utilisées sur les API routes
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api/")) {
    const method = request.method.toUpperCase();
    const allowedMethods: Record<string, string[]> = {
      "/api/contact": ["POST"],
      "/api/webhook/projects": ["POST", "GET"],
      "/api/projects": ["GET"],
    };
    const allowed = allowedMethods[pathname];
    if (allowed && !allowed.includes(method)) {
      return new NextResponse(null, {
        status: 405,
        headers: { Allow: allowed.join(", ") },
      });
    }

    // Headers API : no-store systématique sauf si la route overrides
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("X-Content-Type-Options", "nosniff");
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
