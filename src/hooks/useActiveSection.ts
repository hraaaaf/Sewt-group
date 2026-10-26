"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy : retourne l'id de la section actuellement la plus visible.
 * Utilise IntersectionObserver (passif, zéro listener scroll).
 *
 * @param ids — liste ordonnée d'ids `<section id="...">` à surveiller.
 * @param rootMargin — zone d'activation. Par défaut, on cible la mi-viewport.
 */
export function useActiveSection(
  ids: readonly string[],
  rootMargin = "-40% 0% -55% 0%",
): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Map id → ratio courant pour résolution multi-visibilité
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        // Pick the entry with highest current ratio
        let bestId: string | null = null;
        let bestRatio = 0;
        ratios.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        });
        if (bestId) setActive(bestId);
      },
      {
        rootMargin,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}
