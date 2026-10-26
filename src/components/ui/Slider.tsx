"use client";

import { useId, useMemo, type ChangeEvent } from "react";
import { cn } from "@/lib/cn";

interface SliderProps {
  label: string;
  /** Valeur affichée à côté du label (déjà formatée). */
  valueLabel?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  /** Description optionnelle sous le slider. */
  hint?: string;
  /** Unité affichée à droite du min/max. */
  unit?: string;
  className?: string;
}

export function Slider({
  label,
  valueLabel,
  min,
  max,
  step = 1,
  value,
  onChange,
  hint,
  unit,
  className,
}: SliderProps) {
  const id = useId();
  const progress = useMemo(() => {
    if (max === min) return 0;
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="font-mono text-xs uppercase tracking-wide text-fg-subtle"
        >
          {label}
        </label>
        {valueLabel ? (
          <span className="font-display text-h3 font-semibold tracking-tight text-fg tabular-nums">
            {valueLabel}
          </span>
        ) : null}
      </div>

      <div className="relative mt-4">
        <div
          aria-hidden
          className="h-1.5 w-full rounded-pill bg-surface"
          style={
            {
              backgroundImage:
                "linear-gradient(to right, rgb(var(--accent-rgb)) var(--progress), transparent var(--progress))",
              ["--progress" as string]: `${progress}%`,
            } as React.CSSProperties
          }
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={label}
          className={cn(
            "absolute inset-0 h-1.5 w-full cursor-pointer appearance-none bg-transparent",
            // WebKit thumb
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5",
            "[&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:bg-accent",
            "[&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-bg",
            "[&::-webkit-slider-thumb]:shadow-glow",
            "[&::-webkit-slider-thumb]:transition-transform",
            "[&::-webkit-slider-thumb]:duration-fast",
            "[&::-webkit-slider-thumb]:cursor-grab",
            "active:[&::-webkit-slider-thumb]:scale-110",
            // Firefox thumb
            "[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5",
            "[&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-bg",
            "[&::-moz-range-thumb]:bg-accent",
            "[&::-moz-range-thumb]:shadow-glow",
            "[&::-moz-range-thumb]:cursor-grab",
            // Tracks (hidden — we draw our own)
            "[&::-webkit-slider-runnable-track]:bg-transparent",
            "[&::-moz-range-track]:bg-transparent",
            "focus-visible:outline-none",
            "focus-visible:[&::-webkit-slider-thumb]:ring-2",
            "focus-visible:[&::-webkit-slider-thumb]:ring-accent",
            "focus-visible:[&::-webkit-slider-thumb]:ring-offset-2",
            "focus-visible:[&::-webkit-slider-thumb]:ring-offset-bg",
          )}
        />
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-xs text-fg-subtle">
        <span>
          {min.toLocaleString("fr-FR")}
          {unit ? ` ${unit}` : ""}
        </span>
        {hint ? <span className="text-fg-muted">{hint}</span> : null}
        <span>
          {max.toLocaleString("fr-FR")}
          {unit ? ` ${unit}` : ""}
        </span>
      </div>
    </div>
  );
}
