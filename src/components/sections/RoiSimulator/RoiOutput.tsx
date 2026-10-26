"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedNumberProps {
  value: number;
  format: (v: number) => string;
  className?: string;
}

/**
 * Numéro animé piloté par Framer Motion (`useSpring`).
 * - Zéro re-render React par frame : on écrit directement dans `textContent`.
 * - Respecte `prefers-reduced-motion` : snap direct sans spring.
 */
function AnimatedNumber({ value, format, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, {
    stiffness: 110,
    damping: 26,
    mass: 0.7,
  });

  useEffect(() => {
    if (reduced) {
      motionValue.jump(value);
      if (ref.current) ref.current.textContent = format(value);
    } else {
      motionValue.set(value);
    }
  }, [value, motionValue, reduced, format]);

  useMotionValueEvent(spring, "change", (latest) => {
    if (ref.current) ref.current.textContent = format(latest);
  });

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {format(value)}
    </span>
  );
}

export interface RoiOutputProps {
  label: string;
  value: number;
  format: (v: number) => string;
  unit?: string;
  icon: LucideIcon;
  hint?: ReactNode;
  emphasis?: "default" | "primary";
  className?: string;
}

/**
 * Carte d'un indicateur ROI.
 * `emphasis="primary"` met en avant un indicateur clé (économie 10 ans).
 */
export function RoiOutput({
  label,
  value,
  format,
  unit,
  icon: Icon,
  hint,
  emphasis = "default",
  className,
}: RoiOutputProps) {
  return (
    <div
      className={cn(
        "group/output relative isolate overflow-hidden rounded-lg p-5 sm:p-6",
        "border border-border/60 bg-bg-elevated/40 backdrop-blur-glass",
        "transition-all duration-base ease-out-expo",
        emphasis === "primary"
          ? "border-accent/40 bg-accent/5"
          : "hover:border-accent/30 hover:bg-white/[0.02] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(var(--accent-rgb),0.03)]",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-pill",
            emphasis === "primary"
              ? "bg-accent/20 text-accent"
              : "bg-surface text-fg-muted",
          )}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle sm:text-xs">
          {label}
        </p>
      </div>

      <div className="mt-5 flex items-baseline gap-2">
        <AnimatedNumber
          value={value}
          format={format}
          className={cn(
            "font-display font-semibold tracking-tight text-fg",
            emphasis === "primary" ? "text-h2" : "text-h3",
          )}
        />
        {unit ? (
          <span className="font-mono text-xs uppercase tracking-wide text-fg-subtle">
            {unit}
          </span>
        ) : null}
      </div>

      {hint ? (
        <p className="mt-3 text-xs text-fg-muted">{hint}</p>
      ) : null}

      {/* Lueur accent discrète sur emphasis primary */}
      {emphasis === "primary" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/20 blur-2xl"
        />
      ) : null}
    </div>
  );
}
