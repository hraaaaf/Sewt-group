# SEWT Group — Handover canonique de reprise
**État vérifié le 26 octobre 2026 | Snapshot code : `f6a1fa607326cadfe090122af68c848911b90202` | Projet SEWT uniquement**

> **Démarrage de la prochaine conversation :** lire ce fichier et la [roadmap Notion](https://app.notion.com/p/40477c6633628117aa0ffcb1072f5b4b), puis **revérifier le HEAD réel** de la PR #2, les CI du SHA exact et la dernière Preview Vercel. Ne pas reprendre aveuglément un SHA comme s'il était toujours courant. Continuer le chantier sans redemander les décisions déjà prises.

## 1. Mission, périmètre, manière de travailler

Refonte du site vitrine **SEWT Group / Sun Energy and Water Technologies Group**, entreprise marocaine de solutions solaires et énergétiques. Objectif : site premium, rapide, lisible, fidèle au document client **`Site Web SEWT.docx` (8 pages, 16 captures avant/après)**, avec photos réelles et une vidéo de drone du chantier de l'Hôtel Riad Taroudant.

**Préférences du propriétaire** : exécution rapide, sans sur-ingénierie ; comparer chaque élément du Word, produire tests et captures BEFORE/AFTER ; distinguer le code prêt de la production livrée ; ne pas multiplier les questions dont la réponse existe déjà. Les **AFTER ont été validés par le propriétaire**. Le dernier choix l'emporte sur un ancien commentaire de roadmap.

**Verrous impératifs :** aucune fusion dans `main`, aucun déploiement Vercel **production** sans autorisation explicite. La Preview est autorisée pour QA. Dépôt GitHub **PUBLIC temporairement**, à repasser **PRIVATE impérativement lors de la clôture complète** (contrôler ensuite la visibilité ; une notification ne modifie pas le dépôt). Aucune clé API dans Git, Notion ou une réponse.

## 2. Ressources canoniques

- Repo : https://github.com/hraaaaf/Sewt-group ; branche `recovery/sewt-original`.
- PR **#2 DRAFT**, non fusionnée : https://github.com/hraaaaf/Sewt-group/pull/2 ; base `main` historiquement `52f52f01c19811bf05169bb185633ddcf61851d0`.
- La PR #4 `feat/hero-hotel-higgsfield-20261026` est **une ancienne branche de création vidéo** ; son Hero a déjà été repris sélectivement sur la branche de refonte. **Ne pas fusionner cette branche en bloc**.
- Notion maître : https://app.notion.com/p/40477c6633628117aa0ffcb1072f5b4b
- Roadmap GitHub : [ROADMAP-RECTIFICATIONS-SEWT.md](../ROADMAP-RECTIFICATIONS-SEWT.md)
- Comparatif des 32 exigences Word : [audit-word-sewt-2026-10-26.md](../audit-word-sewt-2026-10-26.md)
- Exploitation e-mail : [contact-and-security.md](../contact-and-security.md)
- Juridique / vérifications CNDP : [legal-cndp-verifications.md](../legal-cndp-verifications.md)
- **Preview consolidée non-production READY** au commit `54b04b430c6866643479d78c2456d9566ac95275` : https://sewt-group-lisg20e64-achraf-benmoussa-s-projects.vercel.app ; déploiement `dpl_G7N2joCSw7xv9GosGAXHzLhsFdTA`. **Cette Preview est antérieure au HEAD code `f6a1fa6`** et ne prouve pas le dernier changement de garde-fou e-mail ; vérifier les déploiements à la reprise. Le site peut être protégé par Vercel Authentication.
- Projet Vercel : `sewt-group`, ID `prj_pUaGTLjSNjG8Yt0bsWeHhNSABI0e`, équipe `team_NNhXPDOIfjGNBcn253btpyk0`.

## 3. Dernier état vérifié (GitHub, Vercel, Notion)

- **HEAD code avant ce handover : `f6a1fa607326cadfe090122af68c848911b90202`** (commit `fix(contact): stage email-only Resend hookup behind explicit domain-ready gate`). Toujours PR #2 DRAFT/open, `main` inchangée.
- **Historique QA :** `33107a6976bc...` a **2 runs SUCCESS** : #40303261749 et #40303254485. Sur le HEAD plus récent `f6a1fa6`, run **#40306599706 FAILURE** à l'étape Playwright ; exécution **#40306605239 était IN_PROGRESS lors du contrôle**. Ne jamais attribuer les anciens succès au HEAD `f6a1fa6`.
- **Premier échec connu** du run #40306599706 : `AssertionError: desktop accueil: cible du lien d'évitement`, attendu `#main` mais `new URL(page.url()).hash` vaut `''`, dans `scripts/verify-sewt-ui.mjs:15`. Les 15 tests API, TypeScript et build étaient verts dans ce run. **Action immédiate** : récupérer le verdict de #40306605239 ; si FAIL, examiner le comportement du lien clavier Tab/Enter sur le vrai navigateur, corriger cause réelle ou test erroné sans supprimer le contrôle d'accessibilité ; relancer CI du HEAD exact.
- Preview READY `54b04b4` servait les pages `/`, `/contact`, `/mentions-legales`, `/confidentialite` et **le MP4 interne en HTTP 200 video/mp4**, attesté dans Notion. **Production Vercel non changée** ; aucune fusion de PR.
- Notion : étapes **0 à 5 de la roadmap achevées côté UI** et **étape 6 ouverte** (QA exacte, juridique/domaine/e-mail et décision publication). Ne pas présenter « 7/7 » tant que les dernières preuves et validations manquent.

## 4. Décisions éditoriales et UI irréversibles sans nouvel ordre

- **Hero = VIDÉO de l'hôtel, pas une photo de villa.** L'utilisateur a confirmé le fonctionnement sur son propre **iPhone**. Il a expressément précisé que la demande « villa → hôtel » ne concernait **que la vidéo du Hero**, et qu'il n'existe pas une autre photo à remplacer. **Ne plus rouvrir cette fausse tâche.**
- Hero sobre avec **« Sun. Power. People. »**, texte centré en blanc, **zéro CTA ou bouton de développement** dans le Hero. Navbar épurée ; garder vrai menu desktop/mobile. `src/components/sections/Hero/Hero.tsx`.
- **MP4 réellement internalisé** dans `public/brand/hotel-riad-taroudant-hero.mp4`, **H.264, 15,38 s, 1280×720, 3 236 323 octets**, SHA-256 `720933360426330657b3b3c60e22d9592bef4f0af173acafbb4d3e209a9b4be9`, poster `public/brand/hotel-riad-taroudant-poster.webp`. Fallback photo `/projects/hotel-riad-taroudant.jpg`. Téléchargement/validation depuis CloudFront Higgsfield, intégration en commit GitHub Actions `4fd9f82b...`, run vidéo **#40302161362 SUCCESS**. Hero pointe sur les **chemins locaux**, CDN retiré de CSP ; ne pas le réintroduire sans raison.
- Ordre réel homepage : **Raison d'être / Impact → Timeline 1992–2023 → section Groupe/Fondateur/Équipe → Expertises → Projets + bandeau partenaires**. Fond des sections Expertises/Histoire maintenu en bleu marine clair/sombre.
- Impact : texte validé, 4 bénéfices, **+30 ans, +200 projets, 50 MWc pipeline** dans même section ; suppression des duplications.
- Expertises 3 cartes **Photovoltaïque ; Solaire thermique / Industriel ; Exploitation & maintenance**. Galerie « Des centrales qui produisent des résultats » préservée, références & partenaires à l'intérieur ; grands CTA inutiles supprimés.
- Équipe : **Ali Hajji** avec biographie IIT/Illinois Institute of Technology, Energy Engineering 1992, citation sur l'énergie moteur de compétitivité ; texte à gauche, chantier Ambemar au-dessus de 3 portraits **Ali Hajji, Amine Hajji, Ndiaga Mbodji** à droite ; responsive mobile. Bloc fournisseurs/équipements retiré de homepage.
- Contact : texte commençant **« Chaque site a ses contraintes... »**, affiche **« Témara, Maroc »** (pas l'ancienne rue), trois cartes Comprendre / Étudier / Installer, pas de simulateur ROI à l'accueil (code conservé). Seul bouton **« Nous écrire »** visible : fenêtre simple e-mail + message + consentement ; fallback mailto. Aucun CRM demandé.

## 5. E-mail : décision très récente et prioritaire

**Instruction explicite du propriétaire, enregistrée dans Notion le 26/10/2026 : « Les emails cree tout et attends l'embranchement ca doit attendre qu'on enregistre le site pour avoir le @ ».**

- **Faire le code et NE PAS brancher maintenant.** Attendre choix/enregistrement du **domaine**, création et confirmation de la vraie adresse e-mail professionnelle en `@domaine` ; `contact@sewt-group.ma` n'est à ce stade **qu'une destination proposée**, pas une boîte dont l'existence ou la réception sont prouvées.
- Le code est préparé dans `src/app/api/contact/route.ts`, `handler.ts`, `src/components/sections/ContactMessageDialog.tsx` ; protection CSRF, validation, honeypot, rate limit Upstash 5/IP/h, envoi texte via Resend, idempotency key. Aucun vrai courriel livré ; tests Resend simulés uniquement.
- **Verrou effectif exact** : `CONTACT_EMAIL_ENABLED === "true"`, sinon HTTP **503** sans envoi, même avec clés Resend. Valeur absente par défaut. Route déployée **Resend uniquement** ; ancien webhook de test dans handler générique non raccordé.
- Inspection Vercel **des noms seulement**, sans déchiffrer : `CONTACT_RECIPIENT_EMAIL` présent en **Preview et Production** (proposition `contact@sewt-group.ma`), `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN` présents **en Production seulement**. **Absents** : `RESEND_API_KEY`, `RESEND_FROM_EMAIL`. Ne pas générer de fausse clé ni déclarer l'envoi actif.
- **À la demande ultérieure d'activation seulement** : domaine enregistré + boîte vérifiée → DNS domaine/sous-domaine Resend (SPF/DKIM, DMARC recommandé) → clé Resend privée → variables Vercel sécurisées et rate limit pour environnement testé → vérification réelle d'envoi, réception et rebonds → activation explicite `CONTACT_EMAIL_ENABLED=true` et redéploiement approuvé. Respecter les formalités CNDP/territoire.

## 6. Juridique : fait vs restant à valider

- Pages **`/mentions-legales`** et **`/confidentialite`** rédigées et liées dans le Footer et dans le consentement Contact. Les routes sont en HTTP 200 sur la Preview ci-dessus, mais **leur présence n'est pas une certification de conformité**.
- Références publiques recoupées **à confirmer avec extrait officiel récent** : **SARL, RC Témara 139871, ICE 003317571000039, capital 100 000 MAD**. La chronologie du fondateur commence en 1992 ; l'enregistrement de cette SARL peut dater de 2023 : ne pas confondre **expérience du groupe** avec **date juridique de la société**.
- **Ouverts** : siège social/statutaire complet, représentant légal, validation RC/ICE, identité exacte de l'hébergeur contractuel, déclaration/récépissé CNDP réel, formalités éventuelles de transfert hors Maroc (Vercel/Resend/Upstash), durée de conservation appliquée et procédure d'effacement. **Ne rien inventer.** Pages légales actuelles signalent explicitement certaines réserves. Sources/suivi dans `docs/legal-cndp-verifications.md`.

## 7. Ordre d'action au redémarrage (sans réaudit inutile)

1. **Relever PR #2 HEAD exact, visibilité dépôt, dernière CI et dernière Preview** (ne pas transférer un verdict d'ancien SHA).
2. **Terminer le gate Playwright** : consulter https://github.com/hraaaaf/Sewt-group/actions/runs/40306605239 ; si fail, diagnostiquer précisément le lien `#main` Tab/Enter, corriger et refaire des captures. Ne pas contourner le test et ne pas casser le Hero.
3. **Vérifier visuellement la dernière Preview correspondant au HEAD** sur 1440/768/375, clair/sombre, et les quatre pages. La Preview historique `54b04b4` n'inclut pas la garde email `f6a1fa6`; créer une Preview actualisée **si nécessaire et autorisée**, **jamais Production sans feu vert**.
4. **Clore tous les points applicables hors domaine** : documentation juridique, vérifications légales possibles, contraste et accessibilité, suivi des preuves dans Notion. L'e-mail reste **volontairement désactivé** jusqu'à l'enregistrement du domaine et création de la boîte.
5. **Ne pas forcer 7/7** si les prérequis domaine/boîte/CNDP sont encore ouverts. Demander seulement les informations juridiques essentielles indisponibles auprès des sources.
6. **Avant publication** : autorisation explicite pour merge dans `main` et déploiement Production, QA post-déploiement ; remettre et vérifier **GitHub PRIVATE** lors de la vraie clôture. Ne jamais supposer qu'une tâche de surveillance change automatiquement la visibilité.

## 8. Formule à coller au début d'une nouvelle conversation

> « Reprends le projet SEWT en mode exécution à partir du handover `docs/handovers/2026-10-26-sewt-handover.md` et de la roadmap Notion https://app.notion.com/p/40477c6633628117aa0ffcb1072f5b4b. Vérifie HEAD réel de la PR GitHub #2, CI et Preview. Continue par le gate Playwright/skip-link puis la QA du Hero hôtel local et des pages légales. La vidéo hôtel sur iPhone est validée ; il n'y a PAS de photo villa à remplacer. L'e-mail doit rester préparé mais volontairement DÉSACTIVÉ jusqu'au domaine et à la boîte professionnelle. Aucun merge `main`, aucune Production Vercel sans autorisation. Revenir GitHub PRIVATE impérativement à la clôture. Pas de réaudit ni de questions déjà résolues. Donne Goal / Success / Proof / Next. »

---
**Règle de fraîcheur** : les commits/runs ci-dessus forment une **photographie au 26/10/2026** et non une garantie permanente. La toute première action du prochain échange est toujours une vérification des états vivants GitHub/Vercel/Notion.
