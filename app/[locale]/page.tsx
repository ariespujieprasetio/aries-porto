import { notFound } from "next/navigation";
import { isLocale, pick } from "@/config/site";
import { metadata } from "@/lib/seo";
import { Home } from "@/components/studio/home";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return metadata(
    locale,
    "",
    pick(
      locale,
      "Jasa Website & Software Custom di Jakarta",
      "Independent Software Engineer in Indonesia",
    ),
    pick(
      locale,
      "Aries Pujie Prasetio membantu UMKM dan perusahaan membangun website, aplikasi web, mobile, dan integrasi API sesuai kebutuhan bisnis.",
      "Aries Pujie Prasetio builds business websites, custom web applications, React Native apps, and API integrations for businesses.",
    ),
  );
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Home locale={locale} />;
}
