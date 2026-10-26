# PATCH 02 — Fix LeGroupe RSC + Patterns Jet Energy

> Deux livrables en un :
> 1. **Fix runtime** : l'erreur "Event handlers cannot be passed to Client Component props" sur `LeGroupe.tsx` (`<img onError>` dans un Server Component).
> 2. **5 patterns Jet Energy** transposés dans la codebase, greffés sur l'architecture Option C livrée en patch 01.

---

## 1. Fix RSC LeGroupe

### Symptôme

```
Error: Event handlers cannot be passed to Client Component props.
  <img ... onError={function onError}>
```

### Cause

`LeGroupe.tsx` est un Server Component. En RSC Next 14, **les event handlers
ne peuvent pas traverser la frontière server → client**, même sur un élément
HTML natif. Le `<img onError={...}>` lève l'erreur dès que Next sérialise les
props pour streaming.

### Correctif

Extraction de l'image fondateur dans un Client Component minimaliste, qui
encapsule la logique de fallback. `LeGroupe.tsx` reste un Server Component
propre.

| Fichier | Type | Description |
|---|---|---|
| `src/components/sections/LeGroupe/FounderPortrait.tsx` | **Nouveau** | Client Component (`"use client"`). Wrappe `<img>` + onError. Bascule sur `<ImagePlaceholder fill silent>` en cas d'échec de chargement. |
| `src/components/sections/LeGroupe/LeGroupe.tsx` | **Modifié** | Importe et utilise `FounderPortrait` à la place du `<img>` inline. |

---

## 2. Patterns Jet Energy

5 mécaniques transposées depuis l'audit `Analyse Jet Energy.html` :

| Pattern | Composant SEWT livré | Chapitre | Effort |
|---|---|---|---|
| 01 · Parallax + counter | Modif `PreuveChapter.tsx` (bg photo parallax) | 03 | 0.5j |
| 02 · Slider auto-rotate | `FlagshipSlider.tsx` (4 cas, pause au hover) | 04.5 | 1j |
| 03 · Logo wall | `TrustWall.tsx` (12 partenaires, hover couleur) | 03.5 | 0.5j |
| 04 · Stagger reveal | `StaggerReveal.tsx` (primitive UI réutilisable) | global | 0.5j |
| 05 · Sticky bridge | `BridgeChapter.tsx` (photo + phrases substituantes) | 02.5 | 0.5j |

### Détails par composant

#### `src/components/sections/Bridge/BridgeChapter.tsx`
- **Nouveau**. Utilise `<ChapterStage>` (patch 01) avec `duration=1.5`.
- Photo plein écran via `<ImagePlaceholder>` (en attendant rendus Midjourney).
- N phrases (2 à 5) qui se substituent au scroll : la phrase active fade-in,
  les phrases passées fade-out vers le haut, les futures fade-out vers le bas.
- Translation parallax douce du bg (max -60px sur la durée).
- Reduced-motion : phrase 0 seule visible.

#### `src/components/sections/TrustWall/TrustWall.tsx`
- **Nouveau**. Server Component pur, zéro JS client.
- Grille 6×2 de 12 partenaires (MASEN, OCP, IRESEN, JESA, Lorentz, IBC, Huawei,
  Jinko, ONP, UNIDO, Suntherm, KBE).
- Wordmarks textuels par défaut (à remplacer en V2 par SVG monochromes).
- Hover : couleur accent + révèle la catégorie (Client / Fournisseur /
  Institutionnel) en mono.

#### `src/components/sections/Flagship/FlagshipSlider.tsx`
- **Nouveau**. Client Component avec `AnimatePresence` Framer Motion.
- 4 cas flagship (Carrière 1.1 MWc, Domaine agricole 350 kWc, Bureaux Anfa
  200 kWc, ONP Marine 120 kWc).
