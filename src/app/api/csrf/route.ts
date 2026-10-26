import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  const token = randomBytes(32).toString("hex");
  const res = NextResponse.json({ token });
  res.cookies.set("__csrf", token, {
    httpOnly: false,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 3600,
  });
  return res;
}
