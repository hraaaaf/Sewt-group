# SEWT Group — Site web

Projet Next.js (App Router, TypeScript), restauré à partir du dernier déploiement connu de SEWT Group sur Vercel (16 juin 2026).

## État de récupération

- Source restaurée via l'API Vercel REST le 25 octobre 2026 : **310/310 fichiers vérifiés par SHA-1**, soit 45 107 341 octets ; import applicatif GitHub après exclusion de fichiers locaux/build et contrôle de secrets.
- Branche de travail : `recovery/sewt-original` et [PR #2 (brouillon)](https://github.com/hraaaaf/Sewt-group/pull/2).
- `main` reste la branche de référence initiale ; **pas de fusion automatique**.
- Dernier déploiement Vercel observé : `dpl_62ZvGusNAYWeJQbDciV4StcfJQ3X`. **Aucun nouveau déploiement autorisé**.

## Roadmap et suivi

- [Roadmap des rectifications](ROADMAP-RECTIFICATIONS-SEWT.md)
- [Suivi de progression dans Notion](https://app.notion.com/p/40477c6633628117aa0ffcb1072f5b4b)
- [Mission de QA / contrôle des visuels](https://github.com/hraaaaf/Sewt-group/issues/3)

Les modifications visuelles sont soumises à revue sur ordinateur et mobile avant que chaque lot soit coché comme terminé. Ne pas confondre code compilé, capture automatisée et validation humaine du design.

## Lancer les contrôles

Utiliser Node.js 24 et pnpm 9.12.3 (voir `packageManager`).

```bash
corepack enable
corepack prepare pnpm@9.12.3 --activate
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test:contact
pnpm build
```

Une [GitHub Action](.github/workflows/sewt-validate.yml) exécute ces vérifications et prend des captures locales desktop/mobile avec Playwright lorsque le workflow est disponible. Elle **ne déploie pas** sur Vercel.

## Parcours contact

La version publique du site en cours de refonte propose actuellement un bouton `mailto:contact@sewt-group.ma` sur `/contact`. Il **ouvre une application de messagerie** ; ce n'est pas un envoi automatique ni une preuve de réception. La boîte n'a pas encore été confirmée. L'API sécurisée `/api/contact` demeure dans le code mais aucun webhook réel ni secret Upstash/Resend n'est configuré ici.

Ne jamais committer de fichier `.env`, de clé API ou de données de prospects.

## Visibilité GitHub — obligation de fermeture

**Statut temporaire décidé le 25 octobre 2026 : dépôt PUBLIC pendant les rectifications.**

**Action obligatoire à la clôture de la roadmap : repasser immédiatement ce dépôt en PRIVATE**, puis vérifier le résultat via GitHub. Le suivi Notion comporte la case finale correspondante et une surveillance conditionnelle ; cela ne garantit pas que GitHub sera rendu privé automatiquement. Les clones et forks réalisés pendant la période publique pourraient subsister.

Aucune fusion de `main`, aucune connexion automatique Git-Vercel, aucun déploiement en production sans autorisation explicite du propriétaire.
