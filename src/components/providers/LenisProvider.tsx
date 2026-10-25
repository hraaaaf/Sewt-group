"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    registerGsap();

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      lerp: 0.1,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
