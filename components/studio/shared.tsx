import Link from "next/link";
import { type Locale, labels, pick, site } from "@/config/site";
import { projects } from "@/content/projects";
export function Intro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-intro shell">
      <p className="eyebrow">
        <span className="tiny-line" />
        {eyebrow}
      </p>
      <h1>{title}</h1>
      <p className="intro-description">{description}</p>
    </header>
  );
}
export function SectionTitle({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          {number} / {label}
        </p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
export function CTA({ locale }: { locale: Locale }) {
  return (
    <section className="cta-section">
      <div className="shell cta-inner">
        <div>
          <p className="eyebrow">
            {pick(locale, "LANGKAH BERIKUTNYA", "THE NEXT STEP")}
          </p>
          <h2>
            {pick(locale, "Punya ide?", "Have something")}
            <br />
            {pick(locale, "Mari wujudkan.", "in mind?")}{" "}
            <span className="accent">↗︎</span>
          </h2>
          <p>
            {pick(
              locale,
              "Ceritakan kebutuhan bisnis Anda. Kita mulai dari percakapan yang jelas.",
              "Tell me what your business needs. Let’s start with a clear conversation.",
            )}
          </p>
          <div className="actions">
            <Link
              className="button"
              href={"/" + locale + "/contact"}
              data-event="contact_cta"
            >
              {labels[locale].cta} <span aria-hidden="true">↗︎</span>
            </Link>
            <Link className="text-link" href={"/" + locale + "/services"}>
              {pick(locale, "Jelajahi layanan", "Explore services")}{" "}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <aside className="project-start-note">
          <p className="eyebrow">
            {pick(locale, "UNTUK MEMULAI", "A USEFUL FIRST MESSAGE")}
          </p>
          <h3>
            {pick(
              locale,
              "Tiga hal yang bisa Anda ceritakan.",
              "Three things you can share.",
            )}
          </h3>
          <ol>
            <li>
              {pick(
                locale,
                "Tujuan atau masalah bisnis Anda",
                "Your business goal or challenge",
              )}
            </li>
            <li>
              {pick(
                locale,
                "Proses atau aplikasi yang digunakan saat ini",
                "Your current process or tools",
              )}
            </li>
            <li>
              {pick(
                locale,
                "Prioritas, anggaran, atau target waktu",
                "Your priorities, budget, or timing",
              )}
            </li>
          </ol>
          <p>
            {pick(
              locale,
              "Belum tahu semuanya? Kita bisa membahasnya bersama.",
              "Still working it out? We can discuss it together.",
            )}
          </p>
        </aside>
      </div>
    </section>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  const t = labels[locale];
  return (
    <footer className="site-footer shell">
      <div className="footer-top">
        <div>
          <Link href={"/" + locale} className="brand">
            ARIES<span>.</span>
          </Link>
          <p>
            Aries Pujie Prasetio
            <br />
            {pick(
              locale,
              "Software engineer independen.",
              "Independent software engineer.",
            )}
            <br />
            Jakarta, Indonesia.
          </p>
        </div>
        <div className="footer-links">
          <p className="eyebrow">{pick(locale, "JELAJAHI", "EXPLORE")}</p>
          {(
            [
              "services",
              "work",
              "about",
              "experience",
              "resume",
              "contact",
            ] as const
          ).map((slug) => (
            <Link key={slug} href={"/" + locale + "/" + slug}>
              {t[slug]}
            </Link>
          ))}
        </div>
        <div className="footer-links">
          <p className="eyebrow">{pick(locale, "TERHUBUNG", "CONNECT")}</p>
          <a href={"mailto:" + site.email}>{site.email}</a>
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub ↗︎
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗︎
          </a>
          <a href={site.url}>ariespujieprasetio.my.id</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} ARIES. ·{" "}
          {pick(
            locale,
            "Dirancang dengan tujuan. Dibangun dengan perhatian.",
            "Designed with purpose. Built with care.",
          )}
        </span>
        <span>
          {pick(
            locale,
            "Studio independen. Tidak berafiliasi dengan pemberi kerja.",
            "Independent studio. Not affiliated with employers.",
          )}
        </span>
      </div>
    </footer>
  );
}
export function ProjectVisual({
  slug,
  name,
  locale,
}: {
  slug: string;
  name: string;
  locale: Locale;
}) {
  return (
    <div
      role="img"
      className={"project-art " + slug}
      aria-label={
        pick(
          locale,
          "Ilustrasi identitas proyek ",
          "Illustrative project identity for ",
        ) + name
      }
    >
      <div className="art-grid" aria-hidden="true" />
      <span className="art-top">
        {slug === "velutara"
          ? "EXPLORE / PLAN / DISCOVER"
          : slug === "veritik"
            ? "PEOPLE / CONTEXT / CLARITY"
            : "SYSTEMS / CONNECTIONS / SOFTWARE"}
      </span>
      {slug === "velutara" && (
        <svg className="travel-path" viewBox="0 0 600 300" aria-hidden="true">
          <path
            d="M-20 250 C110 230 85 30 220 80 S360 300 620 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="5 8"
          />
          <circle cx="220" cy="80" r="6" fill="currentColor" />
          <circle cx="465" cy="160" r="5" fill="currentColor" />
        </svg>
      )}
      <div className="art-center">
        <strong>{name}</strong>
        <div className="concept-flow" aria-hidden="true">
          {(slug === "velutara"
            ? locale === "id"
              ? ["Ide perjalanan", "Rencana", "Eksplorasi"]
              : ["Travel idea", "Plan", "Explore"]
            : slug === "veritik"
              ? locale === "id"
                ? ["Resume", "Evaluasi", "Perbandingan"]
                : ["Resumes", "Evaluation", "Comparison"]
              : slug === "gotjob"
                ? locale === "id"
                  ? ["Lowongan", "Kandidat", "CMS"]
                  : ["Jobs", "Candidates", "CMS"]
              : slug === "heart"
                ? locale === "id"
                  ? ["Absensi", "Layanan", "Odoo"]
                  : ["Attendance", "Services", "Odoo"]
              : slug === "astra-referral"
                ? locale === "id"
                  ? ["Referral", "Progres", "Klaim"]
                  : ["Referral", "Progress", "Claims"]
              : slug === "motorkux"
                ? ["Storefront", "Next.js", "CMS"]
              : slug === "astra-property-sales"
                ? locale === "id"
                  ? ["Leads", "Penjualan", "Handover"]
                  : ["Leads", "Sales", "Handover"]
              : slug === "cermat"
                ? locale === "id"
                  ? ["Keuangan", "Aset", "Analisis"]
                  : ["Finance", "Assets", "Analysis"]
              : slug === "odoo-helpdesk"
                ? ["Odoo 15", "Helpdesk", "Support"]
              : slug === "realtime-dashboard"
                ? ["Odoo", "NestJS", "ReactJS"]
              : slug === "hotel-larasati"
                ? locale === "id"
                  ? ["Staf", "Workspace", "Operasional"]
                  : ["Staff", "Workspace", "Operations"]
              : slug === "warungku"
                ? locale === "id"
                  ? ["Kasir", "Stok", "Ringkasan"]
                  : ["POS", "Stock", "Summary"]
              : slug === "enterprise"
                ? ["Web", "API", "Mobile"]
                : locale === "id"
                  ? ["Sensor", "Firmware", "Android"]
                  : ["Sensors", "Firmware", "Android"]
          ).map((step, i) => (
            <span key={step}>
              <small>0{i + 1}</small>
              {step}
            </span>
          ))}
        </div>
      </div>
      <span className="art-caption">
        {pick(
          locale,
          "Ilustrasi alur · bukan tangkapan layar produk",
          "Illustrative workflow · not a product screenshot",
        )}
      </span>
      <span className="art-arrow" aria-hidden="true">
        ↗︎
      </span>
    </div>
  );
}
export function ProjectCards({
  locale,
  limit,
}: {
  locale: Locale;
  limit?: number;
}) {
  return (
    <div className="project-grid">
      {projects(locale)
        .slice(0, limit)
        .map((project, i) => (
          <article className="project-card" key={project.slug}>
            <Link
              href={"/" + locale + "/work/" + project.slug}
              aria-label={
                pick(locale, "Baca studi kasus ", "Read case study: ") +
                project.name
              }
            >
              <ProjectVisual
                slug={project.slug}
                name={project.name}
                locale={locale}
              />
            </Link>
            <div className="project-info">
              <p className="eyebrow">
                0{i + 1} / {project.category}
              </p>
              <h3>
                <Link href={"/" + locale + "/work/" + project.slug}>
                  {project.name}
                  <span aria-hidden="true">↗︎</span>
                </Link>
              </h3>
              <p>{project.description}</p>
              {project.url && (
                <a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.urlLabel ?? pick(locale, "Kunjungi website", "Visit website")} {new URL(project.url).hostname}
                </a>
              )}
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
    </div>
  );
}
