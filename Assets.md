# ASSETS — Tokens & Prompts Midjourney

Source de vérité unique pour : variables CSS Light/Dark, typographies, easings, ET prompts Midjourney v6/v7 liés aux IDs `<ImagePlaceholder id="..." />`.

---

## 1. Design Tokens — CSS Variables

### Light Mode (Écolo — vert profond, sable, ivoire)
```css
:root {
  /* Surface */
  --bg:               #F6F4EE;   /* Ivoire sable */
  --bg-elevated:      #FFFFFF;
  --surface:          #ECE8DC;   /* Sable clair */
  --surface-muted:    #E0DACA;

  /* Foreground */
  --fg:               #0E1B14;   /* Forêt nuit */
  --fg-muted:         #3A4A40;
  --fg-subtle:        #6B7A70;

  /* Brand */
  --brand:            #1F5F3A;   /* Vert profond SEWT */
  --brand-hover:      #174D2E;
  --brand-contrast:   #F6F4EE;

  /* Accent solaire */
  --accent:           #E8A636;   /* Ambre solaire */
  --accent-hover:     #D49120;

  /* Semantic */
  --success:          #1F8A4C;
  --warning:          #C97A0E;
  --danger:           #B23A2B;
  --info:             #1E5F88;

  /* Borders */
  --border:           #D6CFBC;
  --border-strong:    #A89F88;

  /* Glass */
  --glass-bg:         rgba(255,255,255,0.55);
  --glass-border:     rgba(14,27,20,0.08);
  --glass-blur:       16px;

  /* Shadow */
  --shadow-sm:        0 1px 2px rgba(14,27,20,0.06);
  --shadow-md:        0 8px 24px rgba(14,27,20,0.08);
  --shadow-lg:        0 24px 60px rgba(14,27,20,0.12);
  --shadow-glow:      0 0 40px rgba(232,166,54,0.25);
}
```

### Dark Mode (Tech-carbone — anthracite, ambre, verre)
```css
[data-theme="dark"], .dark {
  /* Surface */
  --bg:               #0A0D0C;   /* Carbone profond */
  --bg-elevated:      #111614;
  --surface:          #161C1A;
  --surface-muted:    #1E2624;

  /* Foreground */
  --fg:               #F2EFE6;
  --fg-muted:         #B8B4A6;
  --fg-subtle:        #7A786E;

  /* Brand */
  --brand:            #3CCB7A;   /* Vert phosphore */
  --brand-hover:      #5BE093;
  --brand-contrast:   #0A0D0C;

  /* Accent solaire */
  --accent:           #F2B544;   /* Ambre éclat */
  --accent-hover:     #FFCB66;

  /* Semantic */
  --success:          #4ADE80;
  --warning:          #F2B544;
  --danger:           #F87171;
  --info:             #60A5FA;

  /* Borders */
  --border:           #232B28;
  --border-strong:    #3A4540;

  /* Glass */
  --glass-bg:         rgba(22,28,26,0.55);
  --glass-border:     rgba(242,239,230,0.08);
  --glass-blur:       18px;

  /* Shadow */
  --shadow-sm:        0 1px 2px rgba(0,0,0,0.4);
  --shadow-md:        0 8px 24px rgba(0,0,0,0.5);
  --shadow-lg:        0 24px 60px rgba(0,0,0,0.6);
  --shadow-glow:      0 0 60px rgba(242,181,68,0.35);
}
```

### Typographie
```css
--font-display:  "Neue Haas Grotesk Display", "Inter Tight", sans-serif;
--font-sans:     "Inter", system-ui, sans-serif;
--font-mono:     "JetBrains Mono", "IBM Plex Mono", monospace;

--text-display:  clamp(3.5rem, 8vw, 8.5rem);   /* Hero headline */
--text-h1:       clamp(2.5rem, 5vw, 4.5rem);
--text-h2:       clamp(1.875rem, 3.2vw, 3rem);
--text-h3:       clamp(1.375rem, 2.2vw, 2rem);
--text-body:     1rem;
--text-sm:       0.875rem;

--leading-tight: 0.95;
--leading-snug:  1.15;
--leading-body:  1.55;

--tracking-tight: -0.04em;
--tracking-snug:  -0.02em;
--tracking-wide:   0.08em;
```

