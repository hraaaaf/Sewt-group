"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Vidéo hero — remplacer par version finale quand disponible
const HERO_VIDEO_WEBM = "/brand/hero-video.webm";
const HERO_VIDEO_MP4  = "/brand/hero-video.mp4";
const HERO_POSTER     = "/brand/hero-poster.webp";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate h-svh min-h-[640px]"
    >
      {/* Fond cinématique — vidéo loop avec fallback image */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Fallback image — visible avant que la vidéo charge */}
        <Image
          src="/projects/sidi-kacem-1100kwc.jpg"
          alt="Centrale solaire SEWT Group — 1,1 MWc Sidi Kacem"
          fill
          priority
          quality={85}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Vidéo loop — s'affiche par dessus une fois chargée */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_POSTER}
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden
        >
          <source src={HERO_VIDEO_WEBM} type="video/webm" />
          <source src={HERO_VIDEO_MP4}  type="video/mp4" />
        </video>
        {/* Overlay bicouche : vignette périmétrique + gradient bas fort */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background: [
              "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(6,10,22,0.85) 0%, transparent 70%)",
              "linear-gradient(to top, rgba(6,10,22,0.96) 0%, rgba(6,10,22,0.48) 40%, rgba(6,10,22,0.12) 80%, transparent 100%)",
            ].join(", "),
          }}
        />
      </div>

      {/* Contenu — ancré en bas, au-dessus de la vague */}
      <div className="absolute inset-x-0 bottom-[88px] z-10 px-5 md:px-12 md:bottom-[104px] lg:px-16 lg:bottom-[112px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-white/50 mb-5 md:mb-7"
        >
          <span className="text-accent" aria-hidden>○</span>
          Groupe énergétique marocain · Depuis 1992
        </motion.p>

        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-white leading-[0.9]"
          style={{ fontSize: "clamp(3.8rem, 13vw, 11.5rem)" }}
        >
          Soleil.<br />
          <span className="text-accent">Eau.</span><br />
          Ingénierie.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 md:mt-6 max-w-[22rem] sm:max-w-lg font-sans text-[0.875rem] md:text-base text-white/65 leading-relaxed"
        >
          Énergie solaire pour sites industriels, agricoles et institutionnels.
          <span className="hidden md:inline">
            {" "}SEWT Group conçoit, installe et exploite des centrales
            photovoltaïques performantes au Maroc, de la faisabilité
            à la maintenance long terme.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 md:mt-9 flex flex-wrap items-center gap-3 md:gap-4"
        >
          <div className="flex flex-col gap-2">
            <Link
              href="/#roi"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 md:px-8 md:py-3.5 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-accent/90 hover:shadow-[0_0_28px_rgba(232,118,42,0.45)]"
            >
              Recevoir ma note d'opportunité
            </Link>
            <p className="font-mono text-[0.6rem] text-white/40 px-1">
              Analyse gratuite · Ingénieur SEWT · Réponse 48h
            </p>
          </div>
          <Link
            href="/#flagship"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 md:px-8 md:py-3.5 font-sans text-sm font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/35"
          >
            Voir nos réalisations
          </Link>
        </motion.div>
      </div>

      {/* Vague organique — signature visuelle hero → manifeste */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        aria-hidden
      >
        <svg
          viewBox="0 0 1440 88"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "88px" }}
        >
          <path
            d="M0,44 C320,88 720,0 1440,44 L1440,88 L0,88 Z"
            fill="rgb(var(--bg-rgb))"
          />
        </svg>
      </div>
    </section>
  );
}
