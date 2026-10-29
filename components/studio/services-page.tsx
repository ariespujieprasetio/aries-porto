import Link from "next/link";
import { type Locale, pick } from "@/config/site";
import { services } from "@/content/services";
import { CTA, Intro, SectionTitle } from "./shared";
import { Process } from "./home";
export function ServicesPage({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro
        eyebrow={pick(
          locale,
          "LAYANAN / DARI KEBUTUHAN KE SOLUSI",
          "SERVICES / FROM NEED TO SOLUTION",
        )}
        title={pick(
          locale,
          "Teknologi yang tepat. Untuk langkah bisnis berikutnya.",
          "The right technology. For your next business move.",
        )}
        description={pick(
          locale,
          "Dari website pertama hingga sistem operasional yang terintegrasi. Kita tentukan solusi berdasarkan kebutuhan, prioritas, dan anggaran Anda.",
          "From your first website to connected operational systems. We shape a solution around your needs, priorities, and budget.",
        )}
      />
      <nav
        className="shell service-jump"
        aria-label={pick(locale, "Pilih layanan", "Jump to a service")}
      >
        {services(locale).map((s) => (
          <a href={"#" + s.slug} key={s.slug}>
            {s.title}
          </a>
        ))}
      </nav>
      <section className="shell service-details">
        {services(locale).map((s, i) => (
          <article id={s.slug} key={s.slug}>
            <div className="service-number">0{i + 1}</div>
            <div>
              <p className="eyebrow">{s.examples}</p>
              <h2>{s.title}</h2>
              <p className="large-copy">{s.description}</p>
              <p>{s.features}</p>
              <div className="tags">
                <span>{s.tech}</span>
              </div>
            </div>
            <aside>
              <p className="price">{s.price}</p>
              <p>
                {pick(
                  locale,
                  "Harga indikatif. Lingkup, kebutuhan integrasi, dan jadwal menentukan penawaran akhir.",
                  "Indicative pricing. Scope, integrations, and schedule determine the final quotation.",
                )}
              </p>
              <Link
                className="button"
                href={"/" + locale + "/contact?service=" + s.slug}
                data-event="service_inquiry"
              >
                {pick(locale, "Diskusikan kebutuhan", "Discuss your needs")} ↗︎
              </Link>
            </aside>
          </article>
        ))}
      </section>
      <div className="light-section">
        <Process locale={locale} />
      </div>
      <section className="shell section faq">
        <SectionTitle
          number="FAQ"
          label={pick(locale, "SEBELUM MEMULAI", "BEFORE WE START")}
          title={pick(
            locale,
            "Pertanyaan yang sering muncul.",
            "A few useful answers.",
          )}
        />
        {(locale === "id"
          ? [
              [
                "Apakah bisa mulai dari lingkup kecil?",
                "Bisa. Kita dapat menentukan kebutuhan paling penting lebih dahulu dan menyusun pengembangan berikutnya secara bertahap.",
              ],
              [
                "Berapa lama pengerjaannya?",
                "Jadwal ditentukan setelah lingkup, konten, integrasi, dan ketergantungan proyek dibahas.",
              ],
              [
                "Bagaimana dengan hosting dan maintenance?",
                "Kebutuhan hosting, biaya pihak ketiga, dokumentasi, dan dukungan lanjutan dijelaskan dalam proposal. Maintenance dapat disepakati secara terpisah.",
              ],
            ]
          : [
              [
                "Can we start with a small scope?",
                "Yes. We can prioritize the essentials first and plan subsequent improvements in stages.",
              ],
              [
                "How long does a project take?",
                "A schedule is agreed after discussing scope, content, integrations, and project dependencies.",
              ],
              [
                "What about hosting and maintenance?",
                "Hosting, third-party costs, documentation, and support are clarified in the proposal. Ongoing maintenance can be agreed separately.",
              ],
            ]
        ).map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <CTA locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: pick(
              locale,
              "Pengembangan software custom",
              "Custom software development",
            ),
            provider: { "@id": "https://ariespujieprasetio.my.id/#person" },
            serviceType: "Software development",
            areaServed: ["Indonesia"],
          }),
        }}
      />
    </>
  );
}