### Spacing & Radii
```css
--radius-sm:  8px;
--radius-md:  14px;
--radius-lg:  22px;
--radius-xl:  32px;
--radius-pill: 999px;

--section-y: clamp(5rem, 10vw, 10rem);
--gutter:    clamp(1rem, 4vw, 3rem);
--maxw:      1440px;
```

### Easings & Durations
```css
--ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out-quad: cubic-bezier(0.45, 0, 0.55, 1);
--ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1);

--dur-fast:    180ms;
--dur-base:    320ms;
--dur-slow:    640ms;
--dur-reveal:  900ms;
```

---

## 2. Prompts Midjourney — Liés aux ImagePlaceholder IDs

> Règle : un ID = un prompt unique. Ratio précisé. Style cohérent : photographie architecturale hyper-réaliste, cinematic, 8k, éclairage golden hour ou nocturne tech.

### `hero-main`
> Hyper-realistic cinematic photography, vast industrial solar power plant in Moroccan desert near Boujdour, endless rows of bifacial photovoltaic panels reflecting golden hour sky, dramatic backlight, atmospheric haze, ultra-wide aerial perspective, deep contrast, editorial composition, shot on Hasselblad H6D, anamorphic lens, color grading dark teal & amber, scale and infinity feeling, no people, no logos, 8k --ar 21:9 --style raw --v 6.1

### `hero-overlay-detail`
> Macro shot, dewdrop on polycrystalline solar cell surface, shallow depth of field, micro-reflections of sky, hyper-detailed silicon texture, scientific aesthetic, dark moody background, cinematic, 8k --ar 1:1 --style raw --v 6.1

### `timeline-1999-foundation`
> Archival editorial photography, 1999 Moroccan engineer in a modest R&D workshop, blueprints on table, early solar panel prototype, warm tungsten lighting, film grain, documentary style, muted earth tones, no faces visible, hands and tools focus, Magnum photography aesthetic --ar 4:5 --style raw --v 6.1

### `timeline-onp-boujdour`
> Aerial drone photography, massive solar pumping station in coastal Moroccan desert, ONP fishing port infrastructure in background, ocean horizon, sunset light, industrial scale, golden hour, no people, ultra-detailed, cinematic color grading --ar 16:9 --style raw --v 6.1

### `timeline-lorentz-partnership`
> Industrial product photography, German-engineered Lorentz solar pump close-up, polished stainless steel, technical labels, on workbench with schematics, dramatic side lighting, hyper-detailed, editorial, dark background --ar 4:5 --style raw --v 6.1

### `timeline-ibc-solar`
> Wide-angle photography, technicians installing IBC Solar panels on industrial rooftop in Casablanca, urban skyline backdrop, safety gear, late afternoon light, dynamic composition, no recognizable faces, documentary, premium editorial --ar 16:9 --style raw --v 6.1

### `timeline-2004-pumping-souss`
> Cinematic photography, solar-powered water pumping station in argan grove of Souss-Massa Morocco, water flowing into open-air irrigation basin, palm trees and atlas mountains in background, golden late afternoon, dust particles, hyper-realistic, no people, documentary editorial, 8k --ar 16:9 --style raw --v 6.1

### `timeline-2009-certification`
> Editorial product photography, certified solar module label macro on industrial PV panel, IEC 61215 / 61730 certification stamp visible, polished aluminum frame, technical schematics softly blurred behind, dramatic side lighting, hyper-detailed, premium industrial aesthetic --ar 16:9 --style raw --v 6.1

### `timeline-2023-africa-expansion`
> Aerial drone photography at dawn, fleet of solar-powered installations across Sahel landscape, modular containerized pumping units distributed across savannah, warm low sunlight, atmospheric haze, sense of scale and reach, hyper-realistic, no people, documentary cinematic --ar 16:9 --style raw --v 6.1

