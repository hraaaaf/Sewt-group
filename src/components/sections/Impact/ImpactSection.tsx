"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const benefits = [
  {
    title: "Réduction des coûts énergétiques",
    body: "Couvrir de 30 à 80 % de votre consommation directement depuis votre toiture ou terrain. Facture maîtrisée sur 25 ans.",
  },
  {
    title: "Indépendance énergétique",
    body: "Réduire votre exposition aux hausses tarifaires ONE et renforcer la résilience opérationnelle de votre site.",
  },
  {
    title: "Baisse des émissions CO₂",
    body: "Chaque kWc installé évite en moyenne 0,8 t de CO₂ par an. Un engagement mesurable, auditable, certifiable.",
  },
  {
    title: "Performance industrielle durable",
    body: "Monitoring temps réel, maintenance préventive et reporting de performance pour maintenir le rendement au fil des années.",
  },
] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  };
}

export function ImpactSection() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="bg-bg"
    >
      {/* Photo card arrondie */}
      <motion.div
        {...fadeUp()}
        className="relative mx-5 md:mx-12 lg:mx-16 overflow-hidden"
        style={{ borderBottomLeftRadius: "var(--section-radius)", borderBottomRightRadius: "var(--section-radius)" }}
      >
        <div className="relative aspect-[16/7] md:aspect-[21/8]">
          <Image
            src="/projects/afz-kenitra-160kwc.jpg"
            alt="Impact énergétique SEWT Group — Zone Franche Atlantique Kénitra"
            fill
            sizes="(max-width: 768px) 95vw, 90vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background: "linear-gradient(to top, rgba(8,12,28,0.75) 0%, rgba(8,12,28,0.3) 55%, transparent 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-3xl">
            <p className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/60">
              <span className="text-accent" aria-hidden>○</span>
              Impact
            </p>
          </div>
        </div>
      </motion.div>

      {/* Texte + 4 bénéfices */}
      <div className="px-5 py-20 md:px-12 md:py-28 lg:px-16 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">
          {/* Titre + citation */}
          <motion.div {...fadeUp(0.05)}>
            <h2
              id="impact-heading"
              className="font-display font-bold text-fg text-balance leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}
            >
              Accélérer la compétitivité énergétique{" "}
              <span className="text-accent">du Maroc.</span>
            </h2>
            <p className="mt-6 font-sans text-base text-fg-muted leading-relaxed text-pretty max-w-lg">
              Nos solutions permettent aux industriels et institutions marocaines
              de réduire leur dépendance énergétique, de maîtriser leurs coûts
              sur 25 ans et d'inscrire leur croissance dans une trajectoire durable.
            </p>
            <blockquote className="mt-8 border-l-2 border-accent pl-5">
              <p
                className="font-display font-bold text-fg text-balance leading-[1.1]"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
              >
                L'énergie solaire n'est pas seulement une économie.{" "}
                <span className="text-accent">
                  C'est un actif de compétitivité pour les entreprises marocaines.
                </span>
              </p>
            </blockquote>
          </motion.div>

          {/* 4 bénéfices */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                {...fadeUp(0.1 + i * 0.07)}
                className="rounded-2xl border border-border bg-bg-elevated/50 p-6"
              >
                <div className="mb-3 h-0.5 w-8 bg-accent rounded-full" aria-hidden />
                <h3 className="font-display font-bold text-fg leading-snug" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" }}>
                  {b.title}
                </h3>
                <p className="mt-2 font-sans text-sm text-fg-muted leading-relaxed text-pretty">
                  {b.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
