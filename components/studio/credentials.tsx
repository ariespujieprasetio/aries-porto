import { type Locale, pick } from "@/config/site";
import { certifications } from "@/data/certifications";
import { AchievementGallery } from "./achievement-gallery";
import { achievements } from "@/data/achievements";
export function Credentials({ locale }: { locale: Locale }) {
  return (
    <>
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {pick(
              locale,
              "PENGEMBANGAN PROFESIONAL",
              "PROFESSIONAL DEVELOPMENT",
            )}
          </p>
          <h2>
            {pick(
              locale,
              "Sertifikasi & pengakuan.",
              "Credentials & recognition.",
            )}
          </h2>
        </div>
      </div>
      <div className="credentials">
        {certifications.map((c) => (
          <article key={c.name}>
            {c.url ? (
              <a href={c.url} target="_blank" rel="noreferrer">
                {c.name} ↗︎
              </a>
            ) : (
              <strong>{c.name}</strong>
            )}
            <p>
              {c.issuer} · {c.year}
            </p>
          </article>
        ))}
      </div>
      <div className="recognition">
        {achievements.map((a) => (
          <div key={a.title}>
            <strong>{a.title}</strong>
            <p>
              {a.organization} · {a.month === "12" ? pick(locale, "Desember ", "December ") : ""}{a.year}
            </p>
            {a.project && <p>{pick(locale, "Proyek: ", "Project: ")}{a.project}</p>}
          </div>
        ))}
      </div>
      <AchievementGallery locale={locale} />
    </>
  );
}
