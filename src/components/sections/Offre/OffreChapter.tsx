"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const expertises = [
  { index: "01", label: "Photovoltaïque", body: "Étude et installation de systèmes solaires pour produire de l’électricité au plus près des besoins de votre activité.", tagline: "Production électrique", image: "/projects/word2-photovoltaique.jpg" },
  { index: "02", label: "Solaire thermique / Industriel", body: "Des solutions solaires ou non dédiées à la production d’eau chaude pour les usages de votre activité.", tagline: "Eau chaude / Vapeur", image: "/projects/word2-solaire-thermique.jpg" },
  { index: "03", label: "Exploitation & maintenance", body: "Un accompagnement dans la durée pour l’exploitation et la maintenance de vos équipements énergétiques.", tagline: "Suivi des installations", image: "/projects/word2-exploitation-maintenance.jpg" },
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
      className="relative bg-[#1B2F5C] px-5 pt-20 pb-[120px] md:px-12 md:pt-28 md:pb-[144px] lg:px-16 lg:pt-32"
      
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
          Une réponse innovante à vos besoins{" "}
          <span className="text-accent">énergétiques.</span>
        </h2>
        <p className="mt-5 max-w-2xl font-sans text-base text-white/60 leading-relaxed text-pretty">
          Pour produire de l’électricité, de l’eau chaude ou pour superviser vos équipements, nos services se
          complémentent pour répondre aux besoins de votre site.
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
                  alt={exp.label}
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
              <p className="font-display text-xl font-bold text-white">
                {exp.label}
              </p>
              <p className="mt-3 font-sans text-sm text-white/55 leading-relaxed text-pretty flex-1">
                {exp.body}
              </p>
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="font-display text-lg font-semibold text-white">
                  {exp.tagline}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
