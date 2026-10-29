import Link from "next/link";
import { type Locale, labels, pick } from "@/config/site";
import { services } from "@/content/services";
import { CTA, ProjectCards, SectionTitle } from "./shared";
export function Process({ locale }: { locale: Locale }) {
  const steps =
    locale === "id"
      ? [
          [
            "Kenali kebutuhan",
            "Kita bahas tujuan, pengguna, dan proses bisnis Anda.",
          ],
          [
            "Lingkup & proposal",
            "Sepakati hasil kerja, prioritas, biaya, dan jadwal.",
          ],
          [
            "Desain & pengembangan",
            "Bangun bertahap dengan komunikasi dan tinjauan yang jelas.",
          ],
          [
            "Pengujian & penyerahan",
            "Periksa fungsi, siapkan dokumentasi, dan serahkan aplikasi.",
          ],
          [
            "Dukungan lanjutan",
            "Maintenance opsional sesuai kebutuhan dan kesepakatan.",
          ],
        ]
      : [
          [
            "Discovery",
            "We discuss your goals, users, and business processes.",
          ],
          [
            "Scope & proposal",
            "Agree on deliverables, priorities, cost, and schedule.",
          ],
          [
            "Design & development",
            "Build in stages with clear communication and reviews.",
          ],
          [
            "Testing & delivery",
            "Check functionality, prepare documentation, and hand over.",
          ],
          [
            "Ongoing support",
            "Optional maintenance based on your needs and our agreement.",
          ],
        ];
  return (
    <section className="section shell">
      <SectionTitle
        number="03"
        label={pick(locale, "CARA KERJA", "THE PROCESS")}
        title={pick(
          locale,
          "Jelas sejak awal. Terarah sampai akhir.",
          "A clear path from first conversation to handover.",
        )}
      />
      <div className="process-grid">
        {steps.map(([title, copy], i) => (
          <article key={title}>
            <span className="step-number">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
function EngineeringVisual({ locale }: { locale: Locale }) {
  return (
    <div
      role="img"
      className="engineering-visual"
      aria-label={pick(
        locale,
        "Ilustrasi lapisan software: antarmuka, logika, dan data",
        "Illustration of software layers: interface, logic, and data",
      )}
    >
      <div className="visual-label">
        <span className="status-dot" />{" "}
        {pick(locale, "DARI IDE KE SISTEM", "FROM IDEA TO SYSTEM")}{" "}
        <span>01—03</span>
      </div>
      <div className="architecture">
        <div className="architecture-layer layer-one">
          <span>01 / EXPERIENCE</span>
          <strong>
            {pick(locale, "Mudah digunakan.", "Built for people.")}
          </strong>
          <div className="mini-ui">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="architecture-layer layer-two">
          <span>02 / ENGINEERING</span>
          <strong>
            {pick(locale, "Logika yang andal.", "Engineered to work.")}
          </strong>
          <div className="code-bars">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="architecture-layer layer-three">
          <span>03 / FOUNDATION</span>
          <strong>{pick(locale, "Siap berkembang.", "Room to grow.")}</strong>
          <div className="data-nodes">
            <i />
            <b />
            <i />
            <b />
            <i />
          </div>
        </div>
      </div>
      <div className="visual-bottom">
        <span>WEB · MOBILE · SYSTEMS</span>
        <span aria-hidden="true">↗︎</span>
      </div>
    </div>
  );
}
export function Home({ locale }: { locale: Locale }) {
  const t = labels[locale];
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />{" "}
            {pick(
              locale,
              "STUDIO SOFTWARE INDEPENDEN",
              "INDEPENDENT SOFTWARE STUDIO",
            )}
          </p>
          <h1>
            {pick(locale, "Dari ide menjadi", "Engineering ideas into")}{" "}
            <span>{pick(locale, "solusi digital", "digital solutions")}</span>
            {locale === "id" ? " yang andal." : "."}
          </h1>
          <p className="hero-description">
            {pick(
              locale,
              "Saya membantu bisnis membangun website profesional, aplikasi operasional, dan software yang dirancang sesuai kebutuhan.",
              "I build professional websites, custom business applications, and scalable software shaped around your business.",
            )}
          </p>
          <div className="actions">
            <Link
              className="button"
              href={"/" + locale + "/contact"}
              data-event="contact_cta"
            >
              {t.cta}
              <span aria-hidden="true">↗︎</span>
            </Link>
            <Link className="text-link" href={"/" + locale + "/work"}>
              {t.explore}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="hero-signature">
            <span className="avatar-mark">AP</span>
            <span>
              <strong>Aries Pujie Prasetio</strong>
              <small>Senior Software Engineer · Jakarta, ID</small>
            </span>
          </div>
        </div>
        <EngineeringVisual locale={locale} />
      </section>
      <section
        className="credibility shell"
        aria-label={pick(
          locale,
          "Pengalaman profesional",
          "Professional experience",
        )}
      >
        <div>
          <strong>~5 {pick(locale, "tahun", "years")}</strong>
          <span>
            {pick(
              locale,
              "Pengalaman rekayasa software",
              "Software engineering experience",
            )}
          </span>
        </div>
        <div>
          <strong>Enterprise</strong>
          <span>
            {pick(
              locale,
              "Web, mobile, dan integrasi sistem",
              "Web, mobile, and system integration",
            )}
          </span>
        </div>
        <div>
          <strong>{pick(locale, "Lintas negara", "Across borders")}</strong>
          <span>
            {pick(
              locale,
              "Penyerahan proyek komersial internasional",
              "International commercial project delivery",
            )}
          </span>
        </div>
        <div className="career-note">
          <span>{pick(locale, "Saat ini", "Currently")}</span>
          <strong>Senior Software Engineer</strong>
          <span>PT Astra International Tbk</span>
        </div>
      </section>
      <section className="section light-section">
        <div className="shell">
          <SectionTitle
            number="01"
            label={pick(locale, "LAYANAN", "WHAT I DO")}
            title={pick(
              locale,
              "Software yang bekerja untuk bisnis Anda.",
              "Software that works for your business.",
            )}
          >
            <Link className="text-link" href={"/" + locale + "/services"}>
              {pick(locale, "Semua layanan", "All services")} ↗︎
            </Link>
          </SectionTitle>
          <div className="service-grid">
            {services(locale)
              .slice(0, 4)
              .map((s, i) => (
                <Link
                  className="service-card"
                  href={"/" + locale + "/services#" + s.slug}
                  key={s.slug}
                  data-event="service_inquiry"
                >
                  <div className="service-top">
                    <span className="service-icon" aria-hidden="true">
                      {s.mark}
                    </span>
                    <span className="service-index">0{i + 1}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <div className="service-bottom">
                    <span>{s.examples}</span>
                    <span aria-hidden="true">↗︎</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
      <section className="section shell">
        <SectionTitle
          number="02"
          label={pick(locale, "KARYA PILIHAN", "SELECTED WORK")}
          title={pick(
            locale,
            "Dari produk mandiri hingga sistem enterprise.",
            "Independent products. Enterprise experience.",
          )}
        >
          <Link href={"/" + locale + "/work"} className="text-link">
            {t.all} ↗︎
          </Link>
        </SectionTitle>
        <ProjectCards locale={locale} limit={3} />
      </section>
      <div className="light-section">
        <Process locale={locale} />
      </div>
      <section className="section shell why-section">
        <div>
          <p className="eyebrow">
            04 / {pick(locale, "DI BALIK SOFTWARE", "BEHIND THE SOFTWARE")}
          </p>
          <h2>
            {pick(
              locale,
              "Satu partner. Perspektif menyeluruh.",
              "One partner. The whole picture.",
            )}
          </h2>
          <p>
            {pick(
              locale,
              "Anda berkomunikasi langsung dengan engineer yang membangun produk Anda. Saya menghubungkan kebutuhan bisnis dengan keputusan teknis yang masuk akal.",
              "You work directly with the engineer building your product. I connect business needs with practical technical decisions.",
            )}
          </p>
          <Link href={"/" + locale + "/about"} className="text-link">
            {pick(locale, "Kenali saya", "Meet the engineer")} ↗︎
          </Link>
        </div>
        <div className="why-list">
          {(locale === "id"
            ? [
                [
                  "Pengalaman enterprise",
                  "Terbiasa bekerja dengan aplikasi, API, dan integrasi dalam lingkungan profesional.",
                ],
                [
                  "Dari antarmuka hingga sistem",
                  "Kemampuan lintas frontend, backend, mobile, dan integrasi.",
                ],
                [
                  "Mudah dipelihara",
                  "Struktur software, dokumentasi, dan lingkup yang jelas untuk langkah berikutnya.",
                ],
              ]
            : [
                [
                  "Enterprise experience",
                  "Experience with applications, APIs, and integrations in professional environments.",
                ],
                [
                  "From interface to infrastructure",
                  "Capabilities across frontend, backend, mobile, and integrations.",
                ],
                [
                  "Built to be maintained",
                  "Clear software structure, documentation, and scope for what comes next.",
                ],
              ]
          ).map(([title, copy], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTA locale={locale} />
    </>
  );
}
