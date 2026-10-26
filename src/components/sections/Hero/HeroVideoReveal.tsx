"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { HeroSceneSVG } from "./HeroSceneSVG";

interface HeroVideoRevealProps {
  className?: string;
  /** Source AV1 / WebM. Si présente, se superpose à la scène SVG procédurale. */
  videoSrcWebm?: string;
  /** Fallback H.264 / MP4 pour Safari ≤ 17 et navigateurs anciens. */
  videoSrcMp4?: string;
  /** Poster affiché avant que la vidéo charge. */
  posterSrc?: string;
}

/**
 * HeroVideoReveal — moment cinématographique d'arrivée.
 *
 * **Architecture en couches** (du fond vers l'avant) :
 *  1. `HeroSceneSVG` — scène solaire procédurale, **toujours visible**. Pas
 *     d'asset binaire, pas de fetch. C'est la signature visuelle SEWT par défaut.
 *  2. `<video>` (optionnel) — si le fichier existe dans `/public/videos/`, il
 *     se superpose à la scène et la masque. Sinon transparent et la SVG reste.
 *  3. Voile dynamique — opacifie progressivement au scroll pour transition.
 *  4. Dégradé bas — couture douce vers la section suivante.
 *
 * **Mécanique d'animation** (2 phases) :
 *  1. **Mount** : la couche complète est dévoilée via `clip-path: circle()` qui
 *     s'agrandit de 0 % à 150 % en 1,6 s, ease out-expo, delay 150 ms.
 *  2. **Scroll** : le rayon se rétracte (1 × → 0,2 ×), le voile s'opacifie
 *     (0,55 → 0,92), la scène scale légèrement (1 → 1,12) — Ken Burns + fade out.
 *
 * **Reduced-motion** : aucune animation, scène SVG figée plein écran avec voile
 * fixe 0,6. Le rendu reste visuellement fort sans transition.
 */
export function HeroVideoReveal({
  className,
  videoSrcWebm,
  videoSrcMp4,
  posterSrc,
}: HeroVideoRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const baseRadius = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scrollFactor = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const finalRadius = useTransform(
    () => baseRadius.get() * scrollFactor.get(),
  );

  const clipPath = useTransform(finalRadius, (v) => {
    const safe = Math.max(0, v);
    return `circle(${safe.toFixed(2)}% at 50% 50%)`;
  });

  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const voileOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0.62, 0.78, 0.94],
  );

  useEffect(() => {
    if (reduced) {
      baseRadius.set(150);
      return;
    }
    const controls = animate(baseRadius, 150, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.15,
    });
    return () => controls.stop();
  }, [baseRadius, reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* Calque révélé par mask radial */}
      <motion.div
        className="absolute inset-0"
        style={
          reduced
            ? { clipPath: "circle(150% at 50% 50%)" }
            : { clipPath, willChange: "clip-path" }
        }
      >
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { scale: sceneScale, willChange: "transform" }}
        >
          {/* Couche 1 : scène SVG procédurale (toujours visible) */}
          <HeroSceneSVG />

          {/* Couche 2 : vidéo optionnelle — recouvre la SVG si fichier présent */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterSrc}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={videoSrcWebm} type='video/webm; codecs="av01"' />
            <source src={videoSrcMp4} type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>

      {/* Voile sombre : garantit le contraste de la typographie */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-bg"
        style={reduced ? { opacity: 0.65 } : { opacity: voileOpacity }}
      />

      {/* Dégradé bas → transition douce vers la section suivante */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgb(var(--bg-rgb) / 0.6) 60%, rgb(var(--bg-rgb)) 100%)",
        }}
      />
    </div>
  );
}
