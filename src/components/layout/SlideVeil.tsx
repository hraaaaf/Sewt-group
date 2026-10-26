"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SlideInDetail {
  dir: 1 | -1;
  targetY: number;
  onMidpoint: () => void;
}

export function SlideVeil() {
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const veil = veilRef.current;
    if (!veil) return;

    const onSlideIn = (e: Event) => {
      const { onMidpoint } = (e as CustomEvent<SlideInDetail>).detail;

      veil.style.pointerEvents = "all";

      const tl = gsap.timeline({
        onComplete: () => {
          veil.style.pointerEvents = "none";
          window.dispatchEvent(new CustomEvent("sewt:slide-done"));
        },
      });

      tl.fromTo(
        veil,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.08,
          ease: "none",
          onComplete: () => {
            onMidpoint();
          },
        },
      ).to(veil, {
        opacity: 0,
        duration: 0.12,
        ease: "power2.out",
      });
    };

    window.addEventListener("sewt:slide-in", onSlideIn);
    return () => window.removeEventListener("sewt:slide-in", onSlideIn);
  }, []);

  return (
    <div
      ref={veilRef}
      aria-hidden
      style={{
        opacity: 0,
        pointerEvents: "none",
      }}
      className="fixed inset-0 z-[60] bg-bg"
    />
  );
}
