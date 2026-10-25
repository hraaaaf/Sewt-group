# ROADMAP — SEWT Group Refonte Awwwards 2026/2027

Plan d'exécution exhaustif, séquentiel. Aucune étape ne démarre sans validation explicite de la précédente.

---

## Étape 1 — Initialisation & Fondations ✅
**Statut :** Livrée. Typecheck OK, page d'accueil opérationnelle, toggle thème sans flash, 0 warning console.
**Objectif :** Squelette technique production-ready.
- `npx create-next-app@latest` — Next.js 14+ (App Router, TypeScript strict, Tailwind, ESLint, `src/`, alias `@/*`).
- Install : `gsap`, `@gsap/react`, `framer-motion`, `lenis`, `next-themes`, `clsx`, `tailwind-merge`, `lucide-react`.
- Config Tailwind : design tokens (couleurs Light/Dark, typographies, spacings, easings custom).
- Config `next-themes` : `<ThemeProvider>` racine, attribute="class", defaultTheme="dark".
- Setup Lenis : provider client global avec rAF, sync GSAP ScrollTrigger.
- Fonts : `next/font/local` (Display headline + Mono accents + Sans body) — préchargement, subset latin.
- Structure `src/` conforme à `Architecture.md`.
- Reset CSS premium, `prose` désactivé, `--vh` fix mobile.
- ImagePlaceholder component générique.
- Lighthouse baseline ≥ 95 sur la page vide.
**Livrable :** Page d'accueil noire, toggle thème fonctionnel, scroll lissé, fonts chargées, 0 warning console.

---

## Étape 2 — Bibliothèque UI Premium (codée main, sans MCP) ✅
**Statut :** Livrée. Décision validée : composants codés sur-mesure plutôt que via MCP 21st.dev, pour garantir un design exclusif et un contrôle bundle total.
**Objectif :** Bibliothèque de composants UI Core re-skinnés aux tokens SEWT.
- Navbar premium (sticky scroll-aware glass + drawer mobile Framer Motion).
- Footer industriel asymétrique avec wordmark géant.
- Marquee infini CSS (keyframe `marquee-x` + masque fade + pause-on-hover).
- BentoCard avec mouse-tracking glow (CSS vars `--mx`/`--my`/`--glow-opacity`).
- GlassCard 3 intensités (soft / regular / strong).
- Slider accessible (aria-valuemin/max/now, focus-visible ring, custom track via `--progress`).
- Counter GSAP ScrollTrigger (start "top 85%", reduced-motion safe).
**Livrable :** Bibliothèque UI locale, typée, sans dépendance runtime tierce.

---

