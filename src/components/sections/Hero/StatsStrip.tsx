"use client";

import { useRef, type RefObject } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

interface StatDef {
  readonly numeric: number;
  readonly suffix: string;
  readonly label: string;
  readonly sub: string;
  readonly duration: number;
}

const stats: StatDef[] = [
  { numeric: 30,  suffix: "+",     label: "ans d'expertise énergétique",  sub: "Fondé en 1992",              duration: 900  },
  { numeric: 15,  suffix: " MWc",  label: "commissionnés",                sub: "En service",                 duration: 1000 },
  { numeric: 50,  suffix: " MWc",  label: "en pipeline de développement", sub: "Projets actifs",             duration: 1100 },
  { numeric: 3,   suffix: "",      label: "régions d'intervention",       sub: "Oriental · Centre · Sud",    duration: 800  },
];

function StatItem({
  stat,
  index,
  containerRef,
}: {
  stat: StatDef;
  index: number;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const animated = useCountUp(containerRef, stat.numeric, stat.duration);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/*
        aria-label carries the real value for screen readers.
        The visible span is aria-hidden so readers don't double-announce
        the intermediate animated number.
      */}
      <p
        className="font-display font-bold text-fg leading-none"
        style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
        aria-label={`${stat.numeric}${stat.suffix}`}
      >
        <span aria-hidden="true">
          {animated}
          {stat.suffix}
        </span>
      </p>
      <p className="mt-2 font-sans text-sm font-medium text-fg-muted leading-snug">
        {stat.label}
      </p>
      <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-fg-subtle">
        {stat.sub}
      </p>
    </motion.div>
  );
}

export function StatsStrip() {
  // Single shared ref on the grid — IntersectionObserver fires when
  // any part of the section becomes visible, triggering all counters.
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <section
      aria-label="Chiffres clés SEWT Group"
      className="bg-bg border-b border-border/40 px-5 py-20 md:px-12 md:py-24 lg:px-16 lg:py-28"
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-fg-subtle"
      >
        <span className="text-accent" aria-hidden>○</span>
        Chiffres clés
      </motion.p>

      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4"
      >
        {stats.map((s, i) => (
          <StatItem
            key={s.label}
            stat={s}
            index={i}
            containerRef={gridRef}
          />
        ))}
      </div>
    </section>
  );
}