### `timeline-2026-iot-platform`
> Studio dark-mode product photography, floating glassmorphism IoT dashboard interface UI showing solar plant telemetry, energy graphs, alert badges, KPI tiles in amber and green, isometric tilt, soft reflections, premium fintech aesthetic, 8k --ar 16:9 --v 6.1

### `service-pompage-solaire`
> Cinematic photography, solar-powered water pumping installation in rural Moroccan farm, palm trees, water gushing from pipe into irrigation channel, dust particles in golden light, hyper-realistic, no people, 8k --ar 4:5 --style raw --v 6.1

### `service-centrale-pv`
> Aerial photography, massive ground-mounted PV power plant, geometric symmetry, monocrystalline panels, inverter stations, service roads, late afternoon, long shadows, scale and order, hyper-detailed --ar 16:9 --style raw --v 6.1

### `service-autoconsommation`
> Editorial industrial photography, rooftop solar installation on Moroccan industrial textile factory, technicians silhouette, integrated mounting system, blue sky, ultra-clean composition --ar 4:5 --style raw --v 6.1

### `service-stockage`
> Studio product photography, industrial lithium battery storage cabinet, brushed metal, status LEDs glowing amber, dark cinematic background, hyper-detailed, premium technology aesthetic --ar 1:1 --style raw --v 6.1

### `service-epc`
> Construction site photography, EPC solar project under installation, cranes, pallets of panels, engineers reviewing plans on tablet, dust and sun, documentary, no faces --ar 16:9 --style raw --v 6.1

### `service-om`
> Technician with infrared thermal camera inspecting solar panels, sunset, focus on thermal screen visible, hyper-realistic, editorial, no recognizable face --ar 4:5 --style raw --v 6.1

### `service-audit`
> Top-down photography, engineer's desk with energy audit reports, charts, calculator, blueprint of industrial facility, mug of coffee, warm desk lamp, premium consulting aesthetic --ar 4:5 --style raw --v 6.1

### `service-monitoring-iot`
> Studio macro photography, industrial IoT data-logger device mounted on inverter, ethernet cable, status LEDs, dark moody lighting, hyper-detailed circuit aesthetic --ar 1:1 --style raw --v 6.1

### `service-solaire-thermique`
> Editorial industrial photography, selective solar thermal collectors array mounted on Moroccan riad hotel rooftop, copper piping and insulated storage tanks visible, late afternoon warm light, atmospheric steam, hyper-realistic, no people, premium documentary aesthetic, 8k --ar 16:9 --style raw --v 6.1

### `service-eclairage-public`
> Wide-angle night photography, urban Moroccan industrial boulevard lit by autonomous solar LED street poles, integrated photovoltaic mast heads, warm amber pools of light on pavement, deep blue evening sky, atmospheric, hyper-realistic, no people, cinematic editorial --ar 21:9 --style raw --v 6.1

### `case-study-onp-boujdour-hero`
> Cinematic wide aerial, ONP solar-powered fish port pumping station Boujdour Morocco, ocean meets desert, infrastructure scale, dramatic sky, hyper-realistic, premium documentary --ar 21:9 --style raw --v 6.1

### `case-study-carriere-pv` *(V1 — projet réel : Carrière 1,1 MWc)*
> Aerial drone photography, large-scale ground-mounted photovoltaic installation adjacent to an industrial quarry extraction site in arid Moroccan landscape, geometric panel rows in foreground, quarry excavation infrastructure visible in distance, late afternoon golden light, dust haze, hyper-realistic, no people, premium documentary editorial --ar 16:9 --style raw --v 6.1

### `case-study-domaine-agricole` *(V1 — projet réel : Domaine agricole 350 kWc)*
> Wide-angle drone photography at sunset, mid-scale photovoltaic installation on Moroccan agricultural estate, rows of monocrystalline solar panels next to citrus orchards and irrigation infrastructure, palm trees in distance, warm directional light, atmospheric haze, hyper-realistic, no people, editorial documentary --ar 16:9 --style raw --v 6.1

