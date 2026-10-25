"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function CtaBridge() {
  return (
    <div
      aria-label="Lien pré-étude solaire gratuite"
      className="border-y border-border/50 bg-bg-elevated/50 py-8 md:py-10"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-accent">
              Pré-étude gratuite
            </p>
            <p
              className="mt-2 font-display font-bold text-fg leading-[1.1] text-balance"
              style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.7rem)" }}
            >
              Votre site mérite-t-il une centrale solaire ?
            </p>
            <p className="mt-1.5 font-mono text-[0.68rem] text-fg-subtle">
              Analyse indicative gratuite · Ingénieur SEWT · Réponse sous 48h ouvrées
            </p>
          </div>
          <Link
            href="/#roi"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-accent/90 hover:shadow-[0_0_24px_rgba(232,118,42,0.38)] hover:-translate-y-0.5"
          >
            Recevoir ma note d'opportunité
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}
