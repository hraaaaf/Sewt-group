# ARCHITECTURE — Cartographie du projet

```
sewt/
├── claude.md
├── Roadmap.md
├── Skills.md
├── Mistakes.md
├── Architecture.md
├── Assets.md
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── public/
│   ├── fonts/                       # Fonts locales (next/font/local)
│   ├── og/                          # OpenGraph images
│   └── favicons/
└── src/
    ├── app/
    │   ├── layout.tsx               # ThemeProvider + LenisProvider + Fonts + Metadata racine
    │   ├── page.tsx                 # Homepage (compose toutes les sections)
    │   ├── globals.css              # Reset + CSS Variables Light/Dark + utilities
    │   ├── not-found.tsx
    │   ├── error.tsx
    │   ├── sitemap.ts
    │   ├── robots.ts
    │   └── api/
    │       ├── webhook/
    │       │   └── projects/
    │       │       └── route.ts     # POST webhook ERP (Étape 10)
    │       └── projects/
    │           └── route.ts         # GET liste projets
    │
    ├── components/
    │   ├── providers/
    │   │   ├── ThemeProvider.tsx
    │   │   └── LenisProvider.tsx    # Sync GSAP ScrollTrigger
    │   │
    │   ├── ui/                      # Bibliothèque UI (issue MCP 21st.dev, re-skinnée)
    │   │   ├── Button.tsx
    │   │   ├── BentoCard.tsx
    │   │   ├── GlassCard.tsx
    │   │   ├── Marquee.tsx
    │   │   ├── Slider.tsx
    │   │   ├── Counter.tsx
    │   │   ├── ImagePlaceholder.tsx
    │   │   └── ThemeToggle.tsx
    │   │
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   ├── Footer.tsx
    │   │   └── Container.tsx
    │   │
    │   └── sections/
    │       ├── Hero/
    │       │   ├── Hero.tsx
    │       │   ├── KineticHeadline.tsx
    │       │   ├── HeroBackground.tsx     # WebGL simulé
    │       │   └── HeroTicker.tsx
    │       ├── RoiSimulator/
    │       │   ├── RoiSimulator.tsx
    │       │   ├── RoiSlider.tsx
    │       │   └── RoiOutput.tsx
    │       ├── ImpactDashboard/
    │       │   ├── ImpactDashboard.tsx
    │       │   ├── ImpactCounter.tsx
    │       │   └── ImpactChart.tsx
    │       ├── Timeline/
    │       │   ├── Timeline.tsx
    │       │   └── TimelineItem.tsx
    │       ├── Services/
    │       │   └── ServicesBento.tsx
    │       ├── Portfolio/
    │       │   ├── Portfolio.tsx
    │       │   └── CaseStudy.tsx
    │       └── SmartMonitoring/
    │           ├── SmartMonitoring.tsx
    │           └── MonitoringMockup.tsx
    │
    ├── lib/
    │   ├── cn.ts                    # clsx + tailwind-merge
    │   ├── roi.ts                   # Logique calculateur ROI
    │   ├── gsap.ts                  # Registration plugins, helpers
    │   └── env.ts                   # Validation env vars (zod)
    │
    ├── data/
    │   ├── services.ts              # Catalogue services typé
    │   ├── projects.ts              # Case studies (shape = ERP)
    │   ├── timeline.ts              # Jalons historiques
    │   ├── impact.ts                # Métriques dashboard
    │   └── partners.ts              # Logos & partenaires
    │
    ├── types/
    │   ├── project.ts               # Project, CaseStudy, Sector
    │   ├── service.ts
    │   ├── impact.ts
    │   └── roi.ts
    │
    ├── hooks/
    │   ├── useScrollProgress.ts
    │   ├── useReducedMotion.ts
    │   └── useMounted.ts
    │
    └── styles/
        └── fonts.ts                 # next/font/local declarations
```

## Conventions
- **Server Components par défaut.** `"use client"` uniquement si state/effects/event handlers.
- **Co-location** : un composant complexe = un dossier avec ses sous-composants.
- **Pas de barrel files** racine (`index.ts` qui ré-exporte tout) — perf bundler.
- **Types globaux** dans `src/types/`, types locaux co-localisés.
- **Données** strictement typées, importées depuis `src/data/`.
- **CSS Variables** consommées via Tailwind (`bg-surface`, `text-fg`, etc.) — jamais d'inline `style={{ color: 'var(--...)' }}` sauf cas exceptionnel.

## Futur (post-V1)
- `src/app/(marketing)/` group pour pages secondaires (À propos, Contact détaillé, Blog).
- `src/app/projects/[slug]/page.tsx` pour pages projet dédiées (ISR depuis ERP).
- `middleware.ts` pour rate-limit webhook.
