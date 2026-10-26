# SEWT API — Documentation v1.0

> Surface API minimale exposée par le site SEWT Group pour permettre à
> l'application ERP interne d'injecter dynamiquement de nouvelles réalisations
> (case studies) et de relire le catalogue publié.
>
> Version : **1.0** · Étape 10 de la Roadmap.
> Base URL : `https://sewt-group.ma` (production) · `http://localhost:3000` (dev).

---

## Sommaire

1. [Authentification](#authentification)
2. [`POST /api/webhook/projects`](#post-apiwebhookprojects) — Injection ERP
3. [`GET  /api/webhook/projects`](#get-apiwebhookprojects) — Health check
4. [`GET  /api/projects`](#get-apiprojects) — Lecture publique
5. [Schéma `Project`](#schéma-project)
6. [Codes d'erreur](#codes-derreur)
7. [Exemple curl complet](#exemple-curl-complet)

---

## Authentification

L'endpoint d'injection (`POST /api/webhook/projects`) exige un **token Bearer**
placé dans le header HTTP `Authorization` :

```http
Authorization: Bearer <ERP_WEBHOOK_SECRET>
```

Le secret est stocké côté serveur dans la variable d'environnement
`ERP_WEBHOOK_SECRET` (voir `.env.example`). Sa valeur n'est jamais exposée au
client et n'est jamais retournée par les endpoints (même en health check).

**Génération recommandée** (entropie 256 bits) :

```bash
openssl rand -hex 32
```

La comparaison du token est effectuée en **temps constant** (timing-safe) pour
empêcher l'attaque par mesure de latence.

---

## `POST /api/webhook/projects`

Injecte un projet ou un lot de projets dans le catalogue.

### Headers

| Header | Valeur | Obligatoire |
|---|---|---|
| `Authorization` | `Bearer <ERP_WEBHOOK_SECRET>` | ✓ |
| `Content-Type` | `application/json` | ✓ |

### Body — un projet seul

```json
{
  "slug": "cite-administrative-rabat",
  "title": "Cité administrative — Rabat",
  "client": "Ministère opérateur public",
  "sector": "public",
  "status": "in-progress",
  "location": "Rabat, plateau administratif",
  "coordinates": { "lat": 34.0209, "lng": -6.8417 },
  "year": 2025,
  "capacityKwc": 1420,
  "summary": "BIPV en façade ventilée et toiture. 1,42 MWc intégrés architecturalement. Première installation BIPV publique d'envergure au Maroc.",
  "hero": {
    "placeholderId": "case-study-public-rabat",
    "alt": "Façade BIPV sur bâtiment administratif de Rabat à l'aube",
    "ratio": "16:9"
  },
  "chapters": [
    {
      "kind": "context",
      "title": "Contexte",
      "body": "Programme MASEN d'exemplarité énergétique sur le bâti public administratif national."
    },
    {
      "kind": "challenge",
      "title": "Défi",
      "body": "Maintenir l'identité architecturale du bâtiment classé et intégrer 1,4 MWc en façade + toiture."
    },
    {
      "kind": "solution",
      "title": "Solution SEWT",
      "body": "Sélection modules BIPV teinte céramique mate, intégration en façade ventilée, micro-onduleurs sécurisés."
    },
    {
      "kind": "results",
      "title": "Mise en service",
      "body": "Démarrage progressif Q4 2025. Suivi temps réel sur plateforme SEWT, accès reporting carbone pour rapport public annuel."
    }
  ],
  "keyMetrics": [
    { "label": "Puissance crête", "value": "1 420", "unit": "kWc" },
    { "label": "Modules BIPV", "value": "3 240" },
    { "label": "Façade équipée", "value": "2 800", "unit": "m²" }
  ],
  "partners": ["IBC Solar", "MASEN"],
  "tags": ["BIPV", "façade", "public"]
}
```

### Body — lot de projets

Envoyer un **tableau** de projets (jusqu'à **50** par requête) :

```json
[
  { "slug": "projet-a", "...": "..." },
  { "slug": "projet-b", "...": "..." }
]
```

### Réponse 200 OK

```json
{
  "ok": true,
  "received": 1,
  "slugs": ["cite-administrative-rabat"],
  "revalidatedAt": "2026-05-16T14:21:08.412Z"
}
```

Effet de bord : `revalidateTag('projects')` + `revalidatePath('/')` sont
appelés. La homepage sera regénérée au prochain hit (ISR), sans interruption
de service.

---

## `GET /api/webhook/projects`

Health check public. Retourne la description de l'endpoint et indique si la
configuration serveur est complète. Ne renvoie **aucune donnée sensible**.

```json
{
  "endpoint": "POST /api/webhook/projects",
  "method": "POST",
  "contentType": "application/json",
  "auth": "Authorization: Bearer <ERP_WEBHOOK_SECRET>",
  "payload": "Project | Project[] (jusqu'à 50 projets par requête)",
  "docs": "/docs/api.md",
  "configured": true
}
```

---

## `GET /api/projects`

Lecture publique du catalogue de projets. Cache `s-maxage=300,
stale-while-revalidate=86400` côté CDN.

### Query params

| Param | Type | Description |
|---|---|---|
| `sector` | `agriculture` \| `industrie` \| `tertiaire` \| `public` \| `marine` | Filtre par secteur |
| `year` | entier `1990..2050` | Filtre par année |
| `limit` | entier `1..50` | Limite le nombre de projets retournés (défaut 50) |

### Exemple

```bash
curl https://sewt-group.ma/api/projects?sector=marine
```

### Réponse 200 OK

```json
{
  "ok": true,
  "count": 1,
  "total": 5,
  "projects": [
    { "slug": "onp-boujdour-hybride-pv-pompage", "...": "..." }
  ]
}
```

---

## Schéma `Project`

Source de vérité TypeScript : [`src/types/project.ts`](../src/types/project.ts).
Source de vérité runtime : [`src/lib/validations/project.ts`](../src/lib/validations/project.ts) (Zod).

| Champ | Type | Obligatoire | Contrainte |
|---|---|---|---|
| `slug` | `string` | ✓ | kebab-case ASCII, 3–80 caractères |
| `title` | `string` | ✓ | 3–160 caractères |
| `client` | `string` | ✓ | 2–160 caractères |
| `sector` | `enum` | ✓ | `agriculture` \| `industrie` \| `tertiaire` \| `public` \| `marine` |
| `status` | `enum` | ✓ | `in-progress` \| `delivered` \| `operational` \| `archived` |
| `location` | `string` | ✓ | 2–160 caractères |
| `coordinates` | `{ lat, lng }` | ✗ | `lat ∈ [-90, 90]`, `lng ∈ [-180, 180]` |
| `year` | `integer` | ✓ | 1990–2050 |
| `capacityKwc` | `number` | ✗ | ≥ 0, ≤ 1 000 000 |
| `pumpingM3PerDay` | `number` | ✗ | ≥ 0, ≤ 1 000 000 |
| `summary` | `string` | ✓ | 20–600 caractères |
| `hero` | `ProjectImage` | ✓ | voir ci-dessous |
| `chapters` | `CaseStudyChapter[]` | ✓ | 1–8 éléments |
| `keyMetrics` | `ProjectMetric[]` | ✓ | 1–8 éléments |
| `partners` | `string[]` | ✗ | ≤ 10 éléments |
| `tags` | `string[]` | ✗ | ≤ 12 éléments |

### `ProjectImage`

```ts
{
  placeholderId: string;   // kebab-case, lié à Assets.md
  alt: string;             // 3–280 caractères, obligatoire (a11y)
  ratio?: "1:1" | "4:5" | "16:9" | "21:9" | "3:4" | "9:16";
}
```

### `ProjectMetric`

```ts
{
  label: string;   // 1–80 caractères
  value: string;   // 1–40 caractères (déjà formaté)
  unit?: string;   // 0–20 caractères
}
```

### `CaseStudyChapter`

```ts
{
  kind: "context" | "challenge" | "solution" | "results";
  title: string;            // 1–120 caractères
  body: string;             // 1–1 200 caractères
  metrics?: ProjectMetric[];
  image?: ProjectImage;
}
```

---

## Codes d'erreur

| Status | Signification | Action côté ERP |
|---|---|---|
| `200` | Payload accepté, revalidation déclenchée | OK |
| `400` | JSON malformé ou query param invalide (GET) | Corriger le body |
| `401` | Header `Authorization` absent ou token incorrect | Vérifier le secret |
| `422` | Validation Zod échouée — `issues` détaillé | Corriger les champs listés |
| `503` | `ERP_WEBHOOK_SECRET` non configuré côté serveur | Contacter l'admin SEWT |

### Format des erreurs

```json
{
  "ok": false,
  "error": "Échec de validation du payload.",
  "issues": {
    "formErrors": [],
    "fieldErrors": {
      "year": ["Number must be less than or equal to 2050"],
      "sector": ["Invalid enum value..."]
    }
  }
}
```

---

## Exemple curl complet

### Injection d'un projet

```bash
curl -X POST https://sewt-group.ma/api/webhook/projects \
  -H "Authorization: Bearer $ERP_WEBHOOK_SECRET" \
  -H "Content-Type: application/json" \
  --data @- <<'JSON'
{
  "slug": "test-injection-2026",
  "title": "Projet test ERP",
  "client": "Test Industries",
  "sector": "industrie",
  "status": "in-progress",
  "location": "Casablanca, Maroc",
  "year": 2026,
  "capacityKwc": 1500,
  "summary": "Projet test pour valider l'intégration ERP entre l'outil de gestion interne et le site public SEWT.",
  "hero": {
    "placeholderId": "case-study-industrie-tanger",
    "alt": "Photo d'illustration du chantier test"
  },
  "chapters": [
    { "kind": "context", "title": "Contexte", "body": "Test d'injection ERP V1." }
  ],
  "keyMetrics": [
    { "label": "Puissance crête", "value": "1 500", "unit": "kWc" }
  ]
}
JSON
```

### Réponse attendue

```json
{
  "ok": true,
  "received": 1,
  "slugs": ["test-injection-2026"],
  "revalidatedAt": "2026-05-16T14:21:08.412Z"
}
```

### Health check (sans auth)

```bash
curl https://sewt-group.ma/api/webhook/projects
```

### Lecture publique du catalogue

```bash
curl 'https://sewt-group.ma/api/projects?sector=marine&limit=10'
```

---

## Évolutions prévues (V2)

- **Persistance** : passer de `data/projects.ts` (statique) à une base de données
  (Postgres/Supabase ou SQLite/Turso) avec migration des projets V1.
- **Idempotence** : ajouter un header `Idempotency-Key` pour rejouer les
  webhooks sans dupliquer.
- **Signature HMAC** : passer du Bearer simple à une signature HMAC-SHA256 du
  body, signée avec un secret partagé.
- **Page projet dédiée** : `/projects/[slug]` (Server Component avec ISR
  taggé `projects`).
- **Webhook DELETE** : `DELETE /api/webhook/projects/{slug}` pour retirer un
  projet du catalogue public.
- **Rate-limit** : middleware Next.js avec store Redis/KV.
