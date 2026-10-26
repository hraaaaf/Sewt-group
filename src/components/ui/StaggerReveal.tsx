"use client";

import { motion, type Variants } from "framer-motion";
import { Children, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * StaggerReveal — primitive d'animation d'entrée en cascade.
 *
 * Inspiré du pattern Jet Energy (cards activités révélées en stagger),
 * mais avec reduced-motion safe et `viewport once: true`.
 *
 * Usage :
 *   <StaggerReveal>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </StaggerReveal>
 *
 * Chaque enfant direct est wrappé dans un motion.div qui hérite des variants
 * `parent`. Les enfants entrent avec un délai de `stagger` ms entre chacun.
 */

interface StaggerRevealProps {
  children: ReactNode;
  /** Délai entre chaque enfant (en s). Défaut 0.12. */
  stagger?: number;
  /** Délai avant le premier enfant (en s). Défaut 0. */
  delay?: number;
  /** Amplitude verticale d'apparition (en px). Défaut 24. */
  y?: number;
  /** Marge IntersectionObserver. Défaut "-12%". */
  margin?: string;
  /** Class CSS sur le wrapper. */
  className?: string;
  /** Class CSS sur chaque enfant wrappé. */
  itemClassName?: string;
  /** Désactive le wrapper, rend juste les enfants tels quels (utile en debug). */
  disabled?: boolean;
}

export function StaggerReveal({
  children,
  stagger = 0.12,
  delay = 0,
  y = 24,
  margin = "-12%",
  className,
  itemClassName,
  disabled,
}: StaggerRevealProps) {
  const reduced = useReducedMotion();

  if (disabled || reduced) {
    return <div className={className}>{children}</div>;
  }

  const parentVariants: Variants = {
    hidden: {},
    shown: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y },
    shown: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin }}
      variants={parentVariants}
    >
      {Children.map(children, (child, i) => (
        <motion.div key={i} variants={itemVariants} className={itemClassName}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
