"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";
import { partners } from "@/data/partners";

export function PreuveChapter() {
  return (
    <section
      id="preuve"
      aria-label="Références clients SEWT Group"
      className="bg-bg px-5 py-20 md:px-12 md:py-28 lg:px-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 text-center"
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
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg to-transparent"
        />
        <Marquee speed={28} pauseOnHover>
          {partners.map((p) => (
            <div
              key={p.name}
              className="mx-8 flex h-16 w-28 items-center justify-center"
            >
              {p.logoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.logoSrc}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-auto max-w-[96px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-400"
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
    </section>
  );
}