### `case-study-ferme-taroudant`
> Drone aerial photography at golden hour, large-scale ground-mounted photovoltaic solar farm in Taroudant region of Souss-Massa Morocco, monocrystalline panels on single-axis trackers tilted toward sun, geometric symmetry extending to horizon, atlas mountains faint in distance, dust haze, hyper-realistic, no people, cinematic editorial 8k --ar 16:9 --style raw --v 6.1

### `case-study-usine-agadir`
> Wide-angle drone photography, vast industrial cannery factory rooftop in Agadir Anza port zone, fully covered with monocrystalline photovoltaic panels, port and Atlantic Ocean in background, late afternoon side light, geometric scale, no people, hyper-realistic, premium editorial documentary --ar 16:9 --style raw --v 6.1

### `case-study-agri-souss`
> Aerial photography, vast greenhouse complex in Souss Massa Morocco powered by solar PV canopy, geometric beauty, agriculture meets technology, golden light --ar 16:9 --style raw --v 6.1

### `case-study-industrie-tanger`
> Industrial rooftop solar installation on automotive supplier factory near Tanger Med port, container ships in background, late afternoon, premium editorial --ar 16:9 --style raw --v 6.1

### `case-study-tertiaire-casa`
> Modern office tower in Casablanca Anfa with rooftop solar carport, urban context, blue hour, architectural photography, hyper-realistic --ar 16:9 --style raw --v 6.1

### `case-study-public-rabat`
> Public building solar facade in Rabat, integrated PV cladding, citizens passing in foreground silhouettes, civic architecture, dawn light --ar 16:9 --style raw --v 6.1

### `smart-monitoring-mockup-desktop`
> Hyper-realistic floating glassmorphism dashboard UI, dark cinematic background, multiple translucent panels showing energy production graphs, KPIs, gauges, isometric tilt, soft amber and green glow, premium fintech aesthetic, 8k, studio product render --ar 16:9 --v 6.1

### `smart-monitoring-mockup-mobile`
> Hyper-realistic floating iPhone mockup, dark background, screen displays SEWT Smart Monitoring app — solar production live, alerts, dark UI with amber accents, soft reflection, premium product render --ar 4:5 --v 6.1

### `team-ali-hajji`
> Editorial portrait, distinguished Moroccan engineer in his 50s on industrial solar site, hard hat in hand, looking thoughtful, golden hour, shallow depth of field, premium business photography, Magnum aesthetic --ar 4:5 --style raw --v 6.1

### `partner-lorentz-logo-context`
> Brand-context photography, Lorentz solar pump label macro on stainless equipment, hyper-detailed, premium industrial product photography, dark moody --ar 1:1 --style raw --v 6.1

### `partner-ibc-context`
> IBC Solar branded panel rack close-up, factory floor, soft directional light, industrial editorial --ar 1:1 --style raw --v 6.1

### `cta-contact-bg`
> Abstract cinematic photography, dark surface with golden solar panel reflection caustics, fluid light patterns, premium luxury aesthetic, 8k --ar 21:9 --style raw --v 6.1

### `impact-bg`
> Ultra-wide aerial drone photography at twilight, vast industrial-scale photovoltaic power plant in Moroccan high plateau, geometric rows of monocrystalline panels extending to horizon, faint warm haze, deep teal-to-amber gradient sky, subtle inverter station lights glowing, atmospheric scale, hyper-realistic, cinematic color grading, motion-still, no people, no logos, 8k --ar 21:9 --style raw --v 6.1

### `og-default`
> Premium horizontal composition for OpenGraph share, dark gradient with subtle solar panel grid pattern, SEWT typography space on left, amber light beam, cinematic --ar 1.91:1 --v 6.1

---

