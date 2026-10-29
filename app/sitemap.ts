import type { MetadataRoute } from "next";
import { locales, pages, site } from "@/config/site";
import { projectSlugs } from "@/content/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    [...pages, ...projectSlugs.map((slug) => "work/" + slug)].map((path) => ({
      url: site.url + "/" + locale + (path ? "/" + path : ""),
      alternates: {
        languages: {
          id: site.url + "/id" + (path ? "/" + path : ""),
          en: site.url + "/en" + (path ? "/" + path : ""),
          "x-default": site.url + "/id" + (path ? "/" + path : ""),
        },
      },
    })),
  );
}
