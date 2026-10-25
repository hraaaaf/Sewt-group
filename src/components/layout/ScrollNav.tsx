"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface Section {
  el: HTMLElement;
  id: string;
  label: string;
  shortLabel: string;
}

function parseShortLabel(raw: string): string {
  // "02 / 05 · Offre" → "Offre"
  // "01 · Vision"     → "Vision"
  // "Simulateur ROI"  → "Simulateur"
  const afterDot = raw.split("·").pop()?.trim();
  if (afterDot) return afterDot;
  return raw.split(" ").slice(0, 2).join(" ");
}

const OFFSET_THRESHOLD = 80;

export function ScrollNav() {
  const [scrolled, setScrolled]     = useState(false);
  const [idx, setIdx]               = useState(0);
  const [sections, setSections]     = useState<Section[]>([]);
  const [hintReady, setHintReady]   = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const getAnchors = useMemo(
    () => () => Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]")),
    [],
  );

  useEffect(() => {
    const t = setTimeout(() => setHintReady(true), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const anchors = getAnchors();
    setSections(
      anchors.map((el) => ({
        el,
        id: el.dataset.chapter ?? "",
        label: el.dataset.chapterLabel ?? el.dataset.chapter ?? "",
        shortLabel: parseShortLabel(el.dataset.chapterLabel ?? el.dataset.chapter ?? ""),
      })),
    );

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      let cur = 0;
      anchors.forEach((el, i) => {
        if (el.getBoundingClientRect().top + y <= y + OFFSET_THRESHOLD) cur = i;
      });
      setIdx(cur);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [getAnchors]);

  const navigateTo = (el: HTMLElement) =>
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });

  return (
    <div className="pointer-events-none fixed bottom-10 right-5 z-50 hidden lg:flex">
      <AnimatePresence mode="wait">

        {/* ── HINT : flèche pulsante ── */}
        {!scrolled && hintReady && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent/80 [writing-mode:vertical-rl]">
              Défiler
            </span>
            <motion.button
              type="button"
              onClick={() => sections[1] && navigateTo(sections[1].el)}
              aria-label="Voir le contenu"
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border-2 border-accent bg-accent/15 text-accent cursor-pointer"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.12, backgroundColor: "rgb(var(--accent-rgb) / 0.28)" }}
            >
              <ChevronDown className="h-5 w-5" strokeWidth={2.5} aria-hidden />
            </motion.button>
          </motion.div>
        )}

        {/* ── NAV : track vertical avec sections ── */}
        {scrolled && sections.length > 0 && (
          <motion.nav
            key="nav"
            aria-label="Navigation sections"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-end"
          >
            {/* Track line */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-[4px] top-3 bottom-3 w-px bg-fg/10"
            />

            {sections.map((s, i) => {
              const isActive  = i === idx;
              const isHovered = i === hoveredIdx;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => navigateTo(s.el)}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  aria-label={`Aller à : ${s.label}`}
                  aria-current={isActive ? "location" : undefined}
                  className="pointer-events-auto group/dot flex items-center gap-2.5 py-[5px]"
                >
                  {/* Label animé */}
                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.span
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                          "font-mono text-[9px] uppercase tracking-[0.18em] select-none",
                          isActive ? "text-accent" : "text-fg-muted",
                        )}
                      >
                        {s.shortLabel}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Dot */}
                  <motion.span
                    animate={
                      isActive
                        ? {
                            width: 10, height: 10,
                            backgroundColor: "rgb(var(--accent-rgb))",
                            boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.7)",
                          }
                        : {
                            width: 6, height: 6,
                            backgroundColor: isHovered
                              ? "rgb(var(--fg-rgb) / 0.5)"
                              : "rgb(var(--fg-rgb) / 0.2)",
                            boxShadow: "none",
                          }
                    }
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="block shrink-0 rounded-full"
                    aria-hidden
                  />
                </button>
              );
            })}
          </motion.nav>
        )}

      </AnimatePresence>
    </div>
  );
}
