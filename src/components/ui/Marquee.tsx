import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface MarqueeProps {
  children: ReactNode;
  /** Vitesse en secondes pour faire un cycle complet. */
  speed?: number;
  /** Inverser le sens. */
  reverse?: boolean;
  /** Mettre en pause au survol. */
  pauseOnHover?: boolean;
  /** Appliquer le masque fade sur les bords. */
  fade?: boolean;
  className?: string;
}

/**
 * Marquee infini — pur CSS (animation `marquee-x` dans tailwind.config).
 * Le contenu est dupliqué pour un loop transparent.
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  fade = true,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group/marquee relative w-full overflow-hidden",
        fade && "mask-fade-x",
        className,
      )}
      data-marquee-root=""
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-12 will-change-transform",
          "animate-marquee-x",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-12">{children}</div>
      </div>
    </div>
  );
}
