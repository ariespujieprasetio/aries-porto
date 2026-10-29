import { type Locale, pick } from "@/config/site";
import { CTA, Intro } from "./shared";
import { Timeline } from "./timeline";
export function ExperiencePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro
        eyebrow={pick(
          locale,
          "PENGALAMAN / PERJALANAN PROFESIONAL",
          "EXPERIENCE / THE PROFESSIONAL JOURNEY",
        )}
        title={pick(
          locale,
          "Pengalaman yang membentuk cara saya membangun.",
          "Experience that shapes how I build.",
        )}
        description={pick(
          locale,
          "Sekitar lima tahun bekerja lintas software, mobile, sistem enterprise, dan riset hardware. Pemberi kerja dicantumkan sebagai riwayat karier, bukan afiliasi studio.",
          "Approximately five years across software, mobile, enterprise systems, and hardware research. Employers are listed as career history, not studio affiliations.",
        )}
      />
      <section className="section shell">
        <Timeline locale={locale} />
      </section>
      <CTA locale={locale} />
    </>
  );
}
