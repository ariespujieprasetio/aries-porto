# Technical SEO audit and Search Console runbook

Audit date: 29 October 2026 (Asia/Jakarta). This report separates repository implementation, local production-mode testing, and observations from public hosts.

> Follow-up: the site is now reachable. See [the newer production-readiness audit](PRODUCTION_READINESS.md) for current apex/www responses and form configuration findings. The earlier timeout observations below are historical.

## Observed issue and root cause

The owner reported that Search Console showed **Unknown / Couldn't fetch / 0 discovered pages** for `https://ariespujieprasetio.my.id/sitemap.xml`, submitted on 29 October 2026. Domain ownership was already verified. No Search Console account or live report was accessed during this audit.

**Root cause remains unconfirmed.** No missing sitemap route, malformed generator, locale-proxy interception, or restrictive robots policy was found in the repository. A successful response from the old deployment cannot establish accessibility of the custom domain or what Google received.

Public HTTP evidence collected before implementation:

| Request | Observed result |
| --- | --- |
| Primary HTTPS `/`, `/en`, `/sitemap.xml`, `/robots.txt` | Connection timeout; no HTTP response obtained |
| Primary HTTP `/` and HTTPS `www` root | Connection timeout |
| Old Vercel domain `/sitemap.xml` | 200, `application/xml`; contains primary-domain localized URLs |
| Old Vercel domain `/robots.txt` | 200, `text/plain; charset=utf-8`; allows public pages and declares the primary-domain sitemap |
| Old Vercel domain `/` | 308 to `/id` |
| Old Vercel domain `/id`, `/en` | 200 HTML, canonical tags point to the matching primary-domain locale |

The old domain is `https://aries-porto-xyme.vercel.app`. Node HTTP requests were also run outside the restricted sandbox. The custom apex and www resolved locally to `216.198.79.1`; the old Vercel hostname resolved to `64.29.17.3`. These are dated observations, **not recommended DNS records**.

A separate diagnostic request using the primary hostname with the reachable Vercel IP failed Windows certificate-chain validation (`SEC_E_UNTRUSTED_ROOT`). TLS validation was not bypassed. This does not establish a public certificate defect: resolver, network, interception, certificate trust, or edge accessibility may differ in this environment. Neither this result nor the timeouts prove the cause of Google's failed fetch.

## Initial repository findings

- Next.js 16.2.12 installed, App Router, React 19, Vercel-compatible architecture.
- One built-in sitemap generator and one robots generator already existed. No duplicate static files or sitemap package.
- `proxy.ts` excludes dotted paths such as sitemap.xml and robots.txt, as well as API and Next assets. It sets HTML locale from the path and does not authenticate or redirect discovery endpoints.
- `next.config.ts` already redirects root permanently to /id. Legacy routes redirect to localized destinations. No vercel.json or repository catch-all rewrite was found.
- Canonicals and hreflang already used the preferred HTTPS hostname. Their URL construction was duplicated between metadata and sitemap.
- Homepage title emphasized services rather than the exact professional name. Other significant page titles used short navigation labels.
- Person/WebSite markup existed but lacked descriptive identity information and a linked website identifier. About is a person-focused profile and can carry ProfilePage markup.
- A global inherited `index` directive was unnecessary on redirect/error routes. It is now confined to valid public pages; Next.js supplies `noindex` for 404 responses.
- The full name already appears in server-rendered hero text and footer. Heading structure, service copy, alt text, localized navigation, local font and existing social image did not need a redesign.
- The old Vercel host serves duplicate localized content with primary-domain canonicals. Alias ownership/settings and Google-selected canonicals cannot be inspected from the repository.

## Implementation

### Sitemap and robots

Keep the single Next.js `MetadataRoute.Sitemap` and `MetadataRoute.Robots` mechanisms, explicitly static and independent of request-time integrations.

Sitemap contains 22 final canonical destinations: seven public pages per locale (home, services, work, about, experience, contact, resume), plus four project detail pages per locale. Project slugs are derived from the same content model used by case-study pages, eliminating a separately maintained slug list.

Every entry has id, en and x-default equivalents. x-default now points to English because root redirects to /en. Redirect-only roots/legacy paths, API, errors, unknown locales, query variants and private routes are excluded. No lastmod, priority or changefreq is invented: the content model has no verified publication/modification timestamps.

Robots output remains:

```text
User-Agent: *
Allow: /
Disallow: /api/

Sitemap: https://ariespujieprasetio.my.id/sitemap.xml
```

