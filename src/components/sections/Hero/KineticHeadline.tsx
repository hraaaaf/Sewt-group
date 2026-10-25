"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

export interface KineticWord {
  text: string;
  accent?: boolean;
}

interface KineticHeadlineProps {
  id?: string;
  words: KineticWord[];
  className?: string;
}

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.18,
    },
  },
};

const wordMotion: Variants = {
  hidden: {
    y: "112%",
    opacity: 0,
    rotate: 3,
  },
  visible: {
    y: "0%",
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};


/**
 * Typographie cinétique de la Hero.
 * - Split par mots, chaque mot inscrit dans un masque overflow-hidden,
 *   se révèle depuis le bas avec stagger.
 * - Le mot marqué `accent` est coloré ambre + soulignement animé.
 * - aria-label fournit la phrase complète aux lecteurs d'écran.
 */
export function KineticHeadline({ id, words, className }: KineticHeadlineProps) {
  const phrase = words.map((w) => w.text).join(" ");

  return (
    <motion.h1
      id={id}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={phrase}
      className={cn(
        "font-display font-bold tracking-tight text-fg text-balance leading-[0.95]",
        className,
      )}
    >
      {words.map((w, i) => {
        const isLast = i === words.length - 1;
        return (
          <span
            key={`${w.text}-${i}`}
            aria-hidden
            className={cn(
              "relative inline-block overflow-hidden pb-[0.12em] align-bottom",
              !isLast && "mr-[0.22em]",
            )}
          >
            <motion.span
              variants={wordMotion}
              className={cn(
                "inline-block will-change-transform",
                w.accent && "text-accent",
              )}
            >
              {w.text}
            </motion.span>
          </span>
        );
      })}
    </motion.h1>
  );
}
