"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const expertises = [
  {
    index: "01",
    label: "Distribution solaire",
    headline: "Équipements photovoltaïques sélectionnés",
    body: "Sourcing fiable auprès des fabricants tier-1 mondiaux (Huawei, Jinko, Deye, KBE). Stock local Casablanca, accompagnement technique et garanties fabricant intégrales.",
    stat: { value: "7", unit: "marques partenaires exclusifs" },
    image: "/projects/industrie-onduleurs.jpg",
  },
  {
    index: "02",
    label: "EPC clé en main",
    headline: "De l'étude de faisabilité à la mise en service",
    body: "Ingénierie, dimensionnement, travaux structure, raccordement HTA et mise en service. Équipe certifiée IEC, agréments IRESEN et MASEN, conformité réglementaire complète.",
    stat: { value: "+200", unit: "projets livrés depuis 2010" },
    image: "/projects/carriere-installation.jpg",
  },
  {
    index: "03",
    label: "Exploitation & Maintenance",
    headline: "Performance garantie sur le long terme",
    body: "Monitoring IoT temps réel, alertes automatiques, maintenance préventive trimestrielle et reporting mensuel de production. Contrat O&M longue durée, garantie de performance 25 ans.",
    stat: { value: "25 ans", unit: "de garantie performance" },
    image: "/projects/agricole-onduleurs.jpg",
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

export function OffreChapter() {
  return (
    <section
      id="offre"
      aria-labelledby="offre-heading"
      className="relative px-5 pt-20 pb-[120px] md:px-12 md:pt-28 md:pb-[144px] lg:px-16 lg:pt-32"
      style={{ background: "rgb(var(--brand-rgb))" }}
    >
      {/* Header */}
      <motion.div {...fadeUp()} className="mb-12">
        <p className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/50">
          <span className="text-accent" aria-hidden>○</span>
          Nos expertises
        </p>
        <h2
          id="offre-heading"
          className="mt-5 font-display font-bold text-white text-balance leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}
        >
          Solaire, hydraulique{" "}
          <span className="text-accent">et performance énergétique.</span>
        </h2>
        <p className="mt-5 max-w-2xl font-sans text-base text-white/60 leading-relaxed text-pretty">
          De la fourniture d'équipements tier-1 au contrat O&amp;M 25 ans, SEWT Group
          couvre l'intégralité du cycle de vie de votre installation photovoltaïque.
        </p>
      </motion.div>

      {/* ── Vague organique bas — transition Expertises → Projets ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
        aria-hidden
        style={{ marginBottom: "-1px" }}
      >
        <svg
          viewBox="0 0 1440 96"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "96px" }}
        >
          <path
            d="M0,0 C480,96 960,0 1440,64 L1440,96 L0,96 Z"
            fill="rgb(var(--bg-rgb))"
          />
        </svg>
      </div>

      {/* 3 cartes expertise */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {expertises.map((exp, i) => (
          <motion.article
            key={exp.index}
            {...fadeUp(i * 0.1)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-accent/40 transition-colors duration-300"
          >
            {/* Photo */}
            <div
              className="relative overflow-hidden"
              style={{
                borderBottomLeftRadius: "calc(var(--section-radius) * 0.55)",
                borderBottomRightRadius: "calc(var(--section-radius) * 0.55)",
              }}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={exp.image}
                  alt={exp.headline}
                  fill
                  sizes="(max-width: 768px) 90vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  aria-hidden
                  style={{ background: "linear-gradient(to top, rgba(8,12,28,0.65) 0%, transparent 55%)" }}
                />
                <div className="absolute bottom-0 left-0 p-5">
                  <span className="font-mono text-4xl font-bold text-white/15 select-none leading-none">
                    {exp.index}
                  </span>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div className="flex flex-1 flex-col p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                {exp.label}
              </p>
              <h3
                className="mt-2 font-display font-bold text-white leading-snug text-balance"
                style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)" }}
              >
                {exp.headline}
              </h3>
              <p className="mt-3 font-sans text-sm text-white/55 leading-relaxed text-pretty flex-1">
                {exp.body}
              </p>
              <div className="mt-6 pt-5 border-t border-white/10">
                <p
                  className="font-display font-bold text-white leading-none"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  {exp.stat.value}
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  {exp.stat.unit}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
