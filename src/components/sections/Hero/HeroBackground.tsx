"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Hero background "WebGL simulé".
 * 3 orbes de gradient floutées qui suivent la souris avec spring lente (luxueux),
 * grille noise, deux diagonales SVG d'accent. Zéro canvas, zéro WebGL réel —
 * tout en CSS + Framer Motion pour rester GPU-accelerated.
 *
 * Désactive le tracking souris :
 *  - sur pointeurs grossiers (touch),
 *  - sous prefers-reduced-motion.
 */
export function HeroBackground() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 40, damping: 28, mass: 1 });
  const sy = useSpring(my, { stiffness: 40, damping: 28, mass: 1 });

  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    let raf = 0;
    let lastX = 0.5;
    let lastY = 0.5;

    const onMove = (e: PointerEvent) => {
      lastX = e.clientX / window.innerWidth;
      lastY = e.clientY / window.innerHeight;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        mx.set(lastX);
        my.set(lastY);
        raf = 0;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mx, my, reduced]);

  const orb1X = useTransform(sx, [0, 1], ["-14%", "14%"]);
  const orb1Y = useTransform(sy, [0, 1], ["-8%", "8%"]);
  const orb2X = useTransform(sx, [0, 1], ["10%", "-10%"]);
  const orb2Y = useTransform(sy, [0, 1], ["6%", "-6%"]);
  const orb3X = useTransform(sx, [0, 1], ["-6%", "6%"]);
  const orb3Y = useTransform(sy, [0, 1], ["12%", "-12%"]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
    >
      {/* Base mesh — opacité réduite pour laisser passer la vidéo HeroVideoReveal en arrière-plan */}
      <div className="absolute inset-0 gradient-mesh-dark opacity-25 dark:opacity-30" />

      {/* Orbe vert profond — top left */}
      <motion.div
        className="absolute -left-[12%] -top-[18%] h-[60vh] w-[60vw] rounded-full bg-brand/25 blur-3xl mix-blend-screen dark:mix-blend-plus-lighter"
        style={{ x: orb1X, y: orb1Y }}
      />

      {/* Orbe ambre — bottom right */}
      <motion.div
        className="absolute -bottom-[22%] -right-[14%] h-[55vh] w-[55vw] rounded-full bg-accent/25 blur-3xl mix-blend-screen dark:mix-blend-plus-lighter"
        style={{ x: orb2X, y: orb2Y }}
      />

      {/* Orbe ambre secondaire — center */}
      <motion.div
        className="absolute left-1/3 top-1/3 h-[40vh] w-[40vw] rounded-full bg-accent/12 blur-3xl"
        style={{ x: orb3X, y: orb3Y }}
      />

      {/* Diagonales SVG d'accent */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="diag-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.22" />
            <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="diag-brand" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(var(--brand-rgb))" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(var(--brand-rgb))" stopOpacity="0.20" />
            <stop offset="100%" stopColor="rgb(var(--brand-rgb))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="-5%"
          y1="78%"
          x2="105%"
          y2="22%"
          stroke="url(#diag-accent)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="18%"
          y1="-5%"
          x2="82%"
          y2="105%"
          stroke="url(#diag-brand)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Grille noise */}
      <div className="absolute inset-0 grid-noise opacity-40" />

      {/* Vignette douce pour gommer les bords */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgb(var(--bg-rgb) / 0.55) 100%)",
        }}
      />
    </div>
  );
}
