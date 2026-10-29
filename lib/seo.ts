import type { Metadata } from "next";
import { type Locale, site, pick } from "@/config/site";
export function metadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = site.url + "/" + locale + (path ? "/" + path : "");
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        id: site.url + "/id" + (path ? "/" + path : ""),
        en: site.url + "/en" + (path ? "/" + path : ""),
        "x-default": site.url + "/id" + (path ? "/" + path : ""),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "ARIES. - Independent Software Studio",
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? "en_US" : "id_ID",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: pick(
            locale,
            "ARIES. Rekayasa software untuk bisnis Anda.",
            "ARIES. Software engineering for your business.",
          ),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
