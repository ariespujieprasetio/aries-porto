import { notFound } from "next/navigation";
import { isLocale } from "@/config/site";
import { pageMetadata } from "@/lib/page-metadata";
import { WorkPage } from "@/components/studio/work-page";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "work") : {};
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <WorkPage locale={locale} />;
}
