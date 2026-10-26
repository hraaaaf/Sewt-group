"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";
import { partners } from "@/data/partners";

export function PreuveChapter() {
  return (
    <div
      id="preuve"
      aria-label="Références et partenaires SEWT Group"
      className="mt-8 md:mt-10"
    >
      {/* Word V2 p.6 : conserver seulement le bandeau de logos, sans titre visible. */}
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
