> Current canonical policy (2026-10-30): `site.url` in `config/site.ts` is https://www.ariespujieprasetio.my.id. Preserve apex-to-www redirects and root-to-/en. Earlier audit observations below are historical; do not reverse the host redirect. After deployment submit the www sitemap in Search Console and inspect its fetch result; the previous failure has no proven cause.

# Targeted production-readiness audit

Follow-up audit: 29 October 2026. These live observations supersede the earlier connection-timeout observations in SEO.md. No deployment or domain settings were changed.

## Confirmed findings

| Area | Root cause / evidence | Resolution |
| --- | --- | --- |
| Contact fallback | Live id/en contact pages render the intentional unavailable state. Public rendered props contain an empty Turnstile site key and configured=false. An empty NEXT_PUBLIC_TURNSTILE_SITE_KEY alone disables the form. Private Resend/Turnstile variables cannot be inspected from public HTML. | Configure all four required variables in the correct Vercel environment and redeploy. The existing real server workflow is retained and hardened; the fallback is not bypassed. |
| Origin validation | The deployed site is served on www, but the previous API accepted only the apex by default. A configured form submitted from www would fail its origin check. | API now allows only the explicit apex and owned www alias when using the production origin. Arbitrary subdomains, lookalikes and unrelated previews remain rejected. Turnstile must match the actual request hostname and action. |
| Canonical/domain routing | All 22 apex sitemap destinations return 308 to their www equivalents. All 22 www pages return 200 but canonical/hreflang point to apex. This is an edge/deployment redirect opposite to the repository's preferred hostname. | Keep apex as canonical. Reverse the domain redirect in Vercel as described below. No app-level www-to-apex redirect was added because it would loop against the current apex-to-www edge redirect. |
| Sitemap/robots | Apex discovery endpoints return 308 to www. On www, sitemap is 200/application/xml and robots is 200/text/plain; charset=utf-8. XML parses correctly with 22 unique entries. Entries still target redirecting apex URLs. | Generators and locale proxy are already correct. Fix host consolidation; do not replace the sitemap or invent a generator bug. |
| Metadata | Both locales have valid page-specific titles, descriptions, canonical/hreflang tags, Open Graph and JSON-LD. Indonesian homepage title contains Aries Pujie Prasetio; description includes website, business applications, mobile and custom software services. | Preserved. Hostname mismatch remains a deployment issue. |
| Error metadata | Live /id/not-a-real-page returns 404 without an explicit robots meta; unknown project/locale responses do include noindex. All three return real 404 responses. | Added explicit noindex/follow metadata to app/not-found.tsx for consistent behavior after deployment. A proper 404 already signals that the page is unavailable. |

HTTP-to-HTTPS redirects work on both hostnames (308). Root on www redirects to /id. Representative trailing-slash and legacy redirects preserve valid localized destinations. No loop was observed in the current live chains.

This audit does not establish the cause of the historical Search Console Couldn't fetch report. A current fetchable sitemap and a known canonical-host mismatch are not evidence that Google has processed or indexed anything.

## Targeted code changes

- `lib/inquiry-config.ts`: shared server configuration, whitespace handling, safe missing-variable-name diagnostics, validated explicit origin allowlist. No secret values or visitor data are logged.
- `app/api/inquiry/route.ts`: consume shared configuration, accept the legitimate www origin, normalize an origin setting with a trailing slash, reject malformed origin settings and JSON-lookalike content types.
- `components/studio/contact-page.tsx`: use the same configuration gate as the API; direct email CTA is tagged consistently.
- `components/studio/inquiry-form.tsx`: distinct accessible feedback for verification failures, unavailable configuration, and rejected origins. Existing preservation of input and confirmed-success logic remain.
- `app/not-found.tsx`: explicit noindex policy.
- `.env.example`, `README.md`, `docs/SEO.md`: configuration clarification and links to this follow-up.

The established form already uses server-side validation, bounded JSON input, a honeypot, per-instance rate limiting, mandatory server-verified Turnstile, provider timeouts, and Resend idempotency keys. These protections remain. Success still requires a successful Resend response containing an email ID; acceptance is not proof of inbox delivery. Rate limiting is best-effort per instance; Vercel Firewall rules can provide distributed protection.

