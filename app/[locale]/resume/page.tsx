import { notFound } from "next/navigation";
import { isLocale } from "@/config/site";
import { pageMetadata } from "@/lib/page-metadata";
import { ResumePage } from "@/components/studio/resume-page";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "resume") : {};
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ResumePage locale={locale} />;
}