Public pages and essential assets remain crawlable. Robots exclusion is not an indexing-removal mechanism.

### Metadata, international SEO and social previews

- Both homepage titles now use `Aries Pujie Prasetio | Software Engineer & Software Studio`.
- Services, work, about, experience, contact, resume and case studies have descriptive, name-focused titles and natural localized descriptions.
- Absolute child titles prevent an extra parent suffix. Open Graph and Twitter titles/descriptions match each page.
- One shared URL helper builds canonical and reciprocal hreflang URLs for metadata and sitemap. English retains its own canonical.
- HTML lang follows id/en; ordinary query variants canonicalize to the clean localized route.
- The existing branded 1200x630 PNG is preserved, with a name-focused alt description. No new image or font dependency.
- Metadata remains server-side. No keyword stuffing, hidden SEO text or redesign.

### Structured data

Person uses the owner's name, Software Engineer role, professional description, Jakarta/Indonesia location and GitHub/LinkedIn URLs supplied directly by the owner. No street address, business registration, ratings, reviews or results were invented.

WebSite has a stable identifier, description, both languages, ARIES. alternate name and a publisher reference to Person. About pages add ProfilePage referencing that Person. Existing project breadcrumbs are preserved. Service references the configured provider identifier and localized service URL. JSON-LD is escaped before embedding.

Local verification checks JSON syntax, expected types, required identity values and entity references. It is not a Google Rich Results Test or a promise of eligibility for a particular search feature.

## Modified files

| File | Change |
| --- | --- |
| `lib/site-urls.ts` | Shared canonical and language-alternate construction |
| `lib/seo.ts` | Absolute titles, page-specific indexing policy, shared URL helper, social alt |
| `lib/page-metadata.ts` | Bilingual titles and descriptions for all top-level public pages |
| `lib/structured-data.ts` | Person, WebSite and About ProfilePage definitions |
| `app/sitemap.ts` | Explicit static generation and shared canonical/alternate helpers |
| `app/robots.ts` | Explicit static generation; correct existing policy retained |
| `content/projects.ts` | Derive project slugs from actual project content |
| `app/layout.tsx` | Name-focused defaults; remove global inherited index directive |
| `app/[locale]/layout.tsx` | Use shared identity graph |
| `app/[locale]/page.tsx` | Use centralized homepage metadata |
| `app/[locale]/about/page.tsx` | Person-focused ProfilePage markup |
| `app/[locale]/work/[slug]/page.tsx` | Localized, name-focused case-study titles |
| `components/studio/services-page.tsx` | Structured-data URL/provider consistency and safe serialization |
| `app/opengraph-image.tsx` | Name-focused image alt; visual output preserved |
| `README.md` | Link to this runbook |
| `docs/SEO.md` | Audit evidence, verification and deployment/Search Console instructions |

No CSS, navigation behavior, contact implementation, credentials, dependency manifest/lockfile, DNS, Search Console TXT record or production settings were changed.

## Verification performed

