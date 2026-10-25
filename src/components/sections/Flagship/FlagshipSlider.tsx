"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { projects } from "@/data/projects";

const FEATURED_SLUGS = [
  "centrale-pv-carriere-industrielle",
  "centrale-pv-domaine-agricole",
  "autoconsommation-bureaux",
  "entrepot-frigorifique-200kwc",
  "hotel-90kwc",
  "atlantic-free-zone-60kwc",
] as const;

function formatPower(kwc: number | undefined): string {
  if (!kwc) return "—";
  if (kwc >= 1000) return `${(kwc / 1000).toFixed(2).replace(/\.?0+$/, "").replace(".", ",")} MWc`;
  return `${kwc} kWc`;
}

const sectorLabel: Record<string, string> = {
  industrie: "Industrie",
  agriculture: "Agriculture",
  tertiaire: "Tertiaire",
  public: "Public",
  marine: "Marine",
};

export function FlagshipSlider() {
  const [showAll, setShowAll] = useState(false);

  const featured = FEATURED_SLUGS
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean);

  if (featured.length === 0) return null;

  const [main, ...rest] = featured;

  return (
    <section
      id="flagship"
      aria-labelledby="flagship-heading"
      className="bg-bg px-5 py-20 md:px-12 md:py-28 lg:px-16 lg:py-32"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <p className="section-label">Projets réalisés</p>
        <h2
          id="flagship-heading"
          className="mt-4 font-display font-bold text-fg leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}
        >
          Des centrales qui <span className="text-accent">produisent des résultats.</span>
        </h2>
      </motion.div>

      {/* Grille principale — 1 grand + 2 côté */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Projet principal */}
        {main && (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="group relative lg:col-span-7 overflow-hidden rounded-2xl"
            style={{ borderBottomLeftRadius: "var(--section-radius)", borderBottomRightRadius: "var(--section-radius)" }}
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[440px]">
              <Image
                src={main.hero.imageSrc ?? ""}
                alt={main.hero.alt}
                fill
                sizes="(max-width: 1024px) 95vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                aria-hidden
                style={{ background: "linear-gradient(to top, rgba(8,12,28,0.82) 0%, rgba(8,12,28,0.2) 55%, transparent 100%)" }}
              />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  {sectorLabel[main.sector] ?? main.sector}
                </p>
                <p className="mt-2 font-display font-bold text-white leading-tight"
                  style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.8rem)" }}>
                  {main.title}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
                  <span className="font-display text-2xl font-bold text-accent">
                    {formatPower(main.capacityKwc)}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-xs text-white/60">
                    <MapPin className="h-3 w-3" aria-hidden />
                    {main.location.split(",")[0]}
                  </span>
                  {main.year && (
                    <span className="font-mono text-xs text-white/50">{main.year}</span>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* 2 projets secondaires */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {rest.slice(0, 2).map((project, i) => project && (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[4/3] lg:aspect-[16/9]">
                <Image
                  src={project.hero.imageSrc ?? ""}
                  alt={project.hero.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 38vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  aria-hidden
                  style={{ background: "linear-gradient(to top, rgba(8,12,28,0.78) 0%, transparent 55%)" }}
                />
                <div className="absolute bottom-0 left-0 p-4 md:p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                    {sectorLabel[project.sector] ?? project.sector}
                  </p>
                  <p className="mt-1 font-display text-sm font-bold text-white leading-snug">
                    {project.title}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-display text-lg font-bold text-accent">
                      {formatPower(project.capacityKwc)}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-white/55">
                      <MapPin className="h-2.5 w-2.5" aria-hidden />
                      {project.location.split(",")[0]}
                    </span>
                    {project.year && (
                      <span className="font-mono text-[10px] text-white/40">{project.year}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* 3 projets supplémentaires — masqués par défaut */}
      <AnimatePresence>
        {showAll && rest.length > 2 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {rest.slice(2, 5).map((project, i) => project && (
                <motion.article
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[3/2]">
                    <Image
                      src={project.hero.imageSrc ?? ""}
                      alt={project.hero.alt}
                      fill
                      sizes="30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      aria-hidden
                      style={{ background: "linear-gradient(to top, rgba(8,12,28,0.78) 0%, transparent 55%)" }}
                    />
                    <div className="absolute bottom-0 left-0 p-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                        {sectorLabel[project.sector] ?? project.sector}
                      </p>
                      <p className="mt-1 font-display text-sm font-bold text-white leading-snug">
                        {project.title}
                      </p>
                      <div className="mt-1.5 flex items-center gap-3">
                        <span className="font-display text-base font-bold text-accent">
                          {formatPower(project.capacityKwc)}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[9px] text-white/50">
                          <MapPin className="h-2.5 w-2.5" aria-hidden />
                          {project.location.split(",")[0]}
                        </span>
                        {project.year && (
                          <span className="font-mono text-[9px] text-white/40">{project.year}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
      >
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-sans text-sm font-medium text-fg-muted transition-all duration-300 hover:border-accent/50 hover:text-fg"
        >
          {showAll ? "Réduire ↑" : "Voir toutes nos réalisations →"}
        </button>
        <Link
          href="/notre-histoire"
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle hover:text-accent transition-colors"
        >
          Portefeuille complet
        </Link>
      </motion.div>
    </section>
  );
}
