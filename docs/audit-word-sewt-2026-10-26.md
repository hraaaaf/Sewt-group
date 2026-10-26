# Audit des 8 pages du document Site Web SEWT — 26 octobre 2026

**Référence unique :** `Site Web SEWT.docx` transmis dans la conversation (8 pages / 16 images intégrées). **Périmètre** : `recovery/sewt-original` sur [PR #2](https://github.com/hraaaaf/Sewt-group/pull/2), HEAD vérifié `2869ffce839dcf0cf4c50e291316cda6c7e52dc5` avant l'ajout de cet audit. Comparaison du code actif, des images d'origine, et des captures Chromium 1440/768/375 en clair/sombre ([Actions #40249409462](https://github.com/hraaaaf/Sewt-group/actions/runs/40249409462), réussie). [Test clavier #40249729180](https://github.com/hraaaaf/Sewt-group/actions/runs/40249729180) réussi lors de sa 2e tentative ; la 1re tentative a rencontré un incident réseau next/font.

**Validation client** : « Je valide les afters ! » — accord sur la direction visuelle, **sans transformer les demandes encore manquantes en tâches accomplies**.

**Bilan actualisé** : 32 points documentés — **30 conformes/adaptés**, **1 activation technique restante (e-mail)**, **1 différé (villa → hôtel)**. La conformité correspond à la demande visuelle ou éditoriale et ne vaut pas validation juridique ou envoi réel d'e-mails.

| # | Page | Demande précise | Statut | Preuve / réserve |
|---:|:---:|---|---|---|
| 1 | 1 | Centrer le texte du Hero | ✅ Conforme | Hero centré en desktop/mobile dans les captures |
| 2 | 1 | Remplacer le titre par « Sun. Power. People », en blanc | ✅ Conforme | Titre du Hero en blanc ; vidéo initiale conservée |
| 3 | 1 | Photo de l’hôtel à la place de la villa | ⏸️ Reporté | Différé à la demande du propriétaire ; ne PAS toucher à la vidéo du Hero ni mélanger les fiches projets |
| 4 | 1 | Nouveau paragraphe du Hero, texte complet | ✅ Conforme | Texte vérifié dans Hero.tsx et visible |
| 5 | 1 | Deux CTA alignés et nouveaux libellés | ✅ Conforme | « Échanger sur votre projet » / « Découvrir nos solutions » |
| 6 | 1 | « Contribuer à la transition énergétique du Royaume » | ✅ Conforme (hiérarchie adaptée) | Texte conservé comme sous-titre du bloc Raison d’être, l'intitulé principal retenu étant celui de p.4 |
| 7 | 1 | Texte intégral de la raison d’être | ✅ Conforme | Deux paragraphes présents dans ImpactSection |
| 8 | 2 | Trois chiffres : +30 ans, +200, 50 MWc | ✅ Conforme | Chiffres réunis sous le paragraphe Raison d’être |
| 9 | 2 | Supprimer la page autonome des statistiques | ✅ Conforme | Ancienne StatsStrip et Manifesto non montées sur l'accueil |
| 10 | 2 | Titre « Une réponse innovante à vos besoins énergétique » | ✅ Conforme avec correction grammaticale | Titre actuel « ... besoins énergétiques » au pluriel |
| 11 | 2 | Paragraphe de présentation des 3 services | ✅ Conforme | Texte exact présent dans OffreChapter |
| 12 | 2 | Carte 01 Photovoltaïque : descriptif et sous-titre | ✅ Conforme | Libellé, descriptif et « Production électrique » vérifiés |
| 13 | 3 | Carte 02 Solaire thermique / Industriel | ✅ Conforme | Descriptif et « Eau chaude / Vapeur » vérifiés |
| 14 | 3 | Carte 03 Exploitation & maintenance | ✅ Conforme | Descriptif et « Suivi des installations » vérifiés |
| 15 | 3 | Ne pas toucher à la galerie « Des centrales qui produisent des résultats » | ✅ Conforme | Même sélection de galerie et visuels dans la vue capturée ; bandeau ajouté après la galerie |
| 16 | 3 | Supprimer le bloc CTA « Votre site mérite-t-il une centrale solaire ? » | ✅ Conforme | CtaBridge absent de la home |
| 17 | 4 | Retenir le bloc « Contribuer à la compétitivité énergétique du Maroc » | ✅ Conforme | Grand titre dans ImpactSection ; maquette visuelle de p.4 reprise |
| 18 | 4 | Réutiliser le paragraphe validé de p.1 | ✅ Conforme | Paragraphe intégré sans doublon éditorial |
| 19 | 4 | Conserver quatre boîtes et réduire leur taille | ✅ Conforme visuellement | Quatre cartes compactes à droite comme sur le modèle illustré ; le texte du Word parle de gauche |
| 20 | 4 | Conserver la timeline 1992–2023 | ✅ Conforme | Les cinq jalons sont conservés et affichés |
| 21 | 4 | Placer la timeline juste après le nouveau paragraphe de raison d’être | ✅ Conforme | Timeline immédiatement après Raison d’être ; équipe juste derrière, commit 9cb0495, captures desktop/mobile contrôlées |
| 22 | 5 | Insérer le bandeau « Références & partenaires » dans Projets réalisés | ✅ Conforme | PreuveChapter est un enfant de FlagshipSlider ; chargement des logos testé |
| 23 | 5 | Fusionner portrait du fondateur, dirigeants et équipe de terrain | ✅ Conforme | Biographie détaillée, équipes terrain, formation IIT, Energy Engineering 1992 et citation du fondateur restaurées sans séparer la composition p.6 |
| 24 | 6 | Disposition de la capture APRÈS (13) : texte gauche, terrain en haut droite, portraits dessous | ✅ Conforme | Image de chantier et 3 portraits affichés en grille desktop ; mobile adapté, approuvé visuellement |
| 25 | 6 | Supprimer section « Des équipements de qualité... » | ✅ Conforme | Bloc fournisseurs supprimé de l'accueil |
| 26 | 7 | Supprimer section « Pré-évaluez le potentiel solaire de votre site » | ✅ Conforme | RoiSimulator n'est plus rendu sur la home ; code préservé |
| 27 | 7 | Adresse : seulement Témara, Maroc | ✅ Conforme | Résidence Islah retirée de la page Contact |
| 28 | 7 | Nouveau texte « Chaque site a ses contraintes... » | ✅ Conforme | Texte intégral présent dans /contact |
| 29 | 7 | Supprimer les champs de saisie, ne garder que « Nous écrire » | ✅ Conforme côté interface | Formulaire visible retiré ; bouton mailto et coordonnées restent |
| 30 | 7 | « Nous écrire » pour envoyer un mail automatiquement | ⚠️ Préparé, activation en attente | Bouton seul sur Contact → boîte de dialogue e-mail/message → API sécurisée → Resend ou webhook ; envoi réel exige secrets privés, domaine vérifié et boîte destinataire active |
| 31 | 7 | Carte 01 « Comprendre vos usages » et texte | ✅ Conforme | Carte ajoutée sur /contact |
| 32 | 8 | Cartes 02 et 03 : « Étudier la solution », « Installer et accompagner » | ✅ Conforme | Titres/descriptions intégralement repris |

## Corrections effectuées à la demande du propriétaire (26 octobre 2026)

- [x] **P.4 — Ordre timeline** : [commit 9cb0495](https://github.com/hraaaaf/Sewt-group/commit/9cb0495afd79e34ece18e2f5b08701b458292fbf). Raison d’être → Timeline → Équipe réunie → Expertises → Projets.
- [x] **P.5 — Bio et citation fondateur** : même commit, restauration du contenu détaillé d’Ali Hajji dans la partie gauche du layout « après », sans recréer de section séparée.
- [x] **P.7 — Code d’envoi intégré** : [commit 4688c71](https://github.com/hraaaaf/Sewt-group/commit/4688c713999dac7e0d4897194e30c4a05b88f9ae) (transport serveur Resend, CSRF, rate limit, tests), [41a755a](https://github.com/hraaaaf/Sewt-group/commit/41a755ab0aee350f42594214066880f53b6fbfd1) et [72b98d4](https://github.com/hraaaaf/Sewt-group/commit/72b98d404a4c93d18f33735ae35efab2f06de322) (dialogue contact, test navigateur), [69c6510](https://github.com/hraaaaf/Sewt-group/commit/69c65104f2b8760be03098cc56fca0cfd74a417d) (test champs visibles). [CI #40252531264](https://github.com/hraaaaf/Sewt-group/actions/runs/40252531264) entièrement verte. **Pas d’envoi réel prouvé, aucune configuration fournisseur activée.**
- [ ] **P.7 — Activation et preuve de réception** : confirmer `contact@sewt-group.ma`, vérifier le domaine émetteur Resend, mettre `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_RECIPIENT_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` dans l'environnement **sans aucun secret GitHub/chat**, puis tester la réception/bounces dans un environnement autorisé. Aucune fusion/déploiement sans feu vert.
- [ ] **P.1 — Villa → hôtel** : report explicitement demandé ; ne pas toucher au film du Hero.
- [ ] **Juridique** : finaliser mentions légales et confidentialité avant publication.
- [ ] **Clôture** : approbation du propriétaire puis passage obligatoire du dépôt GitHub actuellement PUBLIC à PRIVATE après la dernière étape de la roadmap. La surveillance seule ne le fait pas.

## Contrôles

- Captures bureau, tablette et mobile comparées, après corrections [CI #40252531264](https://github.com/hraaaaf/Sewt-group/actions/runs/40252531264).
- Fournisseur d'email simulé dans les tests d’intégration uniquement ; succès API ≠ preuve de réception du message.
- PR #2 en brouillon ; `main` et Vercel non modifiés.
