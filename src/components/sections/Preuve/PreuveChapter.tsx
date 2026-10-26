"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";
import { partners } from "@/data/partners";

export function PreuveChapter() {
  return (
    <div
      id="preuve"
      aria-label="Références clients SEWT Group"
      className="mt-10 border-t border-border/60 pt-9 md:mt-14 md:pt-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-7 text-center"
      >
        <p className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-fg-subtle">
          <span className="text-accent" aria-hidden>○</span>
          Références
        </p>
        <h2
          className="mt-4 font-display font-bold text-fg text-balance leading-[1.05]"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
        >
          Références &amp;{" "}
          <span className="text-accent">partenaires</span>
        </h2>
        <p className="mt-4 mx-auto max-w-2xl font-sans text-base text-fg-muted leading-relaxed">
          Des institutions, industriels et organisations accompagnés dans des
          projets solaires, énergétiques et techniques au Maroc.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="relative overflow-hidden"
      >
        {/* Fades bords */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-bg to-transparent md:w-14"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-bg to-transparent md:w-14"
        />
        <Marquee speed={38} pauseOnHover>
          {partners.map((p) => (
            <div
              key={p.name}
              className="mx-3 flex h-24 w-36 shrink-0 items-center justify-center sm:mx-5 sm:h-28 sm:w-44"
            >
              {p.logoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.logoSrc}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-20 w-auto max-w-[140px] object-contain opacity-100 transition-transform duration-300 hover:scale-105 sm:max-h-24 sm:max-w-[170px]"
                />
              ) : (
                <span className="font-display text-xs font-bold text-fg-subtle text-center">
                  {p.name}
                </span>
              )}
            </div>
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
}
