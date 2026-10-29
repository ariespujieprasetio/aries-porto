import { type Locale, pick, site } from "@/config/site";
import { localizedUrl } from "@/lib/site-urls";

export function identitySchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": site.url + "/#person",
        name: site.name,
        jobTitle: "Software Engineer",
        description: pick(
          locale,
          "Software engineer independen dengan pengalaman aplikasi enterprise, pengembangan web, mobile, dan solusi software custom.",
          "Independent software engineer experienced in enterprise applications, web development, mobile development, and custom software solutions.",
        ),
        url: site.url,
        // Both profile URLs were provided directly by the site owner.
        sameAs: [site.github, site.linkedin],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jakarta",
          addressCountry: "ID",
        },
      },
      {
        "@type": "WebSite",
        "@id": site.url + "/#website",
        name: "Aries Pujie Prasetio | Software Engineer & Software Studio",
        alternateName: "ARIES.",
        url: site.url,
        description: pick(
          locale,
          "Portofolio profesional dan layanan pengembangan software Aries Pujie Prasetio di Jakarta, Indonesia.",
          "The professional portfolio and software development services of Aries Pujie Prasetio in Jakarta, Indonesia.",
        ),
        inLanguage: ["id", "en"],
        publisher: { "@id": site.url + "/#person" },
      },
    ],
  };
}

export function profileSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": localizedUrl(locale, "about") + "#profile",
    url: localizedUrl(locale, "about"),
    name: pick(locale, "Tentang ", "About ") + site.name,
    inLanguage: locale,
    isPartOf: { "@id": site.url + "/#website" },
    mainEntity: { "@id": site.url + "/#person" },
  };
}
