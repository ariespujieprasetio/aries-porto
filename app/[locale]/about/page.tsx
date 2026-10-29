import { profileSchema } from "@/lib/structured-data";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/site";
import { pageMetadata } from "@/lib/page-metadata";
import { AboutPage } from "@/components/studio/about-page";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "about") : {};
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <AboutPage locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profileSchema(locale)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
    </>
  );
}
