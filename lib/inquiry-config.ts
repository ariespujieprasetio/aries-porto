import { site } from "@/config/site";

// Server-only configuration: import from server components/API routes only.
// Never pass this object to a client component; only pass ready and siteKey.
const reported = new Set<string>();

export function inquiryConfig() {
  const values = {
    RESEND_API_KEY: process.env.RESEND_API_KEY?.trim() || "",
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL?.trim() || "",
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY?.trim() || "",
    NEXT_PUBLIC_TURNSTILE_SITE_KEY:
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "",
  };
  const missing = Object.entries(values)
    .filter(([, value]) => !value)
    .map(([name]) => name);
  const signature = missing.join(", ");
  if (signature && !reported.has(signature)) {
    reported.add(signature);
    // Configuration names only: no secret values, visitor data, or inquiry text.
    console.warn("[inquiry] Unavailable; missing configuration: " + signature);
  }
  return {
    ready: missing.length === 0,
    apiKey: values.RESEND_API_KEY,
    from: values.CONTACT_FROM_EMAIL,
    secret: values.TURNSTILE_SECRET_KEY,
    siteKey: values.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    to: process.env.CONTACT_TO_EMAIL?.trim() || site.email,
  };
}

export function inquiryOrigins() {
  const configured = process.env.CONTACT_ALLOWED_ORIGIN?.trim() || site.url;
  try {
    const url = new URL(configured);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    )
      return [];
    const origins = [url.origin];
    if (url.origin === site.url) {
      // Explicit first-party alias only, not arbitrary subdomains or Vercel previews.
      origins.push("https://www." + new URL(site.url).hostname);
    }
    return origins;
  } catch {
    return [];
  }
}
