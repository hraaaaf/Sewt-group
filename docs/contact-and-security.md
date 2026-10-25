# Contact delivery and production configuration

The contact endpoint returns `ok: true` only after the configured destination
accepts the submission. It sends a JSON `POST` to `CONTACT_WEBHOOK_URL` with an
`Authorization: Bearer <CONTACT_WEBHOOK_SECRET>` header. The body contains the
`contact.submission` event name, an ISO timestamp, and the validated form data.
The destination must respond with a successful HTTP status; redirects are
rejected. Requests time out after five seconds. Personal data is not written to
application logs.

Each submission includes a UUID `submissionId` in the JSON body and as the
`Idempotency-Key` request header. The receiver must durably store a submission
and deduplicate retries by this identifier before returning 2xx. The API cannot
verify the receiver's storage behavior; a successful response only confirms
that the webhook accepted the request. The repository does not configure a
mail provider or shared inbox delivery yet.

Before enabling the public contact form, configure both `CONTACT_WEBHOOK_URL`
and `CONTACT_WEBHOOK_SECRET` in the production environment. Use an HTTPS endpoint
and a random secret of at least 32 characters. Until both values are configured,
submissions return HTTP 503 and the form reports that delivery is unavailable.
No mail or CRM provider is configured by this repository.

The same contact form is available on `/contact` and alongside the ROI
simulator. The ROI gate also submits an email-only lead through this endpoint.
Run `pnpm test:contact` for the handler integration tests. These use mocked
Redis and webhook services and do not prove live inbox delivery or durable
storage.

Production contact rate limiting uses Upstash Redis REST through
`@upstash/ratelimit`. Configure both `UPSTASH_REDIS_REST_URL` and
`UPSTASH_REDIS_REST_TOKEN`; requests are limited to five per IP per hour. The IP
is HMAC-SHA-256 hashed with the contact secret before it becomes a Redis identifier. Missing credentials,
Redis errors, timeouts, or a missing production client IP fail closed with HTTP
503. Local development may use the in-memory limiter.

The CSP allows `'unsafe-eval'` only in development for React diagnostics. The
production policy omits it. Inline scripts and styles remain allowed because
this app currently uses static headers and App Router hydration/inline styles;
moving to a nonce-based policy requires a separate rendering and caching review.
