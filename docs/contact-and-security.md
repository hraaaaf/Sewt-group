# Contact delivery and production configuration

The contact endpoint returns `ok: true` only after the configured transport
accepts the submission. When configured for the webhook transport, it sends a
JSON `POST` to `CONTACT_WEBHOOK_URL` with an
`Authorization: Bearer <CONTACT_WEBHOOK_SECRET>` header. The body contains the
`contact.submission` event name, an ISO timestamp, and the validated form data.
Alternatively, server-only Resend configuration sends the message directly
through `POST https://api.resend.com/emails` (see below).
The destination must respond with a successful HTTP status; redirects are
rejected. Requests time out after five seconds. Personal data is not written to
application logs.

Each submission includes a UUID `submissionId` in the JSON body and as the
`Idempotency-Key` request header. The receiver must durably store a submission
and deduplicate retries by this identifier before returning 2xx. The API cannot
verify the receiver's storage behavior; a successful response only confirms
that the webhook accepted the request. The repository does not configure a
mail provider or shared inbox delivery yet.

For the webhook transport, configure both `CONTACT_WEBHOOK_URL` and
`CONTACT_WEBHOOK_SECRET` in the production environment (HTTPS and a random
secret of at least 32 characters). For Resend, configure the three server-only
variables described below. Until one transport is fully configured, submissions
return HTTP 503. Neither transport has live credentials in the repository.

The `/contact` route displays a single “Nous écrire” button. Clicking it opens
an accessible dialog containing email, optional name, message and consent. The
original ROI form remains in source for future use but is not mounted on the
homepage. Run `pnpm test:contact` for mock provider tests; these do not prove
live inbox delivery or durable storage.

Production contact rate limiting uses Upstash Redis REST through
`@upstash/ratelimit`. Configure both `UPSTASH_REDIS_REST_URL` and
`UPSTASH_REDIS_REST_TOKEN`; requests are limited to five per IP per hour. The IP
is HMAC-SHA-256 hashed with the configured server-side delivery secret before it
becomes a Redis identifier. Missing credentials,
Redis errors, timeouts, or a missing production client IP fail closed with HTTP
503. Local development may use the in-memory limiter.

The CSP allows `'unsafe-eval'` only in development for React diagnostics. The
production policy omits it. Inline scripts and styles remain allowed because
this app currently uses static headers and App Router hydration/inline styles;
moving to a nonce-based policy requires a separate rendering and caching review.


## Direct transactional email using Resend (optional, not yet live)

The simplified /contact page uses a minimal modal (email, message and consent)
behind the single visible “Nous écrire” button. Its messages are submitted to
the existing `POST /api/contact` route, protected by CSRF, schema validation,
a 32 KiB maximum payload, a hidden bot field and fail-closed production rate
limiting (five attempts/IP/hour). The /contact modal does not make up
a monthly electricity bill.

The API can use either the existing authenticated webhook OR the Resend API.
To select Resend, configure all three server-only variables:
`RESEND_API_KEY`, `RESEND_FROM_EMAIL` (verified sender domain), and
`CONTACT_RECIPIENT_EMAIL`. Also configure
`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Partial Resend
configuration returns 503, never claiming delivery.

Resend receives a plain-text message using its real `POST /emails` payload
(`from`, `to`, `reply_to`, `subject`, `text`); a UUID-derived
`Idempotency-Key` limits accidental retries (Resend stores keys for 24 hours).
Successful responses mean **accepted for delivery only**, NOT that the target
mailbox exists or received the email. Before going live, verify the DNS sender,
the actual shared recipient mailbox and bounces/delivery events with a live test.
Do not place API keys in code, chat, Git or public client configuration.

If provider configuration is missing or delivery fails, the client must
show a failure state and offer an explicit `mailto:` fallback. A generic
server-to-Resend test is mocked and cannot prove real delivery.

**Do not activate this integration merely by merging**: before an authorized
Preview or production release, verify the Resend sender domain (SPF/DKIM),
confirm the team actually receives mail at the chosen recipient address,
set the credentials only in a private server environment, and test a real
submission end to end. GitHub repository visibility is temporarily PUBLIC;
never commit secrets. Vercel production and `main` remain frozen until explicitly
authorized.

## Octobre 2026 — instructions explicites : PRÉPARER, NE PAS BRANCHER

Le propriétaire a demandé de **préparer tout le code e-mail, puis d'attendre**
l'enregistrement du domaine du site et la création de l'adresse professionnelle
en `@domaine` avant toute connexion. Le nom `contact@sewt-group.ma` n'est
qu'une destination **proposée** dans la configuration; ne pas le décrire comme
une boîte existante ou vérifiée.

La route déployée impose `CONTACT_EMAIL_ENABLED=true` (absent par défaut).
Même avec une clé API Resend présente, l'absence de ce drapeau empêche tout
envoi et renvoie 503. Le **webhook commercial n'est pas raccordé à la route** :
seul Resend pourra assurer le transport final, comme demandé. Les tests de
l'ancien handler générique peuvent toujours simuler un webhook sans l'activer.

Séquence de branchement ultérieure :
1. Acheter/enregistrer et vérifier la propriété du domaine exact choisi.
2. Créer et confirmer la boîte de réception professionnelle `@domaine`.
3. Vérifier un sous-domaine d'envoi sur Resend (DNS DKIM/SPF, DMARC
   recommandé) et créer une clé API restreinte, sans l'écrire dans Git.
4. Configurer en privé sur Vercel `CONTACT_RECIPIENT_EMAIL`,
   `RESEND_FROM_EMAIL`, `RESEND_API_KEY`, Upstash pour les environnements
   utilisés, puis contrôler un vrai envoi, sa réception et les rebonds.
5. **Ensuite seulement** passer `CONTACT_EMAIL_ENABLED=true`, effectuer
   un redéploiement autorisé et revérifier la réception. Prévenir le responsable
   si les vérifications juridiques CNDP applicables restent incomplètes.

Pour l'instant : `CONTACT_EMAIL_ENABLED` absent, aucun envoi réel, aucun
nouveau domaine ni aucune boîte créés. Les pages juridiques et les tests du
site peuvent progresser indépendamment.
