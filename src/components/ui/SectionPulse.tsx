"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * SectionPulse — petit indicateur "loading" qui pulse quand une section est
 * partiellement visible mais pas encore complètement activée (avant que
 * l'IntersectionObserver à threshold > 0.4 ne déclenche l'auto-play).
 *
 * Donne un feedback visuel à l'utilisateur : "quelque chose va se passer".
 *
 * Disparaît automatiquement quand `triggered` passe à true.
 */
interface SectionPulseProps {
  /** Élément à observer. Le pulse s'affiche quand l'élément est partiellement visible (15-44 %). */
  targetRef: React.RefObject<HTMLElement>;
  /** True quand l'animation principale a démarré. Le pulse disparaît. */
  triggered: boolean;
  className?: string;
}

export function SectionPulse({ targetRef, triggered, className }: SectionPulseProps) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const dismissedRef = useRef(false);

  useEffect(() => {
    if (reduced) return;
    const el = targetRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (dismissedRef.current) return;
        const ratio = entries[0]?.intersectionRatio ?? 0;
        // Visible mais pas encore activé (entre 15% et 44%)
        setVisible(ratio > 0.15 && ratio < 0.45);
      },
      { threshold: [0, 0.15, 0.3, 0.45, 0.6] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [targetRef, reduced]);

  useEffect(() => {
    if (triggered) {
      dismissedRef.current = true;
      setVisible(false);
    }
  }, [triggered]);

  if (reduced || !visible) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "z-10",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-3 w-3">
          <motion.span
            className="absolute inset-0 rounded-full bg-accent"
            animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute inset-0 rounded-full bg-accent"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          Continuez à scroller
        </p>
      </div>
    </div>
  );
}
