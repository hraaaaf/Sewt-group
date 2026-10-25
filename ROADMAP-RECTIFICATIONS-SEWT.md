# SEWT Group — Roadmap des rectifications du site (25 octobre 2026)

**Source de vérité :** document de retours client `Site Web SEWT.docx` (8 pages, 16 captures d'écran) + clarifications du propriétaire du 25/10/2026.  
**Portée :** refonte éditoriale, branding, ordre des sections et mise en page. **La roadmap historique `Roadmap.md` reste archivée, sans écrasement.**  
**Branche de travail :** `recovery/sewt-original` — PR #2 encore en brouillon. Aucune fusion dans `main`, aucun déploiement Vercel sans autorisation explicite.  
**État initial :** planning à mettre en œuvre ; les cases « à faire » ne doivent pas être annoncées comme livrées.

## Décisions actées

- **Logo : version couleur** `This_Appeal-CL-1-Sans_logo-Fond_transparent.png` (orange + bleu marine, transparence) ; utiliser un recadrage aux pixels utiles pour éviter les immenses marges transparentes. Variante monochrome blanche pour fond sombre si nécessaire. Original fourni dans le ZIP client `This_Appeal-NB-1-Sans_logo-Fond_transparent.zip`. Vérifier netteté, proportion, alt, menu mobile et contraste sur fond clair/foncé.
- **Photo de l'hôtel : déjà présente dans le dépôt** sous `public/projects/hotel-riad-taroudant.jpg`, référencée par `src/data/projects.ts` (autre photo existante `public/projects/hotel-90-kwc.jpg`). **Ne pas chercher un nouvel asset** : utiliser la photo déjà associée à la réalisation hôtelière, et l'insérer à la place de la villa dans la vue concernée.
- **« Ressembler à ça » signifie reprendre la disposition de l'exemple « après » de la page 6 (image n°13)** : bloc de présentation à gauche, visuel horizontal de l'équipe Ambemar en haut à droite, trois portraits alignés en dessous. Les visuels « avant » des pages 5–6 sont les images 10, 11 et 12. Objectif : une section unique après la timeline, **pas** trois pages séparées.
- **Les demandes commerciales / Resend sont secondaires.** La page de contact souhaitée dans le retour client comporte uniquement un bouton `Nous écrire` lançant le logiciel de messagerie via `mailto:` ; préserver le code sécurisé de réception existant mais ne pas activer de webhook ni de service de mail tant que non décidé. Conserver la possibilité d'un formulaire en évolution ultérieure, sans l'imposer dans l'interface.

## Ordre d'exécution — lots vérifiables

### Lot 0 — Sauvegarde et repérage [À faire]
- [ ] Conserver le snapshot restauré du déploiement du 16/06/2026 et les commits de récupération ; éviter de rebâtir le site de zéro.
- [ ] Cartographier les 16 captures dans les composants réels de la home et identifier où figure la villa à remplacer. Vérifier les vues bureau/mobile et modes clair/sombre.
- [ ] S'assurer que toute modification passe par la branche de travail et une PR. `main` et la production restent intouchées.

### Lot 1 — Logo, navigation et hero [À faire]
**Référence : page 1, capture 1 ; logo PNG client.**
- [ ] Installer le logo couleur recadré et optimisé (fond réellement transparent) dans `public/brand/`, sans étirement ; remplacer les références de la navbar (y compris mobile) et autres utilisations du logo. Fond sombre : variante blanche ou traitement de contraste contrôlé.
- [ ] Centrer le texte du hero ; remplacer « Soleil Eau Ingénierie » par **« Sun. Power. People »** en blanc.
- [ ] Remplacer le paragraphe du hero exactement par : « Des solutions solaires conçues pour répondre à vos besoins. Sun Energy accompagne particuliers, agriculteurs et professionnels de l’étude de faisabilité à la mise en service de leurs solutions énergétiques. »
- [ ] Aligner les CTA et utiliser les libellés **« Échanger sur votre projet »** et **« Découvrir nos solutions »**.
- [ ] Remplacer la photo de villa par le visuel hôtellerie déjà présent dans `public/projects/` au bon endroit ; conserver les autres photos utiles.
**Acceptation :** logo lisible sur desktop et mobile, pas de déformation, hero centré, deux CTA alignés, photo hôtel visible, animations accessibles.

### Lot 2 — Notre raison d'être et chiffres [À faire]
**Références : pages 1–2, captures 2–3, et page 4, capture 7.**
- [ ] Titre / positionnement : **« Contribuer à la transition énergétique du Royaume »** ; envisager le cadrage de la capture 7 sous le titre **« Contribuer à la compétitivité énergétique du Maroc. »**. La décision de composition est de privilégier cette **mise en page de la capture 7**, pas de multiplier les sections redondantes.
- [ ] Texte validé : « Sun Energy and Water Technologies Group a été créée avec la conviction de faire de l’énergie solaire un pilier majeur de la transition énergétique voulue pour le Royaume. En tant que professionnels des énergies renouvelables, nous détenons les qualifications nécessaires pour garantir à nos partenaires des installations de qualité et conformes aux normes et réglementations en vigueur. »
- [ ] Garder les quatre petites cartes de bénéfices de la capture 7 en les réduisant légèrement.
- [ ] Intégrer, dans la même section, les **trois chiffres validés** : **+30 ans d’expérience professionnelle**, **+200 projets livrés**, **50 MWc en pipeline de développement**. Ne pas reprendre les anciens compteurs contradictoires visibles sur la capture 3.
- [ ] Retirer la page autonome de statistiques ; pas de section doublon.
**Acceptation :** un seul bloc éditorial cohérent, les bons chiffres sans données anciennes contradictoires.

### Lot 3 — Expertise et réalisations [À faire]
**Références : pages 2–3, captures 4–6 ; page 5, capture 9.**
- [ ] Titre : **« Une réponse innovante à vos besoins énergétiques »**.
- [ ] Introduction : « Pour produire de l’électricité, de l’eau chaude ou pour superviser vos équipements : nos services complémentaires pour les besoins de votre site. »
- [ ] Conserver exactement trois cartes :
  - **01 Photovoltaïque** — « Étude et installation de systèmes solaires pour produire de l’électricité au plus près des besoins de votre activité. » — *Production électrique*.
  - **02 Solaire thermique / Industriel** — « Des solutions solaires ou non dédiées à la production d’eau chaude pour les usages de votre activité. » — *Eau chaude / Vapeur*.
  - **03 Exploitation & maintenance** — « Un accompagnement dans la durée pour l’exploitation et la maintenance de vos équipements énergétiques. » — *Suivi des installations*.
- [ ] Conserver **sans changement** la galerie « Des centrales qui produisent des résultats » (capture 5).
- [ ] Supprimer entièrement le grand bloc CTA « Votre site mérite-t-il une centrale solaire ? » avec visuel Ambemar (capture 6) ; **préserver** la photo Ambemar pour la future section équipe.
- [ ] Insérer le bandeau défilant « Références & partenaires » (capture 9) **dans** la section « Projets réalisés », sans recréer une page isolée.
**Acceptation :** trois expertises conformes aux textes, galerie inchangée, bandeau intégré et CTA superflu absent.

### Lot 4 — Histoire et équipe : appliquer exactement le modèle « après » [À faire]
**Références : page 4, capture 8 ; pages 5–6, captures 10–13.**
- [ ] Garder telle quelle la timeline « Depuis 1992, une expertise énergétique construite au Maroc » (capture 8).
- [ ] **Immédiatement après la timeline**, fusionner la présentation de M. Ali Hajji, de la direction/équipe et la photo terrain en **une section**, avec la structure de la **capture 13 (APRÈS)**.
- [ ] Grille desktop : colonne gauche avec **« 19 collaborateurs. Une direction d’excellence. »** et son texte ; colonne droite en **deux rangées** : panorama équipe chantier Ambemar en haut, portraits individuels de trois dirigeants en bas.
- [ ] Réutiliser le panorama `public/team/team-terrain.jpg` et les portraits dans `public/team/` ; conserver les noms exacts des personnes ; placer les portraits selon la capture 13. Éviter les portraits disproportionnés, les découpes de visage et les doublons de sections.
- [ ] Version mobile : même hiérarchie, empilement accessible, portraits adaptatifs.
- [ ] Supprimer le bloc séparé « Des équipements de qualité pour une performance optimale » (page 6, capture 14), comme demandé.
**Acceptation :** rendu fidèle à la capture 13 (texte à gauche, photo horizontale au-dessus des 3 portraits), en un seul bloc après timeline.

### Lot 5 — Simplification contact, méthode et suppressions [À faire]
**Références : page 7, captures 15–16 ; page 8.**
- [ ] Supprimer la section « Pré-évaluez le potentiel solaire de votre site » / simulateur ROI de la home (capture 15), **sans supprimer la logique métier du dépôt à ce stade**.
- [ ] Dans les coordonnées, afficher **« Témara, Maroc »** uniquement (retirer « Résidence Islah »).
- [ ] Remplacer le texte par : « Chaque site a ses contraintes et ses habitudes. Nous abordons le projet à partir de vos besoins énergétiques, puis vous accompagnons de l’étude au suivi des équipements. »
- [ ] Remplacer les champs visibles du formulaire par **un seul CTA « Nous écrire »**, avec `mailto:contact@sewt-group.ma` : ouverture d'un client mail, **pas un envoi automatique silencieux**. Prévoir solution de repli si aucun client mail configuré. L'adresse doit être confirmée avant lancement public.
- [ ] Ajouter les trois cartes du process, dans le style de « Notre Expertise » :
  1. **Comprendre vos usages** — « Nous partons des besoins énergétiques de votre entreprise, de votre exploitation ou de votre site industriel. »
  2. **Étudier la solution** — « L’étude permet de définir un système solaire adapté à vos usages et aux caractéristiques de votre site. »
  3. **Installer et accompagner** — « Après l’installation, l’exploitation et la maintenance contribuent au suivi de vos équipements. »
- [ ] Vérifier que tous les CTA nav / footer pointant vers `#roi` et les anciens formulaires renvoient maintenant à des sections existantes.
**Acceptation :** page contact épurée, bouton mail fonctionnel, pas de formulaire exposé par inadvertance, aucune ancre cassée.

### Lot 6 — Contrôle final et validation utilisateur [À faire]
- [ ] Comparaison **avant/après** capture par capture : page 1 hero, page 2 expertises, page 3 projets, page 4 positionnement/timeline, page 6 équipe fusionnée, page 7 contact.
- [ ] Responsive 375 / 768 / 1440 px, mode clair/sombre, focus clavier, contrastes, animations réduites, formats et poids des images.
- [ ] `pnpm@9.12.3 install --frozen-lockfile`, `pnpm typecheck`, `pnpm build`, tests existants `pnpm test:contact` ; conserver en note l'avertissement Edge Runtime préexistant.
- [ ] Faire relire les textes, chiffres, profils et visuels par le propriétaire. Ne pas lancer de déploiement, ni fusionner la PR #2 ou modifier le projet Vercel sans son accord explicite.

## Traçabilité
- Document de référence : `Site Web SEWT.docx`, fourni dans la conversation du 25/10/2026 (8 pages, 16 images).
- Fichiers source logo : `This_Appeal-CL-1-Sans_logo-Fond_transparent.png` et `This_Appeal-NB-1-Sans_logo-Fond_transparent.png`.
- État production Vercel inchangé ; branche `recovery/sewt-original` utilisée pour le développement.
- Chaque lot doit produire : fichiers touchés, diff, captures, résultats de tests et mise à jour Notion.

## Protocole obligatoire de visibilité GitHub (décision du 25/10/2026)
- **Intention du propriétaire :** dépôt PUBLIC pendant la refonte, puis **retour OBLIGATOIRE en PRIVATE dès la clôture de tous les lots de la roadmap**.
- **État GitHub vérifié lors de la demande : `private`.** Aucune bascule vers public n'a encore été réalisée par la conversation (le connecteur GitHub ne permet pas la modification de visibilité).
- **Avant publicité :** contrôler toutes les branches, l'historique des commits, les assets, les documents internes et les secrets ; le fait de remettre un dépôt en privé plus tard **n'efface pas les éventuelles copies, forks et caches** créés lorsqu'il était public.
- **Gate de clôture irrévocable** : un lot achevé ne suffit pas ; au moment où la dernière tâche est validée, remettre le dépôt en PRIVATE via GitHub Settings → General → Danger Zone → Change repository visibility, **puis vérifier depuis GitHub que `visibility: private`**. Ne jamais cocher la clôture administrative avant cette preuve.
- **Surveillance conditionnelle** : automatisation horaire « SEWT retour en privé » configurée le 25/10/2026 pour alerter à la fin si le dépôt reste public ; celle-ci n'est **pas une garantie de modification automatique**. La vérification manuelle finale est requise.
- Cette politique n'autorise aucun déploiement Vercel, promotion, ni fusion vers `main`.
