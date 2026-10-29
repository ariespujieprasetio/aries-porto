import { type Locale, pick, site } from "@/config/site";
import { capabilities } from "@/data/capabilities";
import { Intro } from "./shared";
import { Timeline } from "./timeline";
import { Credentials } from "./credentials";
import { PrintButton } from "./print-button";
export function ResumePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro
        eyebrow={pick(locale, "RESUME / VERSI WEB", "RESUME / WEB EDITION")}
        title="Aries Pujie Prasetio"
        description={pick(
          locale,
          "Senior Software Engineer · Jakarta, Indonesia · Sekitar 5 tahun pengalaman full-stack, mobile, enterprise, dan IoT.",
          "Senior Software Engineer · Jakarta, Indonesia · Approximately 5 years across full-stack, mobile, enterprise, and IoT.",
        )}
      />
      <div className="shell resume-toolbar">
        <PrintButton
          label={pick(locale, "Cetak / simpan PDF", "Print / save PDF")}
        />
        <a className="text-link" href={"mailto:" + site.email}>
          {site.email}
        </a>
      </div>
      <article className="shell section resume-content">
        <Timeline locale={locale} />
        <section className="resume-block">
          <h2>{pick(locale, "Keahlian teknis", "Technical expertise")}</h2>
          {capabilities.map((c) => (
            <p key={c.title}>{c.technologies.join(" · ")}</p>
          ))}
          <p>
            JavaScript · PHP · Golang · Python · Java · C · Express · Django ·
            GitLab CI/CD · Selenium · Go Testing
          </p>
        </section>
        <section className="resume-block">
          <h2>
            {pick(locale, "Pendidikan & bahasa", "Education & languages")}
          </h2>
          <p>
            Telkom University ·{" "}
            {pick(
              locale,
              "Sarjana Teknik Telekomunikasi",
              "Bachelor’s Degree in Telecommunication Engineering",
            )}{" "}
            · 2018–2022
          </p>
          <p>
            {pick(
              locale,
              "Bahasa Indonesia: lancar · Bahasa Inggris: menengah",
              "Indonesian: fluent · English: intermediate",
            )}
          </p>
        </section>
        <section className="resume-block">
          <Credentials locale={locale} />
        </section>
      </article>
    </>
  );
}
