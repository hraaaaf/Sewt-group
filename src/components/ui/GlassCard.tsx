import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GlassCardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Variante d'intensité du verre. */
  intensity?: "soft" | "regular" | "strong";
  children: ReactNode;
}

const intensityMap: Record<NonNullable<GlassCardProps["intensity"]>, string> = {
  soft: "backdrop-blur-[10px] bg-bg-elevated/30",
  regular: "backdrop-blur-glass bg-bg-elevated/45",
  strong: "backdrop-blur-[28px] bg-bg-elevated/65 saturate-150",
};

export function GlassCard({
  as: Tag = "div",
  intensity = "regular",
  className,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "relative isolate overflow-hidden rounded-lg border border-border/60 shadow-md",
        "transition-all duration-base ease-out-expo hover:shadow-lg",
        "stroke-gradient",
        intensityMap[intensity],
        className,
      )}
      {...rest}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      {children}
    </Tag>
  );
}
