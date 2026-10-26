"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

interface Milestone {
  readonly year: string;
  readonly title: string;
  readonly description: string;
  readonly kpi?: string;
  readonly kpiLabel?: string;
}

const milestones: ReadonlyArray<Milestone> = [
  {
    year: "1992",
    title: "Fondation Energy Engineering",
    description:
      "Création par M. Ali HAJJI de Energy Engineering — structure pionnière dédiée au génie énergétique et aux premières installations solaires au Maroc.",
    kpi: "+30 ans",
    kpiLabel: "d'expertise",
  },
  {
    year: "2010",
    title: "Naissance de Sun Energy",
    description:
      "Lancement opérationnel de Sun Energy, dédié aux installations photovoltaïques clé en main pour l'industrie et l'agriculture marocaines.",
    kpi: "EPC",
    kpiLabel: "clé en main",
  },
  {
    year: "2012",
    title: "Distribution & SIAM",
    description:
      "Partenariat avec IBC Solar. Première participation au SIAM avec démonstration de pompage solaire. Démarrage de la distribution d'équipements tier-1.",
    kpi: "Tier-1",
    kpiLabel: "équipements",
  },
  {
    year: "2019",
    title: "Certification TaqaPro PV",
    description:
      "Obtention de la certification TaqaPro PV dès son lancement national — reconnaissance officielle de la qualité et de la conformité des installations.",
    kpi: "TaqaPro",
    kpiLabel: "certifié PV",
  },
  {
    year: "2023",
    title: "Restructuration opérationnelle",
    description:
      "Réorganisation en groupe multi-entités. 15 MWc commissionnés, 50 MWc en pipeline. Présence dans 3 régions : Oriental, Centre, Sud.",
    kpi: "15",
    kpiLabel: "MWc commissionnés",
  },
];

export function HistoireTimeline() {
  return (
    <section
      id="histoire"
      data-chapter="histoire"
      data-chapter-label="03 · Histoire"
      className="relative bg-[#1B2F5C] py-[calc(5rem+96px)] md:py-[calc(7rem+96px)]"
      
    >
      {/* Vague organique entrante — ivoire → navy */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        aria-hidden
        style={{ marginTop: "-1px" }}
      >
        <svg
          viewBox="0 0 1440 96"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "96px" }}
        >
          <path
            d="M0,96 C360,0 1080,96 1440,32 L1440,0 L0,0 Z"
            fill="rgb(var(--bg-rgb))"
          />
        </svg>
      </div>

      {/* Vague organique sortante — navy → ivoire */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
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
            d="M0,32 C480,96 960,0 1440,64 L1440,96 L0,96 Z"
            fill="rgb(var(--bg-rgb))"
          />
        </svg>
      </div>

      <Container>
        {/* En-tête */}
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/50 mb-5">
            <span className="text-accent" aria-hidden>○</span>
            Histoire
          </p>
          <h2 className="font-display font-bold text-white text-balance leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}>
            Depuis 1992, une expertise énergétique{" "}
            <span className="text-accent">construite au Maroc.</span>
          </h2>
        </div>

        {/* Timeline horizontale + 4 cards visibles simultanément */}
        <div className="relative mt-16">
          {/* Ligne horizontale continue derrière les dots (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-2 hidden h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent md:block"
          />

          <ol className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-4 lg:grid-cols-5 lg:gap-5">
            {milestones.map((m, idx) => (
              <motion.li
                key={m.year}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex flex-col"
              >
                {/* Dot + halo (desktop seulement, ancré sur la ligne) */}
                <div className="hidden md:flex md:justify-start">
                  <div className="relative">
                    <motion.span
                      aria-hidden
                      className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: idx * 0.4,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="relative block h-4 w-4 rounded-full bg-accent ring-4 ring-[#1B2F5C]" />
                  </div>
                </div>

                {/* Card */}
                <article className="mt-8 flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 md:mt-10">
                  <p
                    className="font-display font-bold leading-none tracking-tight text-accent"
                    style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
                  >
                    {m.year}
                  </p>

                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-white leading-tight">
                    {m.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-white/55 text-pretty">
                    {m.description}
                  </p>

                  {m.kpi ? (
                    <div className="mt-auto inline-flex items-baseline gap-2 border-t border-white/10 pt-4">
                      <span className="font-display text-xl font-bold tracking-tight text-white tabular-nums">
                        {m.kpi}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                        {m.kpiLabel}
                      </span>
                    </div>
                  ) : null}
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