| Check | Result |
| --- | --- |
| `npm ls --depth=0` | Exit 0; declared versions resolve. One pre-existing extraneous local `@emnapi/runtime` package was reported; dependencies were not reinstalled |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm run build` | Passed; sitemap.xml and robots.txt prerender as static routes |
| `git diff --check` | Passed |
| Local `/sitemap.xml` | 200, application/xml; parsed with browser DOMParser, valid namespace, 22 distinct absolute URLs, accurate alternates, no fabricated dates |
| Local `/robots.txt` | 200, text/plain; public crawling allowed; correct sitemap declaration |
| All 22 sitemap destinations | 200 HTML, correct locale, one H1, crawlable full name, unique titles/descriptions within each locale, one correct canonical, reciprocal hreflang, no noindex/nofollow |
| Social metadata and JSON-LD | Title/description consistency and locale checked on all 22 routes; all JSON parsed and entity links checked |
| Root, query-preserving root, locale trailing slashes, representative legacy URLs | Expected 308 redirects to final routes; destinations covered by successful 200 checks |
| Contact query variant | Clean English canonical preserved |
| Unknown page, project and locale | 404 and noindex, with no contradictory index directive |
| Googlebot, Facebook and Twitter user-agent requests | Local homepage 200 with correct metadata; social crawler metadata present in head. These are simulated clients, not actual Google crawls |
| Social image | 200 PNG, verified 1200x630 dimensions |
| Chrome rendering | Four representative pages at 390 and 1440 px, no horizontal overflow or runtime exceptions; locale switching verified |
| Visual preservation | Homepage pixel buffers match pre-change audit screenshots exactly at 390 and 1440 px |
| JavaScript disabled | Essential homepage text and H1 remain visible |
| Performance smoke check | Homepage script response bodies total 144,276 bytes in this local run, unchanged from the preceding audit; no external scripts loaded with defaults |

Temporary test scripts/screenshots were kept outside the repository. No live email was sent. No Lighthouse, field Core Web Vitals, external schema validator, Google indexing, ranking, or Search Console success is claimed. Other browsers and real social-platform caches were not tested.

## Deployment and domain consolidation

**Do not change the existing Google verification TXT record.** No new verification token or SEO environment variable is required.

1. Review the changes, then deploy only after owner approval. Confirm the intended production branch, commit, project and Root Directory; use the Next.js preset and default output.
2. Compare the current deployment URL with the custom domain. Verify the apex is assigned to the intended project and production deployment. Inspect deployment protection, firewall/bot rules, redirects and any upstream proxy/cache. Discovery endpoints must be public and must not receive login/challenge HTML.
3. Compare current DNS resolution with the values Vercel shows for this project, including any AAAA record, without replacing the verification TXT. DNS/production changes require separate owner authorization; do not copy the diagnostic IPs above into DNS.
4. Verify HTTP redirects to HTTPS and www redirects to the apex while preserving the path. Root should then lead to /en. Check certificates and redirect chains from an independent network. Test direct /id and /en, not only root.
5. Check apex sitemap and robots responses with real GET requests: 200, XML/plain-text content, no challenge page, no redirect loop, no restrictive X-Robots-Tag. Confirm the XML contains the new deployment's canonical routes.
6. Inspect the old `aries-porto-xyme.vercel.app` alias in Vercel. If it is an editable domain/alias on a project you control, configure a path-preserving permanent redirect to the primary domain using supported domain settings. Test representative paths and loops first.
7. If that alias is an immutable deployment URL or belongs to another project, do not assume its redirect can be changed. Keep primary-domain canonical signals on editable deployments, avoid promoting old links, and inspect Google-selected canonicals. Do not apply a blanket redirect to every vercel.app hostname or block all previews to solve a single alias.
8. Only invalidate a cache or change a redirect after identifying an actual mismatch. Re-test the primary URLs after deployment; successful local results cannot close the production incident.

Useful GET diagnostics (PowerShell/Windows; use `curl` on other systems):

```powershell
curl.exe -sS -D - --max-time 20 https://ariespujieprasetio.my.id/sitemap.xml
curl.exe -sS -D - --max-time 20 https://ariespujieprasetio.my.id/robots.txt
curl.exe -sS -I --max-time 20 https://ariespujieprasetio.my.id/
curl.exe -sS -I --max-time 20 https://www.ariespujieprasetio.my.id/id
```

For local reproduction, run the three project checks, then `npm run start -- -p 3100` and inspect the same endpoints on localhost. Canonical and sitemap URLs intentionally remain production URLs.

## Search Console actions after deployment

1. Verify the deployed sitemap is publicly accessible; check it from an independent network as well as your browser.
2. Open the **existing verified domain property** in Search Console. Do not create a replacement verification record.
3. In Sitemaps, submit `https://ariespujieprasetio.my.id/sitemap.xml` (or `sitemap.xml` if the UI supplies that exact origin). Open the submission details and inspect fetch errors and last-read information.
4. Use URL Inspection on `https://ariespujieprasetio.my.id/id`; run **Test Live URL**. Check fetch success, allowed crawling, rendered content and indexing eligibility.
5. Request indexing if eligible. Repeat selectively for /en and key service/project URLs. A request does not guarantee indexing.
6. Monitor the Pages indexing report and sitemap processing. Investigate error details if Couldn't fetch persists; do not declare success solely because a local browser receives XML.
7. When indexed data becomes available, compare declared and Google-selected canonicals, particularly for old Vercel URLs.
8. Monitor Performance queries for **Aries Pujie Prasetio** and relevant service intent over time. Do not assume a ranking or immediate report update.
9. Run Google's Rich Results Test / Schema.org Validator against the deployed pages as appropriate. Syntax/semantic validity does not guarantee a rich result.

The sitemap incident is resolved only when the deployed primary endpoint is accessible and Google successfully fetches/processes it. This repository change establishes local implementation readiness, not that external outcome.

## References

- [Google: Sitemaps report and fetch troubleshooting](https://support.google.com/webmasters/answer/7451001)
- [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Next.js: Sitemap metadata API](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Vercel: Deploying and redirecting domains](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting)
