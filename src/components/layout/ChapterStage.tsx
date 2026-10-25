"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * ChapterStage — wrapper de chapitre "pinned" pour scrollytelling.
 *
 * Architecture :
 *  - Le wrapper extérieur (`pin-wrap`) fait `duration × 100vh` de hauteur.
 *  - L'étage intérieur (`pin-stage`) est `position: sticky; top: 0; height: 100vh`.
 *  - Au fil du scroll dans le wrapper, ScrollTrigger calcule un `progress` 0→1
 *    exposé aux enfants via `useChapterProgress()`.
 *
 * Reduced-motion ou mobile : le wrapper devient `height: auto`, l'étage se
 * dépin (position: static), `progress` reste fixé à 1 (état final révélé).
 *
 * Usage :
 *   <ChapterStage id="offre" duration={4}>
 *     <OffreContent />   // <- appelle useChapterProgress() pour piloter ses animations
 *   </ChapterStage>
 */

interface ChapterContextValue {
  progress: number;
  pinned: boolean;
}

const ChapterContext = createContext<ChapterContextValue>({ progress: 1, pinned: false });

export function useChapterProgress(): ChapterContextValue {
  return useContext(ChapterContext);
}

interface ChapterStageProps {
  id: string;
  /** Durée du pin en multiples de viewport. Ex: 4 = stage pinned sur 4 × 100vh de scroll. */
  duration: number;
  /** Label court pour le fil d'Ariane (ex: "02 / 06 · Offre"). */
  chapterLabel?: string;
  /** Désactive le pin sous ce breakpoint (px). Par défaut 880. */
  mobileBreakpoint?: number;
  className?: string;
  stageClassName?: string;
  children: ReactNode;
}

export function ChapterStage({
  id,
  duration,
  chapterLabel,
  mobileBreakpoint = 880,
  className,
  stageClassName,
  children,
}: ChapterStageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(reduced ? 1 : 0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      setPinned(false);
      return;
    }
    if (typeof window === "undefined") return;

    const isMobile = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches;
    if (isMobile) {
      setProgress(1);
      setPinned(false);
      return;
    }

    const wrap = wrapRef.current;
    if (!wrap) return;

    registerGsap();
    setPinned(true);

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => {
      trigger.kill();
    };
  }, [reduced, mobileBreakpoint]);

  const ctx = useMemo<ChapterContextValue>(
    () => ({ progress, pinned }),
    [progress, pinned],
  );

  const heightStyle = pinned ? { height: `${duration * 100}vh` } : undefined;

  return (
    <ChapterContext.Provider value={ctx}>
      <section
        id={id}
        data-chapter={id}
        data-chapter-label={chapterLabel}
        className={cn("relative", className)}
      >
        <div
          ref={wrapRef}
          className="relative"
          style={heightStyle}
        >
          <div
            ref={stageRef}
            className={cn(
              pinned
                ? "sticky top-0 h-svh overflow-hidden"
                : "relative",
              stageClassName,
            )}
          >
            {children}
          </div>
        </div>
      </section>
    </ChapterContext.Provider>
  );
}
