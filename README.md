# ARIES. portfolio / independent software studio

## Development

Next.js 16, React 19, TypeScript, npm. Run `npm ci`, then `npm run dev`.
Before deployment: `npm run lint`, `npm run typecheck`, `npm run build`.
The established brand, page structure, and bilingual routes are preserved.

## Content and architecture

- `config/site.ts`: production domain, contact details, starting price.
- `content/`: bilingual service, project, and career content.
- `components/studio/website-package.tsx`: agreed website package: up to three pages, one language, one consolidated revision round, client-supplied content; optional additions and exclusions.
- `app/[locale]`: Indonesian and English pages and case studies.
- `lib/seo.ts`: localized canonical URLs, hreflang and social metadata.
- `proxy.ts`: sets HTML locale from the URL, overwriting untrusted incoming locale headers.

Both /id and /en expose home, services, work, about, experience, contact, resume, and four case studies. Legacy unprefixed routes redirect to Indonesian. Root redirects permanently to /id in next.config.ts before rendering, with app/page.tsx retained as a fallback. No language-detection redirects or catch-all Vercel rewrites are required.

## Project assets

Veritik uses the existing `public/images/work/veritik/banner-veritik.png` demonstration visual with responsive Next Image optimization, intrinsic dimensions, localized alt text, a full-size link, and an explicit sample-data caption. Its numbers are not customer outcomes or business metrics.

Implementation note: no authorized product screenshots were found for Velutara, enterprise systems, or the radiation monitor. Their existing labeled identity illustrations remain. Add actual assets only with owner/client permission and remove sensitive information first. Do not substitute invented screens, testimonials, or metrics. The existing CV and other source assets remain intact.

## Inquiry delivery setup

Copy .env.example to .env.local for local development. Set the following separately in Vercel Preview and Production:

| Variable | Purpose |
| --- | --- |
| RESEND_API_KEY | Server-only Resend API key, preferably restricted to sending |
| CONTACT_FROM_EMAIL | Sender on a Resend-verified domain |
| CONTACT_TO_EMAIL | Recipient; defaults to dev.ariespp@gmail.com |
| CONTACT_ALLOWED_ORIGIN | Exact HTTPS origin, without trailing slash; production default is the canonical domain |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY | Public Cloudflare Turnstile widget site key; supplied at build time |
| TURNSTILE_SECRET_KEY | Server-only secret for that widget |
| NEXT_PUBLIC_WHATSAPP_NUMBER | Optional override; default 6282135342145, empty hides WhatsApp |
| NEXT_PUBLIC_ANALYTICS_ENABLED | Optional, false by default; supplied at build time |

Verify the sender domain in Resend and configure its required DNS records. Create a Turnstile widget for the production hostname. Preview tests need their exact origin and an allowed widget hostname. Do not use test keys in production. Redeploy after changing public build-time variables.

Without all email and Turnstile settings, the form clearly shows an unavailable state with direct email/WhatsApp alternatives. It never generates an email draft or claims a send occurred. The API independently refuses unconfigured requests.

The server validates field types, lengths and enums, rejects honeypots, requires an allowed Origin, caps streamed JSON bodies, verifies Turnstile success/hostname/action, and applies provider timeouts. A hashed platform IP is used for a best-effort per-instance limit of five attempts per ten minutes. Serverless instances do not share this counter; add a Vercel Firewall rate-limit rule for POST /api/inquiry for distributed flood protection. Turnstile remains mandatory on every send.

Retries of unchanged form data reuse a UUID as the Resend idempotency key. The provider retains these keys for 24 hours. Retry deduplication lasts while this page stays open, not after reloads. Every retry obtains a fresh single-use Turnstile token. No form contents, email addresses, phone numbers, or provider secrets are logged by this code. Data is sent to Resend for delivery; Turnstile handles spam verification. Submission data is kept in React memory only while the page is open.

Success requires an accepted provider response with a nonempty email ID. It means accepted for delivery, not proof of inbox delivery. Error feedback preserves input; field errors focus the first invalid field and submission feedback receives focus. After deployment, send an authorized test to an inbox you control and inspect delivery/bounce status in Resend.

References: [Resend send API](https://resend.com/docs/api-reference/emails/send-email), [idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys), [Turnstile validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

## Optional conversion analytics

Enable Web Analytics in the Vercel project and confirm the account supports custom events before setting NEXT_PUBLIC_ANALYTICS_ENABLED=true and rebuilding.

The official SDK queues events while loading. Only contact_cta, whatsapp_cta, service_inquiry and inquiry_submitted are emitted. The latter fires only after confirmed API acceptance. Event properties contain only an allowlisted localized route; no text, email, phone, token, request ID, destination URL, or form values. Page URLs have query strings and fragments stripped, unknown routes are dropped, and Do Not Track / Global Privacy Control suppress analytics. The site uses an origin-only referrer policy. Vercel also processes standard aggregate request/device data; see its [privacy documentation](https://vercel.com/docs/analytics/privacy-policy). Analytics is absent by default.

## Production routing verification

The audited repository already redirected root to /id and contained no old homepage or conflicting rewrite. The new configuration makes the redirect explicit before rendering; it does not establish the cause of the reported live mismatch.

No vercel.json is needed for this standard Next.js app. In Vercel manually verify:

1. The custom apex domain points to the intended project and current Production deployment/commit, not an old project or Preview deployment.
2. The production branch and Root Directory refer to this repository/app. Use the Next.js framework preset and default output; remove any stale dashboard build/output overrides.
3. Inspect dashboard redirects/rewrites and upstream DNS/proxy rules. Configure www to redirect to the canonical apex and ensure both certificates are valid.
4. Compare /, /id and /en on the deployment URL and custom domain. Root should return 308 to /id (preserving query parameters). Localized pages should return 200, with matching canonical, hreflang and HTML lang.
5. Check response Location, Age, Cache-Control and x-vercel-cache headers. If the correct deployment URL works but the domain differs, inspect domain aliases/proxy caching. After identifying the cause, redeploy or invalidate the affected cache; avoid guessing that clearing cache fixes a routing mismatch.
6. Retest in a fresh browser profile and inspect any previously installed service worker/site data. This repository registers no service worker.

The audit environment could not retrieve the live apex reliably (connection timeouts); a www request also encountered certificate validation failure. These observations do not prove a public outage or certificate misconfiguration. Live domain routing, deployment aliases, certificates, provider delivery and analytics ingestion require manual verification. No deployment, DNS change, email send, commit, or push is performed by this repository update.
