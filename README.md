# ARIES. portfolio / independent software studio

## Local development

Existing stack: Next.js 16, React 19, TypeScript, npm. No new runtime dependencies.
Run `npm ci`, `npm run dev`. Root redirects permanently to /id.
Use `npm run lint`, `npm run typecheck`, and `npm run build` before deploying.

## Architecture and content

- `config/site.ts`: production domain, contact links, locale labels, website starting price, optional WhatsApp.
- `content/services.ts`, `content/projects.ts`, `content/career.ts`: bilingual editable business content.
- `components/studio/`: shared navigation, sections, inquiry form, page templates.
- `app/[locale]`: Indonesian and English routes, page metadata and case studies.
- `lib/seo.ts`: canonical URLs, hreflang, social metadata.
- `app/globals.css`: responsive tokens, layout, print styles, reduced motion.

Both /id and /en expose home, services, work, about, experience, contact, resume and four work case studies. Legacy unprefixed routes redirect to Indonesian. The former empty Writing page redirects to About. Unknown pages return 404.

Add a project through `content/projects.ts` and `projectSlugs` in the same file. Shared cards, detail pages, and sitemap use this model. Project technology labels only include supported details. Existing Veritik images and the original CV remain in public, but the new UI uses clearly labeled identity illustrations and a printable resume. Obtain permission before adding screenshots to the public presentation. Existing credentials and recognition are retained from the source repository; no new certifications were invented.

## Inquiry delivery

Copy .env.example to .env.local locally. Configure these in Vercel for deployment:

- RESEND_API_KEY: server-only email API key.
- CONTACT_FROM_EMAIL: sender on a Resend-verified domain.
- CONTACT_TO_EMAIL: optional; defaults to the existing portfolio email.
- CONTACT_ALLOWED_ORIGIN: production URL; set explicitly for preview deployments.
- NEXT_PUBLIC_WHATSAPP_NUMBER: defaults to 6282135342145. Override with country code and digits only, or set an empty value to hide the WhatsApp CTA.
- NEXT_PUBLIC_ANALYTICS_ENABLED: false by default.

Without delivery credentials, the form prepares an email draft containing the visitor's answers. The visitor can open their email app or copy the brief and send it manually. The API returns 503 without configuration. Success is shown only after the provider accepts the message; acceptance is not a guarantee of inbox delivery.

The endpoint validates fields and enums, caps the body, rejects a honeypot, checks supplied origins, times out provider requests, and limits requests per instance using a hashed platform-provided IP. This rate limit is best-effort: serverless instances do not share memory. Configure Vercel firewall rate limiting for distributed protection before promoting a publicly advertised campaign. No inquiry bodies, emails, or phone numbers are logged.

Email API reference: https://resend.com/docs/api-reference/emails/send-email

## Analytics

Enable Vercel Web Analytics in the deployment before setting NEXT_PUBLIC_ANALYTICS_ENABLED=true. The script is absent by default. Custom events cover contact CTAs, service inquiries, WhatsApp, project visits, and successful submissions. Events contain event name and route only, never form contents. Review the deployment's privacy and consent requirements before enabling analytics.

## SEO and rendering

Production canonical domain: https://ariespujieprasetio.my.id.
Localized metadata, language alternates, sitemap, robots, Person/WebSite/Service structured data, generated PNG social image, SVG icon, and manifest are included. Proxy sets the HTML locale from the path; the request header is overwritten rather than trusted from visitors. Pages are server rendered, with client components limited to interaction. Root redirects consistently, without language detection.

## Deployment

1. Run the checks and build.
2. Import this repository into Vercel with the Next.js preset.
3. Configure email environment variables and optional integrations.
4. Test a preview, including an actual email to an inbox you control.
5. Deploy and configure the custom domain only when authorized by the owner.
