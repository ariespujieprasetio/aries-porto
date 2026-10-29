import { notFound } from "next/navigation";
import { isLocale } from "@/config/site";
import { pageMetadata } from "@/lib/page-metadata";
import { Home } from "@/components/studio/home";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "") : {};
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Home locale={locale} />;
}