## 3. Iconographie
- Lucide icons uniquement (Sun, Zap, Battery, Droplets, BarChart3, ShieldCheck, Cpu, LineChart, ArrowUpRight, etc.).
- Custom SVGs : courbe productible, schéma autoconsommation — créés inline en SVG, pas d'image.

## 4. Logos partenaires
- À récupérer en SVG officiels : Lorentz, IBC Solar, MASEN, ONEE, ONP, AMISOLE.
- Stockage `public/partners/*.svg`. Versions monochrome auto-tintées via `currentColor`.

---

## 5. Vidéos

> Assets vidéo générés ou tournés (Sora 2 / Veo 3 / drone réel), encodés double piste pour compatibilité maximale et poids minimal.
>
> **Cible poids** : 2,5 - 3,5 MB pour un loop 8 s en 1080p AV1, fallback H.264 ≤ 5 MB.
> **Chemins attendus** : déposer dans `public/videos/` et `public/images/` à la racine.

### `hero-loop` — vidéo de fond Hero principale

**Composant consommateur** : `src/components/sections/Hero/HeroVideoReveal.tsx`

**Fichiers attendus** :
- `public/videos/hero.av1.webm` — encodage AV1 (codec moderne, ~40 % plus léger que H.264)
- `public/videos/hero.h264.mp4` — fallback H.264 baseline profile pour Safari ≤ 17 et anciens navigateurs
- `public/images/hero-poster.webp` — poster statique affiché avant chargement vidéo (single frame ~ 80-120 kB)

**Prompt vidéo (Sora 2 / Veo 3 / Runway Gen-3)** :
> 8 second loop, slow aerial dolly over Moroccan industrial solar plant at golden hour, endless rows of bifacial photovoltaic panels reflecting amber sky, atmospheric haze, dramatic backlight, no cuts, no people, deep cinematic color grading dark teal & amber, anamorphic 2.39:1 aspect ratio adapted to 16:9, ultra-smooth camera movement, seamless loop start matches loop end, 1080p, premium documentary aesthetic, --motion subtle --loop true

**Specs encodage** :
```bash
# AV1 WebM (cible 2,8 MB)
ffmpeg -i source.mov -c:v libaom-av1 -crf 32 -b:v 0 -cpu-used 4 -row-mt 1 -an public/videos/hero.av1.webm

# H.264 fallback (cible 4,5 MB)
ffmpeg -i source.mov -c:v libx264 -profile:v high -level 4.1 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart -an public/videos/hero.h264.mp4

# Poster WebP (frame à 4 s, qualité 80)
ffmpeg -i source.mov -ss 00:00:04 -vframes 1 -c:v libwebp -quality 80 public/images/hero-poster.webp
```

**Specs cinématographie** :
- Aspect ratio source 16:9 (object-cover en CSS adapte automatiquement)
- Frame rate 24 ou 30 fps (pas 60 — alourdit inutilement)
- Bitrate target : AV1 ~ 2,5 Mb/s · H.264 ~ 4,5 Mb/s
- Loop seamless : la dernière frame doit fondu-enchaîner sur la première, ou utiliser un mouvement périodique (dolly back-forth)
- Pas de logos, pas de texte burnt-in, pas de visages — laisser la typographie cinétique SEWT être le héros

**Fallback en cas de fichiers absents** :
Le composant `HeroVideoReveal` est défensif : si aucun fichier source ne charge, le poster s'affiche ; si le poster est absent aussi, la zone reste sur le fond `bg-bg` avec le voile. Aucune erreur visible côté utilisateur. **L'arrière-plan du Hero reste cohérent (orbes + grain) même sans vidéo.**

### `hero-poster-light` *(optionnel V2)*

Pour un mode `prefers-reduced-data: reduce` ou bande passante 3G détectée, on pourra basculer sur poster seul (pas de vidéo). Variante WebP optimisée à ≤ 60 kB.

**Prompt** : même que `hero-loop` mais en still photography :
> Single frame extracted from hero-loop, premium architectural photography composition, 1920×1080, --ar 16:9 --style raw --v 6.1
