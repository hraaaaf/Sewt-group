"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle transition-colors hover:text-accent"
      aria-label="Retour en haut de page"
    >
      <ArrowUp className="h-3.5 w-3.5" aria-hidden />
      Retour en haut
    </button>
  );
}
