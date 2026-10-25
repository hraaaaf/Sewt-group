"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const links = [
  { href: "/#le-groupe",     label: "Groupe",      index: "01" },
  { href: "/#offre",         label: "Expertises",  index: "02" },
  { href: "/#flagship",      label: "Réalisations",index: "03" },
  { href: "/#impact",        label: "Impact",      index: "04" },
  { href: "/contact",       label: "Contact",     index: "05" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-bg/95 backdrop-blur-md shadow-sm"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          {/* Logo */}
          <Link href="/" aria-label="SEWT Group — accueil" className="flex items-center">
            <Image
              src="/brand/sewt-official-color.png"
              alt="SEWT Group"
              width={156}
              height={55}
              priority
              className={cn(
                "h-9 w-auto object-contain transition-all duration-500",
                scrolled ? "brightness-100 dark:brightness-0 dark:invert" : "brightness-0 invert",
              )}
            />
          </Link>

          {/* Desktop links (hidden < lg) */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "font-sans text-sm font-medium tracking-wide transition-colors duration-200",
                  scrolled
                    ? "text-fg-muted hover:text-accent"
                    : "text-white/80 hover:text-white",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle
              className={cn(
                "transition-all duration-500",
                scrolled ? "" : "[&_svg]:text-white",
              )}
            />
            <Link
              href="/contact"
              className={cn(
                "hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300",
                scrolled
                  ? "bg-accent text-white hover:bg-accent/90"
                  : "bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 border border-white/20",
              )}
            >
              Étudier mon site
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                scrolled
                  ? "border border-border text-fg hover:text-accent"
                  : "border border-white/30 text-white hover:bg-white/10",
              )}
            >
              <Menu className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer mobile / menu plein écran */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-bg"
          >
            {/* Header drawer */}
            <div className="flex h-16 items-center justify-between px-5 md:px-8">
              <Image
                src="/brand/sewt-official-color.png"
                alt="SEWT Group"
                width={156}
                height={55}
                className="h-9 w-auto object-contain dark:brightness-0 dark:invert"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg transition-colors hover:text-accent"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col justify-center px-8">
              {links.map((l, i) => (
                <motion.div key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5 border-b border-border/40 py-5 transition-colors hover:text-accent"
                  >
                    <span className="font-mono text-xs tracking-[0.2em] text-fg-subtle group-hover:text-accent">
                      {l.index}
                    </span>
                    <span className="font-display text-3xl font-bold tracking-tight text-fg group-hover:text-accent">
                      {l.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer drawer */}
            <div className="flex flex-col gap-3 px-8 pb-10">
              <ThemeToggle />
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white"
              >
                Étudier mon site →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
