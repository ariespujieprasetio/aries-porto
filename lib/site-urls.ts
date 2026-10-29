import { type Locale, site } from "@/config/site";

// Paths come from the public route/content configuration, never request headers.
export function localizedUrl(locale: Locale, path = "") {
  return site.url + "/" + locale + (path ? "/" + path : "");
}

export function languageAlternates(path = "") {
  return {
    id: localizedUrl("id", path),
    en: localizedUrl("en", path),
    // The root deterministically redirects to Indonesian, not language detection.
    "x-default": localizedUrl("id", path),
  };
}
