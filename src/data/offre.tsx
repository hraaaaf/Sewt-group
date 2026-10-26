"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export interface OffreStat {
  readonly key: string;
  readonly value: string;
  readonly unit?: string;
  /** Cible numérique pour count-up. Si absent : affichage statique. */
  readonly numericTarget?: number;
  readonly decimals?: number;
  readonly thousands?: "space" | "comma" | "none";
}

export interface OffreScene {
  readonly id: string;
  readonly index: string;
  readonly kicker: string;
  readonly headline: ReactNode;
  readonly body: string;
  readonly stats: ReadonlyArray<OffreStat>;
  readonly figure: ReactNode;
  /** Tint chromatique secondaire (overlay RGB hex). */
  readonly accentTint: string;
}

// ============================================================================
// SVG FIGURES — autoplay loop animations (framer-motion)
// ============================================================================

const PhotovoltaiqueFigure = (
  <svg
    viewBox="0 0 200 250"
    fill="none"
    aria-hidden
    className="h-[78%] w-[78%] text-accent"
    style={{ opacity: 0.92 }}
  >
    {/* Soleil pulsant */}
    <motion.circle
      cx="155"
      cy="55"
      r="22"
      stroke="currentColor"
      strokeWidth="1.5"
      animate={{ r: [22, 28, 22], opacity: [0.5, 0.75, 0.5] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle
      cx="155"
      cy="55"
      r="10"
      fill="currentColor"
      animate={{ opacity: [0.4, 0.85, 0.4] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Rayons soleil */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <motion.line
        key={`ray-${i}`}
        x1="155"
        y1="55"
        x2={155 + Math.cos((angle * Math.PI) / 180) * 36}
        y2={55 + Math.sin((angle * Math.PI) / 180) * 36}
        stroke="currentColor"
        strokeWidth="1"
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.08,
        }}
      />
    ))}

    {/* Rangée 1 panneaux PV (s'allument séquentiellement) */}
    <g transform="translate(20,110)">
      <motion.path
        d="M0 0 L80 0 L92 -24 L8 -24 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="rgba(242,181,68,0.15)"
        animate={{ fill: ["rgba(242,181,68,0.10)", "rgba(242,181,68,0.45)", "rgba(242,181,68,0.10)"] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0 }}
      />
      <motion.path
        d="M0 0 L80 0 L92 -24 L8 -24 Z"
        transform="translate(70,0)"
        stroke="currentColor"
        strokeWidth="2"
        fill="rgba(242,181,68,0.15)"
        animate={{ fill: ["rgba(242,181,68,0.10)", "rgba(242,181,68,0.45)", "rgba(242,181,68,0.10)"] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
      <line x1="0" y1="0" x2="80" y2="0" stroke="currentColor" strokeWidth="1" />
      <line x1="20" y1="0" x2="28" y2="-24" stroke="currentColor" strokeWidth="1" />
      <line x1="40" y1="0" x2="48" y2="-24" stroke="currentColor" strokeWidth="1" />
      <line x1="60" y1="0" x2="68" y2="-24" stroke="currentColor" strokeWidth="1" />
    </g>

    {/* Rangée 2 panneaux PV */}
    <g transform="translate(20,160)">
      <motion.path
        d="M0 0 L80 0 L92 -24 L8 -24 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="rgba(242,181,68,0.15)"
        animate={{ fill: ["rgba(242,181,68,0.10)", "rgba(242,181,68,0.45)", "rgba(242,181,68,0.10)"] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      <motion.path
        d="M0 0 L80 0 L92 -24 L8 -24 Z"
        transform="translate(70,0)"
        stroke="currentColor"
        strokeWidth="2"
        fill="rgba(242,181,68,0.15)"
        animate={{ fill: ["rgba(242,181,68,0.10)", "rgba(242,181,68,0.45)", "rgba(242,181,68,0.10)"] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />
      <line x1="20" y1="0" x2="28" y2="-24" stroke="currentColor" strokeWidth="1" />
      <line x1="40" y1="0" x2="48" y2="-24" stroke="currentColor" strokeWidth="1" />
      <line x1="60" y1="0" x2="68" y2="-24" stroke="currentColor" strokeWidth="1" />
    </g>
  </svg>
);

const PompageFigure = (
  <svg
    viewBox="0 0 200 250"
    fill="none"
    aria-hidden
    className="h-[78%] w-[78%] text-accent"
    style={{ opacity: 0.92 }}
  >
    {/* Panneaux PV alimentant la pompe */}
    <rect x="40" y="20" width="120" height="60" stroke="currentColor" strokeWidth="2" fill="rgba(242,181,68,0.10)" rx="2" />
    <line x1="40" y1="40" x2="160" y2="40" stroke="currentColor" strokeWidth="1" />
    <line x1="40" y1="60" x2="160" y2="60" stroke="currentColor" strokeWidth="1" />
    <line x1="80" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="1" />
    <line x1="120" y1="20" x2="120" y2="80" stroke="currentColor" strokeWidth="1" />

    {/* Câble électrique vers la pompe — pulses lumineux */}
    <line x1="100" y1="80" x2="100" y2="150" stroke="currentColor" strokeWidth="2" />
    {[0, 1, 2].map((i) => (
      <motion.circle
        key={`pulse-${i}`}
        cx="100"
        r="2.5"
        fill="rgb(160 220 255)"
        animate={{ cy: [80, 150], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "linear",
          delay: i * 0.55,
        }}
      />
    ))}

    {/* Pompe centrale rotative */}
    <circle cx="100" cy="170" r="18" stroke="currentColor" strokeWidth="2" fill="rgba(242,181,68,0.15)" />
    <motion.circle
      cx="100"
      cy="170"
      r="6"
      fill="currentColor"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "100px 170px" }}
    />

    {/* Sortie eau — gouttes qui tombent en boucle */}
    <line x1="100" y1="188" x2="100" y2="210" stroke="currentColor" strokeWidth="2" />
    <line x1="80" y1="220" x2="120" y2="220" stroke="currentColor" strokeWidth="2" />
    <line x1="80" y1="220" x2="80" y2="240" stroke="currentColor" strokeWidth="2" />
    <line x1="120" y1="220" x2="120" y2="240" stroke="currentColor" strokeWidth="2" />
    {[0, 1, 2, 3].map((i) => (
      <motion.circle
        key={`drop-${i}`}
        cx={80 + (i % 2) * 40}
        r="2.5"
        fill="rgb(120 200 255)"
        animate={{ cy: [240, 248], opacity: [0.9, 0] }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          ease: "easeIn",
          delay: i * 0.22,
        }}
      />
    ))}
  </svg>
);

const ThermiqueFigure = (
  <svg
    viewBox="0 0 200 250"
    fill="none"
    aria-hidden
    className="h-[78%] w-[78%] text-accent"
    style={{ opacity: 0.92 }}
  >
    {/* Capteur thermique */}
    <rect x="20" y="20" width="160" height="80" stroke="currentColor" strokeWidth="2" fill="rgba(242,181,68,0.10)" rx="2" />
    <line x1="60" y1="20" x2="60" y2="100" stroke="currentColor" strokeWidth="1" />
    <line x1="100" y1="20" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
    <line x1="140" y1="20" x2="140" y2="100" stroke="currentColor" strokeWidth="1" />
    <line x1="20" y1="60" x2="180" y2="60" stroke="currentColor" strokeWidth="1" />

    {/* Soleil chaud pulsant sur le capteur */}
    <motion.rect
      x="20"
      y="20"
      width="160"
      height="80"
      rx="2"
      fill="rgba(245,120,80,0.15)"
      animate={{ opacity: [0.2, 0.8, 0.2] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Tuyau eau */}
    <path d="M100 100 L100 140 L60 140 L60 180" stroke="currentColor" strokeWidth="2" fill="none" />

    {/* Eau chaude qui circule — pulses */}
    {[0, 1, 2].map((i) => (
      <motion.circle
        key={`hot-${i}`}
        r="2.5"
        fill="rgb(245 140 100)"
        animate={{
          offsetDistance: ["0%", "100%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "linear",
          delay: i * 0.7,
        }}
        style={{
          offsetPath: 'path("M100 100 L100 140 L60 140 L60 180")',
        }}
      />
    ))}

    {/* Ballon ECS */}
    <rect x="40" y="180" width="40" height="60" stroke="currentColor" strokeWidth="2" fill="rgba(242,181,68,0.15)" rx="6" />
    <line x1="40" y1="200" x2="80" y2="200" stroke="currentColor" strokeWidth="1" />
    <line x1="40" y1="215" x2="80" y2="215" stroke="currentColor" strokeWidth="1" />
    <line x1="40" y1="230" x2="80" y2="230" stroke="currentColor" strokeWidth="1" />

    {/* Vagues de chaleur qui montent */}
    {[120, 140, 160].map((x, i) => (
      <motion.path
        key={`wave-${i}`}
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        animate={{
          d: [
            `M${x} 220 Q ${x + 10} 210 ${x} 200 Q ${x - 10} 190 ${x} 180`,
            `M${x} 200 Q ${x + 10} 190 ${x} 180 Q ${x - 10} 170 ${x} 160`,
            `M${x} 180 Q ${x + 10} 170 ${x} 160 Q ${x - 10} 150 ${x} 140`,
          ],
          opacity: [0.6, 0.4, 0],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeOut",
          delay: i * 0.4,
        }}
      />
    ))}
  </svg>
);

// ============================================================================
// SCENES
// ============================================================================

export const offreScenes: ReadonlyArray<OffreScene> = [
  {
    id: "distribution",
    index: "01",
    kicker: "Pôle 01 · Distribution",
    headline: (
      <>
        Équipements solaires tier-1,{" "}
        <span className="text-accent">sourcing direct fabricants</span>.
      </>
    ),
    body: "Onduleurs Huawei et Deye, modules Jinko, structures Euro Tray et KBE Berlin, capteurs Suntherm. Garanties fabricant intégrales, stock local Casablanca.",
    stats: [
      { key: "Marques tier-1", value: "7", unit: "fournisseurs", numericTarget: 7 },
      { key: "Délais", value: "< 2", unit: "semaines" },
      { key: "Garantie", value: "fabricant", unit: "intégrale" },
    ],
    figure: PhotovoltaiqueFigure,
    accentTint: "rgb(232 118 42)", // orange SUN logo
  },
  {
    id: "installation",
    index: "02",
    kicker: "Pôle 02 · Installation",
    headline: (
      <>
        EPC clé en main, du dossier bancable à la{" "}
        <span className="text-accent">mise en service réseau</span>.
      </>
    ),
    body: "Études, dimensionnement, ingénierie électrique, travaux structures, raccordement HTA. Équipe certifiée IEC, agréments IRESEN et MASEN.",
    stats: [
      { key: "Puissance installée", value: "1 100", unit: "kWc", numericTarget: 1100, thousands: "space" },
      { key: "Chantier", value: "2–4", unit: "mois" },
      { key: "Conformité", value: "IEC", unit: "61215 / 61730" },
    ],
    figure: PompageFigure,
    accentTint: "rgb(27 47 92)", // navy ENERGY logo
  },
  {
    id: "om",
    index: "03",
    kicker: "Pôle 03 · Exploitation & Maintenance",
    headline: (
      <>
        Télé-surveillance 24/7,{" "}
        <span className="text-accent">garantie performance 25 ans</span>.
      </>
    ),
    body: "Plateforme IoT temps réel, alertes onduleurs et ratio de performance, maintenance préventive trimestrielle, reporting mensuel. Contrat O&M longue durée.",
    stats: [
      { key: "Garantie", value: "25", unit: "ans", numericTarget: 25 },
      { key: "Maintenance", value: "trimestrielle", unit: "" },
      { key: "Reporting", value: "mensuel", unit: "+ alertes temps réel" },
    ],
    figure: ThermiqueFigure,
    accentTint: "rgb(232 118 42)", // orange SUN logo
  },
] as const;
