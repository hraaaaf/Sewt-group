"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "./useReducedMotion";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animates a number from ~55% of `end` to `end` when `ref` enters the viewport.
 * Returns `end` immediately (SSR-safe, no hydration mismatch).
 * Respects prefers-reduced-motion — no animation, returns static `end`.
 * Fires once per lifecycle.
 */
export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  end: number,
  duration = 1000,
): number {
  const [value, setValue] = useState(end);
  const prefersReduced = useReducedMotion();
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasRun.current) return;
        hasRun.current = true;
        observer.disconnect();

        // Start at ≥55 % of end — never at 0, never visually jarring
        const from = Math.max(Math.ceil(end * 0.55), 1);
        const startTime = performance.now();
        let rafId = 0;

        const tick = (now: number) => {
          const progress = Math.min(1, (now - startTime) / duration);
          const eased = easeOutCubic(progress);
          setValue(Math.round(from + (end - from) * eased));
          if (progress < 1) {
            rafId = requestAnimationFrame(tick);
          } else {
            setValue(end);
          }
        };
        rafId = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(rafId);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, end, duration, prefersReduced]);

  return value;
}
