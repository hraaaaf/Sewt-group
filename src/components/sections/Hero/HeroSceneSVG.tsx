"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * HeroSceneSVG — vue aérienne stylisée d'une centrale solaire au coucher du soleil.
 *
 * 100 % SVG inline, zéro asset binaire, zéro fetch réseau. Animations Framer Motion.
 * Pensée comme **fallback toujours visible** sous l'élément `<video>` de
 * `HeroVideoReveal` : si le fichier vidéo arrive plus tard, il se superpose.
 *
 * Couches (du fond vers l'avant) :
 *  1. Ciel — dégradé multi-stop carbone → ambre → vert phosphore (tokens SEWT)
 *  2. Halo solaire — radial gradient massif, pulse subtil (8 s loop)
 *  3. Soleil — disque blanc-or, descend de 18 px en boucle 28 s
 *  4. Aurore — bande horizontale ambrée semi-transparente, shimmer 12 s
 *  5. Montagnes lointaines — silhouette path, parallax léger
 *  6. Montagnes proches — silhouette plus dense, opacity 0.9
 *  7. Brume horizon — bandeau dégradé qui adoucit la jonction sol/ciel
 *  8. Grille de panneaux PV — pattern SVG répété en 5 rangées receding
 *  9. Particules — 12 points ambrés qui s'élèvent en boucle (8-12 s, staggered)
 * 10. Vignette globale — mix-blend pour profondeur cinématique
 *
 * Reduced-motion : particules figées, soleil immobile, aurore statique.
 * Le SVG reste pleinement visible.
 */
export function HeroSceneSVG() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Vue aérienne stylisée d'une centrale solaire au crépuscule"
      >
        <defs>
          {/* Ciel principal */}
          <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06070a" />
            <stop offset="22%" stopColor="#0d0b10" />
            <stop offset="48%" stopColor="#2a1812" />
            <stop offset="68%" stopColor="#7c4220" />
            <stop offset="82%" stopColor="#d18a3a" />
            <stop offset="92%" stopColor="#f2b544" />
            <stop offset="100%" stopColor="#1f5f3a" />
          </linearGradient>

          {/* Halo solaire */}
          <radialGradient id="hero-sun-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8e1" stopOpacity="0.92" />
            <stop offset="14%" stopColor="#f2b544" stopOpacity="0.65" />
            <stop offset="45%" stopColor="#e8a636" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#e8a636" stopOpacity="0" />
          </radialGradient>

          {/* Disque solaire */}
          <radialGradient id="hero-sun-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffaf0" />
            <stop offset="60%" stopColor="#ffe9b8" />
            <stop offset="100%" stopColor="#f2b544" />
          </radialGradient>

          {/* Aurore horizon */}
          <linearGradient id="hero-aurora" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f2b544" stopOpacity="0" />
            <stop offset="35%" stopColor="#f2b544" stopOpacity="0.32" />
            <stop offset="65%" stopColor="#3CCB7A" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#3CCB7A" stopOpacity="0" />
          </linearGradient>

          {/* Brume horizon (vertical, vers le sol) */}
          <linearGradient id="hero-haze" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="55%" stopColor="#000" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
          </linearGradient>

          {/* Pattern panneau PV — cellule unitaire */}
          <pattern
            id="hero-panel"
            x="0"
            y="0"
            width="84"
            height="52"
            patternUnits="userSpaceOnUse"
          >
            <rect width="80" height="48" x="2" y="2" fill="#0a0d0c" />
            <rect
              width="80"
              height="48"
              x="2"
              y="2"
              fill="none"
              stroke="#3CCB7A"
              strokeOpacity="0.22"
              strokeWidth="1"
            />
            <line
              x1="2"
              y1="26"
              x2="82"
              y2="26"
              stroke="#3CCB7A"
              strokeOpacity="0.10"
              strokeWidth="0.5"
            />
            <line
              x1="42"
              y1="2"
              x2="42"
              y2="50"
              stroke="#3CCB7A"
              strokeOpacity="0.10"
              strokeWidth="0.5"
            />
          </pattern>

          {/* Gradient bord panneaux pour fondu perspective */}
          <linearGradient id="hero-panel-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0d0c" stopOpacity="1" />
            <stop offset="100%" stopColor="#0a0d0c" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* === 1. Ciel === */}
        <rect width="1920" height="1080" fill="url(#hero-sky)" />

        {/* === 2 + 3. Halo + Soleil (descend lentement) === */}
        <motion.g
          animate={reduced ? undefined : { y: [0, 18, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 28, ease: "easeInOut", repeat: Infinity }
          }
        >
          <circle cx="1460" cy="640" r="320" fill="url(#hero-sun-halo)" />
          <circle cx="1460" cy="640" r="68" fill="url(#hero-sun-core)" />
          <circle
            cx="1460"
            cy="640"
            r="80"
            fill="none"
            stroke="#fff8e1"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
        </motion.g>

        {/* === 4. Aurore horizon (shimmer) === */}
        <motion.rect
          x="0"
          y="690"
          width="1920"
          height="80"
          fill="url(#hero-aurora)"
          animate={reduced ? undefined : { opacity: [0.6, 1, 0.6] }}
          transition={
            reduced
              ? undefined
              : { duration: 12, ease: "easeInOut", repeat: Infinity }
          }
        />

        {/* === 5. Montagnes lointaines === */}
        <motion.path
          d="M0 750 L120 700 L240 730 L400 660 L560 695 L720 670 L900 710 L1080 678 L1280 700 L1480 670 L1700 695 L1920 678 L1920 1080 L0 1080 Z"
          fill="#0a0d0c"
          opacity="0.55"
          animate={reduced ? undefined : { x: [0, -8, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 22, ease: "easeInOut", repeat: Infinity }
          }
        />

        {/* === 6. Montagnes proches === */}
        <path
          d="M0 810 L160 778 L380 798 L600 768 L860 792 L1100 772 L1380 795 L1620 776 L1920 790 L1920 1080 L0 1080 Z"
          fill="#06080a"
          opacity="0.92"
        />

        {/* === 7. Brume horizon === */}
        <rect x="0" y="780" width="1920" height="80" fill="url(#hero-haze)" />

        {/* === 8. Grille de panneaux PV en perspective (5 rangées receding) === */}
        {/* Rangée la plus lointaine — fine et fanée */}
        <rect x="0" y="820" width="1920" height="18" fill="url(#hero-panel)" opacity="0.28" />
        {/* Plus proches — chaque rangée plus haute et plus visible */}
        <rect x="0" y="845" width="1920" height="26" fill="url(#hero-panel)" opacity="0.46" />
        <rect x="0" y="880" width="1920" height="36" fill="url(#hero-panel)" opacity="0.66" />
        <rect x="0" y="925" width="1920" height="50" fill="url(#hero-panel)" opacity="0.84" />
        <rect x="0" y="985" width="1920" height="95" fill="url(#hero-panel)" opacity="1" />

        {/* Lueur en haut de la rangée la plus proche (reflet) */}
        <rect
          x="0"
          y="983"
          width="1920"
          height="4"
          fill="#f2b544"
          opacity="0.35"
        />

        {/* === 9. Particules atmosphériques === */}
        {!reduced ? <Particles /> : null}

        {/* === 10. Vignette mix-blend === */}
        <rect
          width="1920"
          height="1080"
          fill="url(#hero-haze)"
          opacity="0.35"
        />
      </svg>

      {/* Vignette CSS radiale (mix-blend hors SVG pour meilleure compatibilité) */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "radial-gradient(ellipse at center 65%, transparent 28%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  );
}

/**
 * 12 particules ambrées qui montent en boucle. Positions et timings déterministes
 * (basés sur l'index) pour conserver `pure-render` sans Math.random().
 */
function Particles() {
  const COUNT = 12;
  return (
    <>
      {Array.from({ length: COUNT }).map((_, i) => {
        const x = 120 + ((i * 173) % 1700);
        const startY = 700 + ((i * 53) % 280);
        const size = 1 + (i % 3) * 0.8;
        const duration = 8 + (i % 4) * 1.5;
        const delay = (i * 0.65) % duration;
        const driftX = ((i % 3) - 1) * 25;

        return (
          <motion.circle
            key={i}
            cx={x}
            cy={startY}
            r={size}
            fill="#f2b544"
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{
              opacity: [0, 0.75, 0.4, 0],
              y: [0, -180, -360, -480],
              x: [0, driftX, driftX * 1.4, driftX * 1.8],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.25, 0.7, 1],
            }}
          />
        );
      })}
    </>
  );
}
