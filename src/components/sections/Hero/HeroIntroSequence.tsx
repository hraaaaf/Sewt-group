"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STORAGE_KEY = "sewt-intro-seen";
const COOLDOWN_HOURS = 24;
const DURATION_MS = 2400;

export function HeroIntroSequence() {
  const [show, setShow] = useState<boolean | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShow(false);
      return;
    }
    try {
      const lastSeen = localStorage.getItem(STORAGE_KEY);
      if (lastSeen) {
        const ts = parseInt(lastSeen, 10);
        if (Number.isFinite(ts)) {
          const hoursSince = (Date.now() - ts) / (1000 * 60 * 60);
          if (hoursSince < COOLDOWN_HOURS) {
            setShow(false);
            return;
          }
        }
      }
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* localStorage indispo */
    }
    setShow(true);
  }, [reduced]);

  useEffect(() => {
    if (!show) return;
    const t = window.setTimeout(() => setShow(false), DURATION_MS);
    return () => window.clearTimeout(t);
  }, [show]);

  const handleSkip = () => {
    setShow(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* noop */
    }
  };

  if (show !== true) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#06070a]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        aria-label="Initialisation SEWT"
        role="presentation"
      >
        {/* Skip button discret */}
        <button
          type="button"
          onClick={handleSkip}
          className="absolute right-5 top-5 z-10 inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 backdrop-blur transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
          aria-label="Passer l'introduction"
        >
          <span>Passer</span>
          <X className="h-3 w-3" aria-hidden />
        </button>

        {/* === Thinking pulse — inspiré du loader Claude === */}
        <ThinkingPulse />

        {/* Wordmark sous le pulse */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: [0, 1, 1, 0], y: 0 }}
          transition={{
            duration: 2.0,
            delay: 0.4,
            times: [0, 0.25, 0.75, 1],
            ease: "easeInOut",
          }}
        >
          <Image
            src="/brand/sewt-official-color.png"
            alt="Sun Energy and Water Technologies Group"
            width={234}
            height={83}
            priority
            className="h-auto w-48 object-contain brightness-0 invert sm:w-56"
          />
        </motion.div>

        {/* Indicateur statut bas */}
        <motion.div
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.7, 0] }}
          transition={{
            duration: 2.2,
            delay: 0.1,
            times: [0, 0.2, 0.8, 1],
          }}
        >
          <span className="relative inline-flex h-1.5 w-1.5">
            <motion.span
              className="absolute inset-0 rounded-full bg-[#F2A33D]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <span>Initialisation</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * ThinkingPulse — animation de chargement inspirée du loader Claude :
 * un point central qui respire, entouré de 3 anneaux qui se diffusent en stagger,
 * avec un sweep gradient subtil par-dessus.
 */
function ThinkingPulse() {
  return (
    <div className="relative h-40 w-40 sm:h-48 sm:w-48">
      {/* Anneaux concentriques qui se diffusent (ripples) */}
      {[0, 0.4, 0.8].map((delay, i) => (
        <motion.span
          key={`ring-${i}`}
          aria-hidden
          className="absolute inset-0 rounded-full border border-[#F2A33D]"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{
            scale: [0.3, 1.4],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      {/* Halo radial diffus */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(242,163,61,0.35) 0%, rgba(242,163,61,0.05) 60%, transparent 100%)",
        }}
        animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Point central pulsant — Claude-like */}
      <motion.span
        aria-hidden
        className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F2A33D]"
        style={{
          boxShadow: "0 0 24px rgba(242,163,61,0.85), 0 0 64px rgba(242,163,61,0.4)",
        }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 0.9, 1.05, 1] }}
        transition={{ duration: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
      />

      {/* Sweep gradient diagonal qui passe sur le pulse */}
      <motion.span
        aria-hidden
        className="absolute inset-0 overflow-hidden rounded-full"
      >
        <motion.span
          className="absolute -inset-y-10 -left-1/2 w-24 origin-center bg-gradient-to-r from-transparent via-white/60 to-transparent blur-2xl"
          initial={{ x: "-50%", opacity: 0 }}
          animate={{ x: "250%", opacity: [0, 0.7, 0] }}
          transition={{
            duration: 1.5,
            delay: 0.8,
            ease: [0.65, 0, 0.35, 1],
          }}
          style={{ transform: "rotate(28deg)" }}
        />
      </motion.span>

      {/* Étoile à 4 branches subtile autour du dot (réminiscence Claude logo) */}
      <motion.svg
        aria-hidden
        viewBox="-50 -50 100 100"
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: [0, 0.45, 0], rotate: 0 }}
        transition={{ duration: 2.0, delay: 0.3, ease: "easeOut" }}
      >
        <g stroke="#F2A33D" strokeWidth="0.6" strokeLinecap="round" opacity="0.7">
          <line x1="0" y1="-44" x2="0" y2="-18" />
          <line x1="0" y1="18" x2="0" y2="44" />
          <line x1="-44" y1="0" x2="-18" y2="0" />
          <line x1="18" y1="0" x2="44" y2="0" />
        </g>
      </motion.svg>
    </div>
  );
}
