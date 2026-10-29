import { notFound } from "next/navigation";
import { isLocale, labels, site } from "@/config/site";
import { Navigation } from "@/components/studio/navigation";
import { Footer } from "@/components/studio/shared";
import { AnalyticsEvents } from "@/components/studio/analytics";
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": site.url + "/#person",
        name: site.name,
        jobTitle: "Senior Software Engineer",
        url: site.url,
        sameAs: [site.github, site.linkedin],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jakarta",
          addressCountry: "ID",
        },
      },
      {
        "@type": "WebSite",
        name: "ARIES. — Independent Software Studio",
        url: site.url,
        inLanguage: ["id", "en"],
      },
    ],
  };
  return (
    <>
      <a className="skip-link" href="#main-content">
        {labels[locale].skip}
      </a>
      <Navigation locale={locale} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
      {process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" && (
        <AnalyticsEvents />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
