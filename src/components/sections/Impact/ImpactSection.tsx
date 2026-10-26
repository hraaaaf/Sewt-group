"use client";

import { motion } from "framer-motion";

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

/**
 * Bloc de présentation : raison d'être et bénéfices (chiffres supprimés, Word V2 p.1).
 * Référence : Site Web SEWT.docx, pages 1–2 et 4 (quatre cartes).
 */
export function ImpactSection() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="bg-bg px-5 py-20 md:px-12 md:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <motion.div {...fadeUp(0.05)} className="lg:col-span-6">
            <p className="section-label">Notre raison d’être</p>
            <h2
              id="impact-heading"
              className="mt-5 font-display font-bold leading-[1.05] text-balance text-fg"
              style={{ fontSize: "clamp(2rem, 4.2vw, 3.8rem)" }}
            >
              Contribuer à la compétitivité énergétique{" "}
              <span className="text-accent">du Maroc.</span>
            </h2>
            <div className="mt-6 max-w-xl space-y-4 font-sans text-base leading-relaxed text-fg-muted text-pretty">
              <p>
                Sun Energy and Water Technologies Group a été créée avec la conviction
                de faire de l’énergie solaire un pilier majeur de la transition
                énergétique voulue pour le Royaume.
              </p>
              <p>
                En tant que professionnels des énergies renouvelables, nous détenons
                les qualifications nécessaires pour garantir à nos partenaires des
                installations de qualité et conformes aux normes et réglementations
                en vigueur.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-6 lg:self-center">
            {benefits.map((benefit, index) => (
              <motion.article
                key={benefit.title}
                {...fadeUp(0.1 + index * 0.07)}
                className="rounded-xl border border-border bg-bg-elevated/50 p-5"
              >
                <div className="mb-3 h-0.5 w-7 rounded-full bg-accent" aria-hidden />
                <h3 className="font-display text-base font-bold leading-snug text-fg">
                  {benefit.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-fg-muted">
                  {benefit.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
