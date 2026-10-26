"use client";

import { cn } from "@/lib/cn";

interface ProgressCounterProps {
  /** Valeur cible finale. */
  to: number;
  /** Progress 0→1 (généralement issu d'un ChapterStage). Hors viewport = 0, fin = 1. */
  progress: number;
  decimals?: number;
  thousands?: "space" | "comma" | "none";
  decimalSeparator?: "." | ",";
  className?: string;
}

function format(
  value: number,
  decimals: number,
  thousands: ProgressCounterProps["thousands"],
  decSep: "." | ",",
): string {
  const fixed = value.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  const safeInt = intPart ?? "0";
  let withSep = safeInt;
  if (thousands && thousands !== "none") {
    const sep = thousands === "comma" ? "," : " ";
    withSep = safeInt.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  }
  return decPart ? `${withSep}${decSep}${decPart}` : withSep;
}

/**
 * ProgressCounter — affiche `to * progress` formaté. Pure fonction du progress
 * du chapitre parent : pas de timer, pas de GSAP. Le chiffre monte au rythme
 * exact du scroll utilisateur dans le chapitre pinned.
 */
export function ProgressCounter({
  to,
  progress,
  decimals = 0,
  thousands = "space",
  decimalSeparator = ".",
  className,
}: ProgressCounterProps) {
  const clamped = Math.min(1, Math.max(0, progress));
  const value = to * clamped;
  return (
    <span className={cn("tabular-nums", className)}>
      {format(value, decimals, thousands, decimalSeparator)}
    </span>
  );
}
