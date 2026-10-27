"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import { cn } from "@/lib/cn";

const links = [
  { href: "/#le-groupe",     label: "Groupe",      index: "01" },
  { href: "/#offre",         label: "Expertises",  index: "02" },
  { href: "/#flagship",      label: "Réalisations",index: "03" },
  { href: "/contact",       label: "Contact",     index: "04" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Transparent white navigation is reserved for the cinematic home hero.
  // Internal pages use a readable opaque header even at scroll position 0.
  const overHomeHero = pathname === "/" && !scrolled;
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
          overHomeHero
            ? "bg-transparent"
            : "bg-bg/95 backdrop-blur-md shadow-sm",
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
                overHomeHero ? "brightness-0 invert" : "brightness-100 dark:brightness-0 dark:invert",
              )}
            />
          </Link>

          {/* Desktop links (hidden < lg) */}
          <nav className="ml-auto mr-5 hidden items-center gap-8 lg:flex xl:mr-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "font-sans text-sm font-medium tracking-wide transition-colors duration-200",
                  overHomeHero
                    ? "text-white/80 hover:text-white"
                    : "text-fg-muted hover:text-accent",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Navigation remains available without promotional CTA or dev-like switches. */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
              overHomeHero
                ? "border border-white/30 text-white hover:bg-white/10"
                : "border border-border text-fg hover:text-accent",
            )}
          >
            <Menu className="h-4 w-4" aria-hidden />
          </button>
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

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
