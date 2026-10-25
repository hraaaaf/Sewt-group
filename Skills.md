# SKILLS — Stack Technique Figée

Toute dérive doit être validée explicitement avant implémentation.

## Core Framework
- **Next.js 14+** (App Router, Server Components par défaut, Server Actions si besoin).
- **TypeScript** strict (`"strict": true`, `noUncheckedIndexedAccess": true`).
- **React 18+** (Suspense, useTransition, useDeferredValue où pertinent).

## Styling
- **Tailwind CSS 3.4+** — configuration custom (design tokens, plugins typography, forms).
- **CSS Variables** pour tokens dynamiques Light/Dark (centralisées dans `Assets.md` puis `globals.css`).
- **clsx + tailwind-merge** via util `cn()`.

## Animations
- **GSAP 3.12+** avec plugins : `ScrollTrigger`, `Flip`, `SplitText` (si licence — sinon split custom), `Observer`.
- **@gsap/react** (`useGSAP` hook) pour cleanup auto en App Router.
- **Framer Motion 11+** — micro-interactions, layout animations, reveal patterns.

## Scroll
- **Lenis** — smooth scroll global, sync ScrollTrigger via rAF unifié.

## Theming
- **next-themes** — toggle Light/Dark, hydration-safe, `attribute="class"`.

## UI Augmentation
- **MCP `magic` (21st.dev)** — génération initiale de composants UI Core, re-skinnés et internalisés. Pas de runtime dependency.
- **lucide-react** — icônes SVG tree-shakables.

## Utilitaires
- **zod** — validation runtime du webhook ERP et inputs.
- **date-fns** — formatage dates (Timeline, projets).

## Tooling
- **ESLint** (config Next.js + import order + tailwindcss).
- **Prettier** + `prettier-plugin-tailwindcss`.
- **TypeScript paths** : `@/*` → `src/*`.

## Stack 2026 — Trends premium ajoutés (UX Awwwards-grade)

### Native CSS Scroll & Animation
- **CSS `animation-timeline: scroll()`** — animations scroll-driven natives, 0 JS, 120fps garanti. Privilégier sur ScrollTrigger pour les reveal simples.
- **CSS `view-timeline`** + `view-transition-name` — ancrer animations à visibilité (alternative IntersectionObserver native).
- **CSS `@scope`** — encapsulation locale sans CSS-in-JS.
- **Container Queries** (`@container`) — components responsifs au parent (critique pour Bento cards).
- **CSS Subgrid** (`grid-template-rows: subgrid`) — alignements multi-cards.
- **CSS `text-wrap: balance / pretty`** — typo automatique premium.
- **CSS `:has()` selector** — état conditionnel parent réactif aux enfants.
- **CSS native popover** (`popover` attribute) — modals/tooltips natifs zéro JS.

### View Transitions API
- **`document.startViewTransition()`** — transitions cross-state morphologiques natives.
- **`view-transition-name`** sur éléments persistants entre vues (hero image → portrait page).

### Variable Fonts Kinetic
- Animation de `font-variation-settings` (`wght`, `wdth`, `slnt`) au scroll progress. Polices candidates : Inter Variable, Roboto Flex, Geist.

### Liquid Glass (Apple iOS 26)
- **backdrop-filter: blur(20px) saturate(180%)** + bordures 1px translucides + halos radiaux ambré. Différent du glassmorphism plat 2020 — plus profond, plus matériel.

### Magnetic Cursor Physics
- Détection bouton sous curseur → translation spring du contenu vers la souris. Stiffness 200, damping 25, désactivé en reduced-motion + touch.

### Scroll-driven Counters
- ProgressCounter pilotés par progress du chapitre > Counter trigger GSAP fire-once. Implémenté dans `src/components/ui/ProgressCounter.tsx`.

### Section Pre-activation Hint
- **SectionPulse** — micro-pulse ambré + label "Continuez à scroller" affiché quand section visible à 15-44% (avant trigger principal à 45%). Donne un signal "quelque chose va se passer". Implémenté `src/components/ui/SectionPulse.tsx`.

### Web Performance 2026
- **Next.js `<Image>`** AVIF + lazy hydration.
- **Speculation Rules API** prefetch routes adjacentes.
- **Partial Prerendering (PPR)** Next.js 15+ — SSG + streaming dynamic.
- **Fluid Compute** Vercel (Node.js complet, cold starts réduits).

## Interdits (sauf validation)
- Pas de styled-components / emotion.
- Pas de Redux / Zustand en V1 (state local + Context si nécessaire).
- Pas de Three.js (overkill V1 — WebGL simulé via Framer Motion + canvas léger).
- Pas de bibliothèque de composants pré-stylée (shadcn possible en source d'inspiration uniquement, copiée et adaptée).
- Pas de CMS headless.
- Pas d'i18n V1.
