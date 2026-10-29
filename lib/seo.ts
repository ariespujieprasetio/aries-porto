import type { Metadata } from "next";
import { languageAlternates, localizedUrl } from "@/lib/site-urls";
import { type Locale, pick } from "@/config/site";
export function metadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = localizedUrl(locale, path);
  return {
    title: { absolute: title },
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
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
            "Aries Pujie Prasetio - Software Engineer & Software Studio",
            "Aries Pujie Prasetio - Software Engineer & Software Studio",
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
