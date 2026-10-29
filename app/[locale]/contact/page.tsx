import { notFound } from "next/navigation";
import { isLocale } from "@/config/site";
import { pageMetadata } from "@/lib/page-metadata";
import { ContactPage } from "@/components/studio/contact-page";
type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
};
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "contact") : {};
}
export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <ContactPage
      locale={locale}
      initialService={(await searchParams).service}
    />
  );
}
