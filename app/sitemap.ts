import type { MetadataRoute } from "next";
import { locales, pages } from "@/config/site";
import { projectSlugs } from "@/content/projects";
import { languageAlternates, localizedUrl } from "@/lib/site-urls";

// Keep discovery independent of request headers, authentication, and providers.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...pages, ...projectSlugs.map((slug) => "work/" + slug)];
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: localizedUrl(locale, path),
      alternates: { languages: languageAlternates(path) },
      // No lastModified: the content model has no verified modification dates.
    })),
  );
}
