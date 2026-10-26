"use client";

import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";

interface ChapterLink {
  id: string;
  index: string;
  label: string;
}

const chapters: ChapterLink[] = [
  { id: "vision", index: "01", label: "Vision" },
  { id: "offre", index: "02", label: "Offre" },
  { id: "preuve", index: "03", label: "Preuve" },
  { id: "methode", index: "04", label: "Méthode" },
  { id: "roi", index: "05", label: "Simulateur" },
  { id: "contact", index: "06", label: "Contact" },
];

const ids = chapters.map((c) => c.id);

/**
 * ChapterIndex — fil d'Ariane vertical fixe sur le côté droit, desktop only.
 *
 *  - Scroll-spy via `useActiveSection` (IntersectionObserver, zero scroll listener).
 *  - Hover : trait s'allonge + label apparaît à gauche.
 *  - Active : trait ambre étendu + label visible.
 *  - Click : scroll natif (Lenis intercepte et lisse automatiquement).
 *  - Caché < 880px (le mini-fil d'Ariane bottom prend le relais sur mobile).
 *
 * Remplace simultanément `ScrollProgress` + `BackToTop` (audit P1).
 */
export function ChapterIndex() {
  const active = useActiveSection(ids);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav
      aria-label="Chapitres"
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 lg:flex"
    >
      {chapters.map((c) => {
        const isActive = active === c.id;
        return (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-current={isActive ? "location" : undefined}
            className={cn(
              "pointer-events-auto group/cha flex items-center gap-3 py-1.5",
              "transition-colors duration-base ease-out-expo",
              isActive ? "text-accent" : "text-fg-subtle hover:text-fg",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "h-px transition-all duration-slow ease-out-expo",
                isActive
                  ? "w-12 bg-accent"
                  : "w-6 bg-fg-subtle group-hover/cha:w-9 group-hover/cha:bg-fg",
              )}
            />
            <span
              className={cn(
                "whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em]",
                "transition-all duration-base ease-out-expo",
                isActive
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-1 opacity-0 group-hover/cha:translate-x-0 group-hover/cha:opacity-100",
              )}
            >
              {c.index} — {c.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
