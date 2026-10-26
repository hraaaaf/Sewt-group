# Audit des 8 pages du document Site Web SEWT — 26 octobre 2026

**Référence unique :** `Site Web SEWT.docx` transmis dans la conversation (8 pages / 16 images intégrées). **Périmètre** : `recovery/sewt-original` sur [PR #2](https://github.com/hraaaaf/Sewt-group/pull/2), HEAD vérifié `2869ffce839dcf0cf4c50e291316cda6c7e52dc5` avant l'ajout de cet audit. Comparaison du code actif, des images d'origine, et des captures Chromium 1440/768/375 en clair/sombre ([Actions #40249409462](https://github.com/hraaaaf/Sewt-group/actions/runs/40249409462), réussie). [Test clavier #40249729180](https://github.com/hraaaaf/Sewt-group/actions/runs/40249729180) réussi lors de sa 2e tentative ; la 1re tentative a rencontré un incident réseau next/font.

**Validation client** : « Je valide les afters ! » — accord sur la direction visuelle, **sans transformer les demandes encore manquantes en tâches accomplies**.

**Bilan** : 32 points documentés — **28 conformes/adaptés**, **3 écarts/partiels**, **1 différé**. La conformité correspond à la demande visuelle ou éditoriale et ne vaut pas validation juridique ou envoi réel d'e-mails.

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
| 21 | 4 | Placer la timeline juste après le nouveau paragraphe de raison d’être | ⚠️ Écart d’ordre | Accueil actuel : Raison d’être → Expertises → Projets + partenaires → Timeline → Équipe, donc pas immédiatement après la raison d’être |
| 22 | 5 | Insérer le bandeau « Références & partenaires » dans Projets réalisés | ✅ Conforme | PreuveChapter est un enfant de FlagshipSlider ; chargement des logos testé |
| 23 | 5 | Fusionner portrait du fondateur, dirigeants et équipe de terrain | ⚠️ Partiel éditorial | Présentation + 3 portraits réunis ; le long texte/citation du fondateur figurant dans la capture 10 a été condensé plutôt que repris intégralement |
| 24 | 6 | Disposition de la capture APRÈS (13) : texte gauche, terrain en haut droite, portraits dessous | ✅ Conforme | Image de chantier et 3 portraits affichés en grille desktop ; mobile adapté, approuvé visuellement |
| 25 | 6 | Supprimer section « Des équipements de qualité... » | ✅ Conforme | Bloc fournisseurs supprimé de l'accueil |
| 26 | 7 | Supprimer section « Pré-évaluez le potentiel solaire de votre site » | ✅ Conforme | RoiSimulator n'est plus rendu sur la home ; code préservé |
| 27 | 7 | Adresse : seulement Témara, Maroc | ✅ Conforme | Résidence Islah retirée de la page Contact |
| 28 | 7 | Nouveau texte « Chaque site a ses contraintes... » | ✅ Conforme | Texte intégral présent dans /contact |
| 29 | 7 | Supprimer les champs de saisie, ne garder que « Nous écrire » | ✅ Conforme côté interface | Formulaire visible retiré ; bouton mailto et coordonnées restent |
| 30 | 7 | « Nous écrire » pour envoyer un mail automatiquement | ⚠️ Non réalisé techniquement | mailto ouvre une application mail ; aucun envoi serveur/réception confirmée. L'intégration Resend a été explicitement différée |
| 31 | 7 | Carte 01 « Comprendre vos usages » et texte | ✅ Conforme | Carte ajoutée sur /contact |
| 32 | 8 | Cartes 02 et 03 : « Étudier la solution », « Installer et accompagner » | ✅ Conforme | Titres/descriptions intégralement repris |

## Actions non closes

- [ ] **P.1 — Villa → hôtel** : action volontairement **reportée**, à réaliser dans le bloc correctement identifié, **sans remplacer la vidéo du Hero** ni faire passer un projet résidentiel pour l'hôtel.
- [ ] **P.4 — Emplacement timeline** : le document dit « juste après » le paragraphe de raison d'être, alors que le site intercale les expertises et projets. **À arbitrer avant réordonnancement**, car le propriétaire vient de valider les « afters ».
- [ ] **P.5 — Contenu d'Ali Hajji** : confirmer si l'ancien long texte/citation de fondateur doit réellement être préservé, ou si le résumé actuel dans la composition p.6 « après » suffit. Son aspect visuel est approuvé.
- [ ] **P.7 — Envoi automatique** : le bouton `mailto:` ne déclenche pas une livraison automatique. Aucun service destinataire/boutique d'email n'est prouvé ; Resend et secrets restent **différés** sur demande du propriétaire.
- [ ] **Avant publication du site** : confirmer les coordonnées de réception, traiter les textes complets « Mentions légales » et « Confidentialité » (le footer actuel propose des liens mailto, pas des documents de conformité), puis validation finale.
- [ ] **Clôture** : demander une autorisation explicite avant merge `main` et déploiement Vercel, non autorisés pour le moment.
- [ ] **SÉCURITÉ OBLIGATOIRE** : une fois la roadmap réellement achevée, remettre le dépôt GitHub actuellement PUBLIC en **PRIVATE** et vérifier la visibilité via GitHub. Ne pas supposer qu'une alerte seule le fait.

## Observations annexes, hors document client

- Les métadonnées structurées du site évoquent parfois la date de fondation 2010, alors que la timeline du groupe démarre en 1992. Faire valider la distinction société vs expérience du groupe avant modification.
- La CI exécute pnpm/typecheck/tests contact/build/Playwright sur la branche, **pas une preuve de livraison d'e-mails ou d'approbation réglementaire**.
