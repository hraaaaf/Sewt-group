"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

interface TickerItem {
  label: string;
  value?: string;
}

const items: TickerItem[] = [
  { label: "Puissance installée", value: "2,15 MWc" },
  { label: "Productible Maroc", value: "1 720 kWh/kWc/an" },
  { label: "Projets opérationnels", value: "9" },
  { label: "CO₂ évité", value: "~2 580 tCO₂/an" },
  { label: "Conformité", value: "IEC 61215 / 61730" },
  { label: "Engagement performance", value: "25 ans" },
  { label: "Pôles d'expertise", value: "PV · Thermique · O&M" },
  { label: "Territoire", value: "Maroc" },
];

/**
 * Ticker horizontal scroll-driven.
 * - Le track translate de 0 à -50% pendant que la Hero traverse le viewport.
 * - GSAP fromTo + ScrollTrigger scrub (smooth lerp). Lenis sync via LenisProvider.
 * - Reduced motion : ticker statique centré.
 */
export function HeroTicker({ className }: { className?: string }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track || reduced) return;

      registerGsap();

      const tween = gsap.fromTo(
        track,
        { xPercent: 0 },
        { xPercent: -50, ease: "none" },
      );

      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        animation: tween,
      });

      return () => {
        st.kill();
        tween.kill();
      };
    },
    { dependencies: [reduced] },
  );

  return (
    <div
      ref={wrapperRef}
      role="region"
      aria-label="Indicateurs clés SEWT"
      className={cn(
        "relative overflow-hidden border-y border-border/60 bg-bg-elevated/30 backdrop-blur-glass",
        "mask-fade-x",
        className,
      )}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center gap-12 py-5 will-change-transform"
      >
        {[...items, ...items].map((it, i) => (
          <div
            key={`${it.label}-${i}`}
            className="flex shrink-0 items-baseline gap-3"
            aria-hidden={i >= items.length}
          >
            <span className="font-mono text-xs uppercase tracking-wide text-fg-subtle">
              {it.label}
            </span>
            {it.value ? (
              <span className="font-display text-base font-semibold tracking-tight text-fg tabular-nums sm:text-lg">
                {it.value}
              </span>
            ) : null}
            <span
              aria-hidden
              className="ml-3 inline-block h-1 w-1 shrink-0 rounded-full bg-accent/70"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