## Étape 3 — Hero Section Asymétrique & Typographie Cinétique ✅
**Statut :** Livrée. 4 fichiers `sections/Hero/` co-localisés selon `Architecture.md`. Background WebGL simulé (orbes parallaxées Framer Motion + SVG diagonals + grid noise). Ticker scroll-driven GSAP scrub. Layout asymétrique 12-col avec headline débordant 2vw et GlassCard flottante `-mt-24`.
**Objectif :** Choc visuel à l'arrivée, identité affirmée, conversion immédiate.
- Layout asymétrique (grille 12 col, headline débordant, CTA décentré).
- Typographie cinétique : split chars/words, stagger reveal GSAP, mask reveal au scroll.
- Background WebGL simulé (Framer Motion + canvas 2D fallback : gradient mesh animé réagissant au curseur et au scroll).
- Accroche B2B : valeur business immédiate (ROI, MW installés, années d'expertise).
- 2 CTA : "Simuler ma rentabilité" (anchor #roi) + "Étudier mon projet" (anchor #contact).
- Ticker scrolling : labels clients/partenaires (Lorentz, IBC Solar, MASEN, ONP).
**Livrable :** Hero pixel-perfect Light/Dark, animations 60-120fps, accessible.

---

## Étape 4 — Simulateur ROI Interactif (Nouveauté 2026) ✅
**Statut :** Livrée. `src/lib/roi.ts` (fonction pure `computeRoi` + hypothèses MA + 6 formatters). Section `RoiSimulator` co-localisée 3 fichiers selon `Architecture.md`. Animation des chiffres en `useSpring` Framer Motion (zéro re-render par frame). Mini-viz SVG inline 24×8 cellules qui se remplissent en ambre selon la surface calculée. CTA capture "Obtenir une étude d'ingénierie détaillée".
**Objectif :** Calculateur premium qui prouve la valeur en 3 secondes.
- Slider unique : facture énergétique mensuelle (1 000 — 500 000 MAD).
- Output temps réel : économie mensuelle, économie 10 ans, surface panneaux (m²), puissance crête (kWc), tonnes CO₂ évitées/an, payback (années).
- Hypothèses paramétrables (cachées dans `lib/roi.ts`) : prix kWh industriel MA, productible spécifique (kWh/kWc/an Maroc ≈ 1700), prix au Wc.
- Animations Framer Motion sur chaque chiffre (count-up smooth).
- Visualisation : barre de progression "économies cumulées", carte mini des panneaux.
- CTA capture : "Recevoir mon étude détaillée" → formulaire mini.
**Livrable :** Composant client autonome, testé sur 5 paliers, mobile-friendly.

---

## Étape 5 — Live Impact Dashboard (Nouveauté 2026) ✅
**Statut :** Livrée. `data/impact.ts` peuplé (5 métriques + 14 points 2000-2026). Section `ImpactDashboard` co-localisée 3 fichiers. ImpactCounter en deux phases (count-up GSAP ScrollTrigger puis live tick `setInterval` toutes les 15 s, tween fluide par proxy `{v}`). ImpactChart SVG inline scroll-triggered (path length + `stroke-dashoffset` scrub). Background `impact-bg` (nouveau prompt MJ) en mode `fill silent` + overlays radiaux + grid noise. Badge "Live sync" pulsing.
**Objectif :** Démontrer la dimension réelle et l'impact écologique.
- Compteurs GSAP : Mégawatts installés, Tonnes CO₂ évitées (cumulé), Litres d'eau pompés (solaire), Sites équipés, Pays couverts.
- Triggers au scroll (ScrollTrigger), counter-up avec easing.
- Données simulées premium dans `data/impact.ts` (cohérentes avec 25 ans de R&D).
- Mini-graphe SVG animé : courbe d'évolution MW installés 2000-2026.
- Mise à jour "live" simulée toutes les 30s (delta +0.001 MW) pour effet wow.
**Livrable :** Section dashboard, données typées, animations performantes.

---

## Étape 6 — Timeline Historique GSAP (Scroll-telling) ✅
**Statut :** Livrée. `data/timeline.ts` peuplé (8 jalons 1999→2026 : fondation Ali HAJJI, pompage Souss, certifications IEC/MASEN, alliances Lorentz et IBC Solar, ONP Boujdour, expansion Afrique de l'Ouest, virage IoT). 4 nouveaux prompts MJ ajoutés à `Assets.md`. Section `Timeline` 2 fichiers co-localisés. Rail vertical avec fill scaleY scroll-triggered (scrub 0.5). Nodes activables via `data-active` toggle ScrollTrigger (zéro re-render). Layout alterné gauche/droite ≥ lg, colonne unique mobile.
**Objectif :** Raconter 25 ans de R&D — M. Ali HAJJI, ONP Boujdour, Lorentz, IBC Solar.
- Timeline verticale, sticky milestones, parallax léger.
- ScrollTrigger pinning, reveal séquentiel chapitre par chapitre.
- 6-8 jalons clés (fondation, premier projet, certifications, partenariats, ONP Boujdour, exports, virage IoT 2026).
- Chaque jalon : année, titre, paragraphe, ImagePlaceholder, métrique chiffrée.
- Mode "lecture rapide" si prefers-reduced-motion.
**Livrable :** Storytelling immersif, mobile = liste verticale animée légère.

---

## Étape 7 — Services Grid (Bento) ✅
**Statut :** Livrée. `data/services.ts` peuplé (4 pôles : Photovoltaïque hero 8×2, Pompage solaire 4×1, Solaire thermique 4×1, Éclairage public band 12×1). `ServiceCategory` étendu (`thermique`, `efficacite`). 2 nouveaux prompts MJ ajoutés à `Assets.md`. Composant `ServicesBento.tsx` (Server Component) avec 3 layouts conditionnels (HeroLayout / BandLayout / CompactLayout) capitalisant sur `BentoCard` (mouse-tracking glow). Micro-interaction `ArrowUpRight` translate + accent au survol via `group-hover/bento:`. Showcase Étape 2 retiré de la homepage (collision d'id `#expertises` résolue).
**Objectif :** Présenter les 6-8 expertises en grille bento asymétrique premium.
- Bento Grid responsive (12 col desktop, 4 col tablet, 1 col mobile).
- Cartes hétérogènes : pompage solaire, centrales PV industrielles, autoconsommation, stockage, EPC clé en main, O&M, audit énergétique, monitoring IoT.
- Hover : élévation, gradient borders, micro-illustration.
- Click → page détail (V2) ou modal (V1).
**Livrable :** Section Services bento, 100% typée depuis `data/services.ts`.

---

## Étape 8 — Portfolio Immersif (Case Study Walkthrough) ✅
**Statut :** Livrée. `data/projects.ts` peuplé (5 case studies couvrant les 5 secteurs : ONP Boujdour marine, Ferme Taroudant agriculture, Usine Agadir industrie, Tour Casa Anfa tertiaire, Cité Rabat public). 2 nouveaux prompts MJ. Section `Portfolio` 2 fichiers co-localisés. Horizontal scroll desktop via `gsap.matchMedia("(min-width: 1024px)")` + pinning + scrub + `invalidateOnRefresh`. Aside latérale sticky avec filtres par secteur (chips). Card CTA de fin "Démarrer mon dossier". Mobile/tablette = stack vertical natif. reduced-motion désactive le pinning.
**Objectif :** Études de cas façon walkthrough, pas galerie.
- Données hardcodées `data/projects.ts` typées (interface compatible futur ERP).
- Layout : sticky aside (métadonnées projet) + scroll content (contexte → défi → solution → résultats chiffrés).
- 4-6 case studies premium (ONP Boujdour en flagship).
- Horizontal scroll desktop pour la galerie de projets, vertical mobile.
- Filtres : secteur (agriculture, industrie, tertiaire, public), puissance, année.
**Livrable :** Module portfolio, JSON shape figée pour injection ERP.

---

## Étape 9 — Teasing Smart Monitoring (Nouveauté 2026) ✅
**Statut :** Livrée. Section `SmartMonitoring` 2 fichiers co-localisés selon `Architecture.md`. `MonitoringMockup` : composition glassmorphism pure (topbar + sparkline 24 h + 2 KPIs + bandeau alertes + log temps réel) avec stagger reveal Framer Motion (`whileInView`, viewport once). `SmartMonitoring` : tilt 3D ±8°/±6° via `useSpring(useMotionValue)` + `useTransform` → `rotateX/rotateY`, `perspective: 1400px`, `transform-style: preserve-3d` ; chaque widget a un `translateZ` distinct (15-40 px) pour vrai parallax. Désactivé sous reduced-motion ou pointer coarse. CTA "Demander une démo logicielle" + badges Web/iOS/Android.
**Objectif :** Vendre l'application IoT SEWT, valeur récurrente.
- Mockup d'interface glassmorphism (cartes de production, graphes SVG, alertes).
- Animation d'apparition séquentielle des widgets.
- Tilt 3D léger au mouvement souris.
- Copy : "Pilotez votre centrale depuis votre poche. Production, alertes, ROI temps réel."
- CTA : "Demander une démo" + screenshot mobile + badge "iOS / Android / Web".
**Livrable :** Section teaser, ImagePlaceholders pour mockups Midjourney.

---

## Étape 10 — API Webhook ERP (Route Handler) ✅
**Statut :** Livrée. Schéma Zod `src/lib/validations/project.ts` miroir runtime de `Project` (garde-fous compile-time bidirectionnels). `POST /api/webhook/projects` avec auth Bearer (comparaison timing-safe), validation Zod (1 projet ou lot de 50), réponses 200/400/401/422/503, `revalidateTag('projects')` + `revalidatePath('/')` au succès. `GET /api/webhook/projects` health-check public. `GET /api/projects` lecture publique avec filtres `sector`/`year`/`limit`, cache `s-maxage=300 stale-while-revalidate=86400`. Documentation complète `docs/api.md` (auth + schéma + 5 codes d'erreur + curl examples + roadmap V2). Renommage `SEWT_WEBHOOK_TOKEN` → `ERP_WEBHOOK_SECRET` dans `env.ts` et `.env.example`. `.gitkeep` Étape 1 supprimés (routes maintenant en place).
**Objectif :** Préparer la connexion stock/projets futurs.
- Route Handler `src/app/api/webhook/projects/route.ts` (POST).
- Auth par header `x-sewt-token` (env var).
- Validation Zod du payload (shape identique à `data/projects.ts`).
- Réponse 200/401/422 typée.
- Endpoint GET `/api/projects` qui retourne la data (préparation à passer en revalidation ISR).
- Documentation `docs/api.md` (sample curl, schéma payload).
**Livrable :** API contractuelle, testée Postman, prête pour intégration ERP.

---

## Post-Étape 10 — Polish & Lancement
- Audit Lighthouse exhaustif (mobile + desktop).
- SEO : metadata par section, schema.org, sitemap, robots.txt.
- OpenGraph images.
- Tests E2E manuels (parcours principal).
- Déploiement Vercel + domaine.
- Handoff documentation.
