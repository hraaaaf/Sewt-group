"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

const figures = [
  { target: 30, prefix: "+", suffix: " ans", label: "d’expérience professionnelle" },
  { target: 200, prefix: "+", suffix: "", label: "projets livrés" },
  { target: 50, prefix: "", suffix: " MWc", label: "en pipeline de développement" },
] as const;

/** Count-up déclenché une fois à l'apparition ; valeur complète pour les lecteurs d'écran. */
function CountUp({ target, prefix, suffix }: { target: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setCurrent(target);
      return;
    }

    let frame = 0;
    let start: number | undefined;
    const tick = (now: number) => {
      if (start === undefined) start = now;
      const progress = Math.min((now - start) / 1400, 1);
      setCurrent(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [inView, reduceMotion, target]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">{prefix}{current}{suffix}</span>
      <span className="sr-only">{prefix}{target}{suffix}</span>
    </span>
  );
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  };
}

/**
 * Bloc unique de présentation : raison d'être, bénéfices et chiffres clés.
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
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div {...fadeUp(0.05)} className="lg:col-span-6">
            <p className="section-label">Notre raison d’être</p>
            <h2
              id="impact-heading"
              className="mt-5 font-display font-bold leading-[1.05] text-balance text-fg"
              style={{ fontSize: "clamp(2rem, 4.6vw, 4.2rem)" }}
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

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-6">
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

        <motion.div
          {...fadeUp(0.2)}
          className="mt-12 grid grid-cols-1 gap-7 border-t border-border pt-10 sm:grid-cols-3 md:mt-16"
          aria-label="Chiffres clés SEWT Group"
        >
          {figures.map((figure) => (
            <div key={figure.label}>
              <p
                className="font-display font-bold leading-none text-fg"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                <CountUp target={figure.target} prefix={figure.prefix} suffix={figure.suffix} />
              </p>
              <p className="mt-2 font-sans text-sm text-fg-muted">
                {figure.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
