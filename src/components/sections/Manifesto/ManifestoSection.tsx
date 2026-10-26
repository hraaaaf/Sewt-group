"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ManifestoSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-bg px-5 py-20 md:px-12 md:py-28 lg:px-16 lg:py-36"
    >
      <div className="max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-fg-subtle"
        >
          <span className="text-accent" aria-hidden>○</span>
          Notre raison d'être
        </motion.p>

        <motion.h2
          id="about-heading"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display font-bold text-fg leading-[1.05] text-balance"
          style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
        >
          Accélérer la transition énergétique{" "}
          <span className="text-accent">du Royaume.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-2xl font-sans text-lg text-fg-muted leading-relaxed text-pretty"
        >
          Fondé en 1992 par M. Ali HAJJI, SEWT Group est un EPC marocain indépendant
          spécialisé dans le photovoltaïque industriel et agricole. Depuis plus de
          trois décennies, nous concevons, installons et exploitons des centrales
          solaires qui réduisent durablement la facture énergétique de nos clients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <Link
            href="/#le-groupe"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-fg underline underline-offset-4 decoration-accent/50 hover:decoration-accent transition-all duration-200"
          >
            Découvrir le groupe →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 border-t border-border pt-10"
        >
          {[
            { value: "1992", label: "Année de fondation" },
            { value: "15 MWc", label: "Puissance commissionnée" },
            { value: "+200", label: "Projets livrés" },
            { value: "3", label: "Régions d'intervention" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="font-display font-bold text-fg leading-none"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
              >
                {stat.value}
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
