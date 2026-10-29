import { type Locale, pick } from "@/config/site";
import { CTA, Intro, ProjectCards } from "./shared";
export function WorkPage({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro
        eyebrow={pick(
          locale,
          "PORTOFOLIO / KARYA PILIHAN",
          "PORTFOLIO / SELECTED WORK",
        )}
        title={pick(locale, "Dibangun dengan tujuan.", "Built with purpose.")}
        description={pick(
          locale,
          "Produk mandiri, proyek komersial internasional, dan pengalaman rekayasa software enterprise. Setiap proyek membawa konteks yang berbeda.",
          "Independent products, international commercial delivery, and enterprise engineering experience. Different contexts, considered solutions.",
        )}
      />
      <section className="section shell work-section">
        <ProjectCards locale={locale} />
      </section>
      <CTA locale={locale} />
    </>
  );
}
