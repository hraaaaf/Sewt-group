"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 font-display font-semibold tracking-snug " +
  "rounded-pill " +
  "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg " +
  "disabled:pointer-events-none disabled:opacity-50 will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-brand-contrast border border-brand hover:bg-brand-hover",
  secondary:
    "bg-accent text-[rgb(14_27_20)] border border-accent hover:bg-accent-hover",
  ghost: "bg-transparent text-fg hover:bg-surface",
  outline:
    "bg-transparent text-fg border border-border-strong hover:border-accent hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

// Spring physics — masse matérielle, no linear transitions
const springHover = { type: "spring" as const, stiffness: 380, damping: 28, mass: 0.8 };
const springTap = { type: "spring" as const, stiffness: 600, damping: 30, mass: 0.6 };

interface CommonProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children?: ReactNode;
  className?: string;
}

export type ButtonProps = CommonProps & HTMLMotionProps<"button">;
export type LinkButtonProps = CommonProps & HTMLMotionProps<"a"> & { href: string };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", withArrow, children, ...rest },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      transition={springHover}
      {...rest}
    >
      <span>{children}</span>
      {withArrow ? (
        <motion.span
          className="inline-flex"
          whileHover={{ x: 2, y: -2 }}
          transition={springTap}
        >
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </motion.span>
      ) : null}
    </motion.button>
  );
});

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(function LinkButton(
  { className, variant = "primary", size = "md", withArrow, children, ...rest },
  ref,
) {
  return (
    <motion.a
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      transition={springHover}
      {...rest}
    >
      <span>{children}</span>
      {withArrow ? (
        <motion.span
          className="inline-flex"
          whileHover={{ x: 2, y: -2 }}
          transition={springTap}
        >
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </motion.span>
      ) : null}
    </motion.a>
  );
});
