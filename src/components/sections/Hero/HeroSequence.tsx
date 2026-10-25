"use client";

import { useEffect, useRef } from "react";
import {
  animate as motionAnimate,
  motion,
  stagger,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

/**
 * HeroSequence — séquence narrative cinématique 100 % SVG, autonome au mount.
 *
 * 8 actes orchestrés en timeline impérative Framer Motion (`useAnimate`).
 * Aucune dépendance au scroll. Animations GPU-only (transform / opacity /
 * stroke-dashoffset via `pathLength`).
 *
 * Acte 1 (0.0 s)   — Fondations : point → ligne → grille isométrique.
 * Acte 2 (1.5 s)   — Essence    : goutte d'eau + rayon solaire.
 * Acte 3 (3.0 s)   — Échelle    : matrice de panneaux en perspective.
 * Acte 4 (4.5 s)   — Impact     : scan line + compteur 0 → 150 MWc.
 * Acte 5 (6.0 s)   — Excellence : halos circulaires concentriques.
 * Acte 6 (7.5 s)   — Empreinte  : contour Maroc + points villes.
 * Acte 7 (9.0 s)   — Innovation : ondes radar sortantes.
 * Acte 8 (10.5 s+) — Signature  : "SEWT GROUP" avec glow, état persistant.
 *
 * reduced-motion : saut direct sur l'Acte 8 (signature), aucune animation.
 */

const VB = { w: 1200, h: 800 };
const CX = VB.w / 2;
const CY = VB.h / 2;

const CITIES: ReadonlyArray<{ x: number; y: number; name: string }> = [
  { x: 510, y: 350, name: "Rabat" },
  { x: 490, y: 380, name: "Casablanca" },
  { x: 560, y: 280, name: "Tanger" },
  { x: 540, y: 440, name: "Marrakech" },
  { x: 470, y: 470, name: "Agadir" },
];

const MOROCCO_PATH =
  "M 480 280 L 520 240 L 580 250 L 640 235 L 700 245 L 740 270 L 760 320 L 780 380 L 770 440 L 740 500 L 700 540 L 650 560 L 580 570 L 520 555 L 470 530 L 430 480 L 410 420 L 400 360 L 420 310 Z";

export function HeroSequence({ className }: { className?: string }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduced = useReducedMotion();
  const counter = useMotionValue(0);
  const counterRef = useRef<SVGTextElement | null>(null);

  useMotionValueEvent(counter, "change", (v) => {
    if (counterRef.current) {
      counterRef.current.textContent = Math.round(v).toString();
    }
  });

  useEffect(() => {
    if (reduced) return;

    const ctrl = animate(
      [
        // ===== ACTE 1 — Fondations (0.0 → 1.5 s) =====
        [".act1-dot", { opacity: 1, scale: 1 }, { duration: 0.35, at: 0 }],
        [
          ".act1-line",
          { pathLength: 1, opacity: 1 },
          { duration: 0.6, at: 0.3, ease: [0.16, 1, 0.3, 1] },
        ],
        [
          ".act1-grid-line",
          { pathLength: 1, opacity: 0.55 },
          { duration: 0.85, at: 0.7, delay: stagger(0.04), ease: "easeOut" },
        ],

        // ===== ACTE 2 — Essence (1.5 → 3.0 s) =====
        [".act1", { opacity: 0 }, { duration: 0.4, at: 1.4 }],
        [".act2", { opacity: 1 }, { duration: 0.3, at: 1.5 }],
        [
          ".act2-drop",
          { pathLength: 1 },
          { duration: 0.85, at: 1.55, ease: "easeOut" },
        ],
        [
          ".act2-sun",
          { scale: 1, opacity: 1 },
          { duration: 0.6, at: 1.8, ease: [0.16, 1, 0.3, 1] },
        ],
        [
          ".act2-sun-ray",
          { pathLength: 1, opacity: 1 },
          { duration: 0.45, at: 2.1, delay: stagger(0.045) },
        ],

        // ===== ACTE 3 — Échelle (3.0 → 4.5 s) =====
        [".act2", { opacity: 0 }, { duration: 0.4, at: 2.9 }],
        [".act3", { opacity: 1 }, { duration: 0.3, at: 3.0 }],
        [
          ".act3-panel",
          { opacity: 0.85, scale: 1 },
          { duration: 0.5, at: 3.1, delay: stagger(0.035), ease: "easeOut" },
        ],

        // ===== ACTE 4 — Impact (4.5 → 6.0 s) =====
        [".act3", { opacity: 0 }, { duration: 0.4, at: 4.4 }],
        [".act4", { opacity: 1 }, { duration: 0.3, at: 4.5 }],
        [
          ".act4-scan",
          { x: VB.w + 50 },
          { duration: 1.1, at: 4.55, ease: [0.45, 0, 0.55, 1] },
        ],
        [
          ".act4-counter",
          { opacity: 1, y: 0 },
          { duration: 0.45, at: 4.85, ease: [0.16, 1, 0.3, 1] },
        ],

        // ===== ACTE 5 — Excellence (6.0 → 7.5 s) =====
        [".act4", { opacity: 0 }, { duration: 0.4, at: 5.9 }],
        [".act5", { opacity: 1 }, { duration: 0.3, at: 6.0 }],
        [
          ".act5-halo",
          { scale: 8, opacity: 0 },
          { duration: 1.35, at: 6.1, delay: stagger(0.22), ease: "easeOut" },
        ],

        // ===== ACTE 6 — Empreinte (7.5 → 9.0 s) =====
        [".act5", { opacity: 0 }, { duration: 0.4, at: 7.4 }],
        [".act6", { opacity: 1 }, { duration: 0.3, at: 7.5 }],
        [
          ".act6-map",
          { pathLength: 1, opacity: 1 },
          { duration: 0.95, at: 7.55, ease: "easeOut" },
        ],
        [
          ".act6-city",
          { opacity: 1, scale: 1 },
          { duration: 0.4, at: 8.35, delay: stagger(0.09), ease: [0.34, 1.56, 0.64, 1] },
        ],

        // ===== ACTE 7 — Innovation (9.0 → 10.5 s) =====
        [".act6", { opacity: 0 }, { duration: 0.4, at: 8.9 }],
        [".act7", { opacity: 1 }, { duration: 0.3, at: 9.0 }],
        [
          ".act7-radar",
          { scale: 5, opacity: 0 },
          { duration: 1.35, at: 9.1, delay: stagger(0.28), ease: "easeOut" },
        ],

        // ===== ACTE 8 — Signature (10.5 s+ ; final state) =====
        [".act7", { opacity: 0 }, { duration: 0.4, at: 10.4 }],
        [".act8", { opacity: 1 }, { duration: 0.6, at: 10.5 }],
        [
          ".act8-signature",
          { scale: 1, opacity: 1 },
          { duration: 1.0, at: 10.6, ease: [0.16, 1, 0.3, 1] },
        ],
        [
          ".act8-underline",
          { pathLength: 1 },
          { duration: 0.8, at: 11.0, ease: "easeOut" },
        ],
      ],
    );

    // Compteur 0 → 150 (synchro Acte 4)
    const counterCtrl = motionAnimate(counter, 150, {
      duration: 1.1,
      delay: 4.75,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => {
      ctrl.stop();
      counterCtrl.stop();
    };
  }, [animate, reduced, counter]);

  // ====== reduced-motion : rendu direct sur l'Acte 8 ======
  if (reduced) {
    return (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden",
          className,
        )}
      >
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full"
        >
          <defs>
            <filter id="hero-seq-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <text
            x={CX}
            y={CY - 10}
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontSize="100"
            fontWeight="800"
            fill="rgb(var(--accent-rgb))"
            filter="url(#hero-seq-glow)"
            letterSpacing="-2"
          >
            SEWT GROUP
          </text>
          <text
            x={CX}
            y={CY + 45}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="14"
            letterSpacing="6"
            fill="rgb(var(--fg-rgb))"
            opacity="0.7"
          >
            SUN ENERGY · WATER · TECHNOLOGIES
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={scope}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
      >
        <defs>
          <filter id="hero-seq-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* =============== ACTE 1 — Fondations =============== */}
        <g className="act1">
          <motion.circle
            className="act1-dot"
            cx={CX}
            cy={CY}
            r="6"
            fill="rgb(var(--accent-rgb))"
            initial={{ opacity: 0, scale: 0 }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
            filter="url(#hero-seq-glow)"
          />
          <motion.line
            className="act1-line"
            x1={CX - 220}
            y1={CY}
            x2={CX + 220}
            y2={CY}
            stroke="rgb(var(--accent-rgb))"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
          />
          {/* Grille verticale */}
          {Array.from({ length: 7 }).map((_, i) => {
            const x = CX - 300 + i * 100;
            return (
              <motion.line
                key={`v-${i}`}
                className="act1-grid-line"
                x1={x}
                y1={CY - 160}
                x2={x}
                y2={CY + 160}
                stroke="rgb(var(--accent-rgb))"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
              />
            );
          })}
          {/* Grille horizontale */}
          {Array.from({ length: 7 }).map((_, i) => {
            const y = CY - 150 + i * 50;
            return (
              <motion.line
                key={`h-${i}`}
                className="act1-grid-line"
                x1={CX - 320}
                y1={y}
                x2={CX + 320}
                y2={y}
                stroke="rgb(var(--accent-rgb))"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
              />
            );
          })}
        </g>

        {/* =============== ACTE 2 — Essence =============== */}
        <motion.g className="act2" initial={{ opacity: 0 }}>
          {/* Goutte d'eau */}
          <motion.path
            className="act2-drop"
            d={`M ${CX - 220} ${CY - 80} C ${CX - 270} ${CY - 30} ${CX - 270} ${CY + 30} ${CX - 220} ${CY + 60} C ${CX - 170} ${CY + 30} ${CX - 170} ${CY - 30} ${CX - 220} ${CY - 80} Z`}
            fill="none"
            stroke="rgb(var(--accent-rgb))"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            filter="url(#hero-seq-glow)"
          />
          {/* Soleil */}
          <motion.circle
            className="act2-sun"
            cx={CX + 220}
            cy={CY}
            r="42"
            fill="none"
            stroke="rgb(var(--accent-rgb))"
            strokeWidth="2.5"
            initial={{ scale: 0, opacity: 0 }}
            style={{ transformOrigin: `${CX + 220}px ${CY}px` }}
            filter="url(#hero-seq-glow)"
          />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x1 = CX + 220 + Math.cos(angle) * 58;
            const y1 = CY + Math.sin(angle) * 58;
            const x2 = CX + 220 + Math.cos(angle) * 86;
            const y2 = CY + Math.sin(angle) * 86;
            return (
              <motion.line
                key={`ray-${i}`}
                className="act2-sun-ray"
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgb(var(--accent-rgb))"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
              />
            );
          })}
        </motion.g>

        {/* =============== ACTE 3 — Échelle (matrice perspective) =============== */}
        <motion.g
          className="act3"
          initial={{ opacity: 0 }}
          transform={`translate(${CX} ${CY}) skewX(-14) scale(0.92)`}
        >
          {Array.from({ length: 24 }).map((_, i) => {
            const col = i % 6;
            const row = Math.floor(i / 6);
            const x = (col - 2.5) * 92;
            const y = (row - 1.5) * 62;
            return (
              <motion.g
                key={`panel-${i}`}
                className="act3-panel"
                initial={{ opacity: 0, scale: 0.4 }}
                style={{ transformOrigin: `${x + 40}px ${y + 25}px` }}
              >
                <rect
                  x={x}
                  y={y}
                  width="80"
                  height="50"
                  fill="rgb(var(--accent-rgb) / 0.08)"
                  stroke="rgb(var(--accent-rgb))"
                  strokeWidth="1.5"
                />
                <line
                  x1={x + 40}
                  y1={y}
                  x2={x + 40}
                  y2={y + 50}
                  stroke="rgb(var(--accent-rgb))"
                  strokeOpacity="0.35"
                  strokeWidth="0.6"
                />
                <line
                  x1={x}
                  y1={y + 25}
                  x2={x + 80}
                  y2={y + 25}
                  stroke="rgb(var(--accent-rgb))"
                  strokeOpacity="0.35"
                  strokeWidth="0.6"
                />
              </motion.g>
            );
          })}
        </motion.g>

        {/* =============== ACTE 4 — Impact (scan + compteur) =============== */}
        <motion.g className="act4" initial={{ opacity: 0 }}>
          <motion.rect
            className="act4-scan"
            x="-50"
            y={CY - 220}
            width="3"
            height="440"
            fill="rgb(var(--accent-rgb))"
            filter="url(#hero-seq-glow)"
            initial={{ x: -50 }}
          />
          <motion.g
            className="act4-counter"
            initial={{ opacity: 0, y: 24 }}
          >
            <text
              x={CX}
              y={CY - 10}
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontSize="140"
              fontWeight="800"
              fill="rgb(var(--accent-rgb))"
              filter="url(#hero-seq-glow)"
              letterSpacing="-3"
            >
              <tspan ref={counterRef}>0</tspan>
            </text>
            <text
              x={CX}
              y={CY + 50}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="18"
              letterSpacing="6"
              fill="rgb(var(--fg-rgb))"
              opacity="0.7"
            >
              MWc · CAPACITÉ DÉPLOYABLE
            </text>
          </motion.g>
        </motion.g>

        {/* =============== ACTE 5 — Excellence (halos) =============== */}
        <motion.g className="act5" initial={{ opacity: 0 }}>
          {[0, 1, 2, 3].map((i) => (
            <motion.circle
              key={`halo-${i}`}
              className="act5-halo"
              cx={CX}
              cy={CY}
              r="40"
              fill="none"
              stroke="rgb(var(--accent-rgb))"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0.7 }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            />
          ))}
        </motion.g>

        {/* =============== ACTE 6 — Empreinte (Maroc) =============== */}
        <motion.g className="act6" initial={{ opacity: 0 }}>
          <motion.path
            className="act6-map"
            d={MOROCCO_PATH}
            fill="rgb(var(--accent-rgb) / 0.04)"
            stroke="rgb(var(--accent-rgb))"
            strokeWidth="2.5"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            filter="url(#hero-seq-glow)"
          />
          {CITIES.map((city) => (
            <motion.circle
              key={city.name}
              className="act6-city"
              cx={city.x}
              cy={city.y}
              r="6"
              fill="rgb(var(--accent-rgb))"
              filter="url(#hero-seq-glow)"
              initial={{ opacity: 0, scale: 0 }}
              style={{ transformOrigin: `${city.x}px ${city.y}px` }}
            />
          ))}
        </motion.g>

        {/* =============== ACTE 7 — Innovation (radar) =============== */}
        <motion.g className="act7" initial={{ opacity: 0 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.circle
              key={`radar-${i}`}
              className="act7-radar"
              cx={CX}
              cy={CY}
              r="50"
              fill="none"
              stroke="rgb(var(--accent-rgb))"
              strokeWidth="1.8"
              initial={{ scale: 0, opacity: 0.8 }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            />
          ))}
        </motion.g>

        {/* =============== ACTE 8 — Signature =============== */}
        <motion.g className="act8" initial={{ opacity: 0 }}>
          <motion.g
            className="act8-signature"
            initial={{ scale: 0.85, opacity: 0 }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          >
            <text
              x={CX}
              y={CY - 10}
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontSize="100"
              fontWeight="800"
              fill="rgb(var(--accent-rgb))"
              filter="url(#hero-seq-glow)"
              letterSpacing="-2"
            >
              SEWT GROUP
            </text>
            <text
              x={CX}
              y={CY + 45}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="14"
              letterSpacing="6"
              fill="rgb(var(--fg-rgb))"
              opacity="0.7"
            >
              SUN ENERGY · WATER · TECHNOLOGIES
            </text>
            <motion.line
              className="act8-underline"
              x1={CX - 140}
              y1={CY + 70}
              x2={CX + 140}
              y2={CY + 70}
              stroke="rgb(var(--accent-rgb))"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
            />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