- Auto-rotate 6 s déclenché par `IntersectionObserver` (s'arrête hors viewport).
- Pause au hover/focus utilisateur.
- Reduced-motion : navigation manuelle uniquement, transitions fade simple.

#### `src/components/ui/StaggerReveal.tsx`
- **Nouveau**. Primitive d'animation d'entrée en cascade.
- Wrappe N enfants, les fait apparaître avec un délai de `stagger` ms entre
  chacun (défaut 0.12 s, amplitude 24 px).
- `viewport once: true` — l'animation ne se rejoue pas au scroll arrière.
- Reduced-motion safe (rendu direct sans wrapper).
- À utiliser progressivement sur les listes/grilles existantes :
  ```tsx
  <StaggerReveal>
    {projects.map(p => <ProjectCard project={p} />)}
  </StaggerReveal>
  ```

#### `src/components/sections/Preuve/PreuveChapter.tsx`
- **Modifié**. Ajout d'un fond photo (via `<ImagePlaceholder>`) avec parallax
  doux (translation -80px sur la durée du pin).
- Overlay double pour préserver la lisibilité du compteur géant.
- Aucune autre logique métier touchée.

#### `src/app/page.tsx`
- **Modifié**. Insertion des 3 nouvelles sections aux positions intermédiaires :
  Bridge entre Offre et Preuve, TrustWall après Preuve, FlagshipSlider après
  Méthode.

---

## 3. Application du patch

```bash
# Depuis la racine du repo SEWT (avec le patch 01 déjà appliqué)
cd /chemin/vers/SEWT

# Copier le patch
cp -r ../path/to/SEWT-patch-2/src/* src/

# Vérifications
pnpm typecheck
pnpm dev
```

Aucune nouvelle dépendance npm. `framer-motion`, `lucide-react`, `gsap`,
`lenis` sont déjà installés.

---

## 4. Assets attendus (V2 — à fournir séparément)

Les `<ImagePlaceholder>` nouvellement référencés sont à remplir avec les rendus
Midjourney correspondants. Ajouter les entrées dans `Assets.md` :

| Image ID | Usage | Prompt suggéré |
|---|---|---|
| `founder-portrait` | Fallback portrait Ali HAJJI | "Industrial portrait, warm tungsten light, 50yo Moroccan thermal engineer in a clean workshop, shallow depth of field, cinematic" |
| `preuve-parallax-bg` | Bg chapitre Preuve | "Aerial drone shot of a vast Moroccan PV solar farm at golden hour, geometric panel rows, desert mountains in background, ultra-wide, Cinema 4K" |
| `bridge-centrale-aerial` | Bg chapitre Bridge 02.5 | "Wide aerial of a desert solar power plant near Ouarzazate, dusty horizon, dawn light, hyperreal photographic" |
| `flagship-carriere` | Cas 01 — Carrière | "Limestone quarry with rooftop solar canopy on industrial workshop, morning light, photo realistic" |
| `flagship-domaine` | Cas 02 — Domaine agricole | "Moroccan citrus farm orchard with solar pumping station, drip irrigation, Atlas mountains backdrop, photo journalism" |
| `flagship-anfa` | Cas 03 — Bureaux Anfa | "Modern Casablanca office tower with solar panels integrated into facade, glass and concrete, late afternoon" |
| `flagship-boujdour` | Cas 04 — Marine ONP | "Industrial harbor in Boujdour with PV ground installation supplying cold storage, fishing boats, Atlantic coast" |

---

## 5. Checklist post-patch

- [ ] `pnpm typecheck` retourne 0 erreur.
- [ ] L'erreur "Event handlers cannot be passed to Client Component props" a disparu.
- [ ] La photo bg du chapitre Preuve apparaît derrière le compteur, avec un parallax doux visible au scroll.
- [ ] Le chapitre Bridge 02.5 affiche 3 phrases qui se substituent au scroll (desktop).
- [ ] La section TrustWall montre 12 logos en grille 6×2, hover couleur fonctionne.
- [ ] Le FlagshipSlider auto-rotate toutes les 6 s, s'arrête au hover/focus.
- [ ] Mobile (<880px) : Bridge et FlagshipSlider en stack vertical, lecture fluide.
- [ ] `prefers-reduced-motion: reduce` (DevTools → Rendering) : aucune auto-rotate, aucun pinning, contenus directement visibles.
- [ ] Fil d'Ariane droite : 6 items reconnus + scroll-spy fonctionne (les sections 02.5, 03.5, 04.5 ne sont pas dans le fil d'Ariane principal mais data-chapter-label les pilote pour la pilule bottom).

---

## 6. Roadmap restante

Hors patch :

1. **`<StaggerReveal>` à propager** sur :
   - Portfolio rows (déjà `whileInView`, à uniformiser via la primitive)
   - Grilles bento (`ServicesBento`, `ImpactDashboard` quand ils reviennent en `/about`)
2. **Logos SVG monochromes** — remplacer les wordmarks TrustWall par de vrais
   logos dans `public/partners/*.svg`.
3. **API `/api/contact`** — toujours à créer (patch 01).
4. **Lighthouse audit** post-tout. Cible LCP < 1.5 s, INP < 200 ms.

— SEWT Group · Patch 02 · 18 mai 2026
