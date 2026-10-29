import { notFound } from "next/navigation";
import { isLocale, pick, site } from "@/config/site";
import { projects } from "@/content/projects";
import { metadata } from "@/lib/seo";
import { CaseStudy } from "@/components/studio/case-study";
type Props = { params: Promise<{ locale: string; slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = projects(locale).find((p) => p.slug === slug);
  return project
    ? metadata(
        locale,
        "work/" + slug,
        project.name +
          pick(locale, " - Studi Kasus | ", " - Case Study | ") +
          site.name,
        project.description,
      )
    : {};
}
export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !projects(locale).some((p) => p.slug === slug))
    notFound();
  return <CaseStudy locale={locale} slug={slug} />;
}