No CSS, layout, navigation appearance, service content, project visuals, credentials, DNS records or dependencies were changed.

## Verification

**Local repository/build**

- ESLint, TypeScript and production build passed.
- 37 API checks passed with provider calls mocked: validation, size limits, honeypot, missing configuration, challenge verification, rate limiting, provider failures, acceptance, retry idempotency, www origin, spoofed origin, trailing-slash origin and content-type handling.
- Browser form checks passed with six intercepted submissions, including success, provider error, incomplete acceptance, verification failure, unavailable configuration and rejected origin. Input preservation, focus, retry ID reuse and conversion events were checked.
- No secret test values appeared in rendered HTML. Missing-variable diagnostics contained names only.
- Configured form axe checks reported no violations in the tested rules; this is not a complete accessibility certification.
- Production-mode sitemap/robots, 22 localized pages, metadata, schema references, redirects, error handling, social image and desktop/mobile checks were rerun.
- No real email was sent; real Resend acceptance/delivery and Turnstile completion remain deployment checks.

**Actual production, before these changes are deployed**

- 22 www pages returned 200. Titles/descriptions, locale, canonical/hreflang consistency within the current apex policy, Open Graph, JSON-LD syntax and identity links checked.
- All 22 corresponding apex URLs returned 308 to www: canonical targets are not final destinations yet.
- www sitemap parsed as well-formed XML with 22 unique production URLs and id/en/x-default alternates. www robots permits public routes and essential assets.
- Representative local/legacy redirects, Googlebot/social-crawler user-agent responses, server-rendered text without JavaScript, and 1200x630 social PNG checked. Simulated user agents are not proof of an actual Google crawl.
- Live home/about/services inspected at 390 and 1440 px; live contact in both languages inspected at 360 and 1440 px. No horizontal overflow or browser runtime exceptions observed.
- Mobile menu open/Escape, language switching, hero contact navigation and direct email/WhatsApp destinations checked. No outgoing message was sent.

Temporary tests and screenshots stay outside the repository. No Lighthouse/Core Web Vitals, Search Console indexing success or external provider delivery is claimed.

## Required owner configuration

### 1. Activate inquiry delivery

In the intended Vercel project's **Production** environment, configure:

| Variable | Requirement |
| --- | --- |
| RESEND_API_KEY | Valid server-only sending key |
| CONTACT_FROM_EMAIL | Sender using a domain verified in Resend |
| TURNSTILE_SECRET_KEY | Server-only secret for the correct widget |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY | Matching public widget key; currently empty in deployed output |

Keep CONTACT_TO_EMAIL as the intended recipient (defaults to dev.ariespp@gmail.com).
Keep CONTACT_ALLOWED_ORIGIN as `https://www.ariespujieprasetio.my.id`. This configuration now also accepts only its explicit www alias during transition. For a preview, set its exact origin; no wildcard Vercel-host allowance is added.

Allow the actual apex/www hostnames in the Turnstile widget settings. Set the public key before building and create a new deployment after approval; changing a variable does not update an already running deployment. Inspect Vercel server logs after opening Contact for the `[inquiry] Unavailable; missing configuration:` message if the fallback persists. It lists names only. Presence checks cannot establish that a key is valid or a sender domain is verified.

After deployment, send one authorized test inquiry to an inbox you control, inspect Resend delivery/bounce status, and verify failure feedback. Do not paste secret keys into client code or commit an .env file.

### 2. Align domain routing

Preserve the existing apex-to-www redirect. No DNS or Vercel setting changes are needed for this hostname decision. Verify www /id and /en return 200, root redirects to /en, and www /sitemap.xml and /robots.txt return 200 with XML/text content types. Keep Search Console DNS verification unchanged.

### 3. Recheck discovery

After deployment and domain repair, test the live www URLs in Search Console, resubmit the sitemap if necessary, and monitor fetch/indexing reports. No indexing or ranking outcome is guaranteed.

References: [Next.js environment variables](https://nextjs.org/docs/app/guides/environment-variables), [Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
