"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

interface CounterProps {
  /** Valeur cible. */
  to: number;
  /** Valeur de départ. */
  from?: number;
  /** Durée de l'animation (s). */
  duration?: number;
  /** Décimales affichées. */
  decimals?: number;
  /** Préfixe (ex: "+"). */
  prefix?: string;
  /** Suffixe / unité (ex: "MW", "%"). */
  suffix?: string;
  /** Séparateur de milliers. */
  thousands?: "space" | "comma" | "none";
  /** Séparateur décimal — par défaut "." (notation tech), "," pour le FR éditorial. */
  decimalSeparator?: "." | ",";
  /** Easing GSAP. */
  ease?: string;
  /** Re-jouer à chaque entrée dans le viewport. */
  replay?: boolean;
  className?: string;
}

function format(
  value: number,
  decimals: number,
  thousands: CounterProps["thousands"],
  decimalSeparator: "." | "," = ".",
): string {
  const fixed = value.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  const safeInt = intPart ?? "0";
  let withSep = safeInt;
  if (thousands !== "none") {
    const sep = thousands === "comma" ? "," : " ";
    withSep = safeInt.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  }
  return decPart ? `${withSep}${decimalSeparator}${decPart}` : withSep;
}

export function Counter({
  to,
  from = 0,
  duration = 2.2,
  decimals = 0,
  prefix,
  suffix,
  thousands = "space",
  decimalSeparator = ".",
  ease = "expo.out",
  replay = true,
  className,
}: CounterProps) {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const valueRef = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const node = valueRef.current;
      const trigger = wrapperRef.current;
      if (!node || !trigger) return;
      registerGsap();

      node.textContent = format(from, decimals, thousands, decimalSeparator);

      if (reduced) {
        node.textContent = format(to, decimals, thousands, decimalSeparator);
        return;
      }

      const state = { v: from };
      const st = ScrollTrigger.create({
        trigger,
        start: "top 85%",
        once: !replay,
        onEnter: () => {
          gsap.to(state, {
            v: to,
            duration,
            ease,
            onUpdate: () => {
              node.textContent = format(state.v, decimals, thousands, decimalSeparator);
            },
          });
        },
        onLeaveBack: replay
          ? () => {
              state.v = from;
              node.textContent = format(from, decimals, thousands, decimalSeparator);
            }
          : undefined,
      });

      return () => {
        st.kill();
      };
    },
    {
      dependencies: [
        to, from, duration, decimals, ease, replay, reduced, thousands, decimalSeparator,
      ],
    },
  );

  // SSR : on rend la valeur FINALE directement → pas de flash "0" pendant
  // l'hydratation. useGSAP remplacera par `from` au mount client, puis animera.
  return (
    <span ref={wrapperRef} className={cn("tabular-nums", className)}>
      {prefix ? <span className="text-fg-subtle">{prefix}</span> : null}
      <span ref={valueRef}>{format(to, decimals, thousands, decimalSeparator)}</span>
      {suffix ? <span className="ml-1 text-fg-subtle">{suffix}</span> : null}
    </span>
  );
}
