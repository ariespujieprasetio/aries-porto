import Link from "next/link";
import { type Locale, pick, site } from "@/config/site";
import { projects } from "@/content/projects";
import { CTA, Intro, ProjectVisual } from "./shared";

export function CaseStudy({ locale, slug }: { locale: Locale; slug: string }) {
  const project = projects(locale).find((p) => p.slug === slug)!;
  const sections = [
    {
      id: "context",
      title: pick(locale, "Kebutuhan & konteks", "The context"),
      copy: project.context,
    },
    {
      id: "solution",
      title: pick(locale, "Apa yang dibangun", "What I built"),
      copy: project.solution,
    },
    {
      id: "approach",
      title: pick(
        locale,
        "Pendekatan pengembangan",
        "The engineering approach",
      ),
      copy: project.approach,
    },
  ];
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: pick(locale, "Karya", "Work"),
        item: site.url + "/" + locale + "/work",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: project.name,
        item: site.url + "/" + locale + "/work/" + slug,
      },
    ],
  };
  return (
    <>
      <nav
        className="shell breadcrumb"
        aria-label={pick(locale, "Jejak halaman", "Breadcrumb")}
      >
        <Link href={"/" + locale + "/work"}>
          ← {pick(locale, "Semua karya", "All work")}
        </Link>
        <span aria-current="page">/ {project.name}</span>
      </nav>
      <Intro
        eyebrow={project.category}
        title={project.name}
        description={project.description}
      />
      <div className="shell case-visual">
        <ProjectVisual slug={slug} name={project.name} locale={locale} />
      </div>
      <section
        className="shell case-summary"
        aria-label={pick(locale, "Ringkasan proyek", "Project summary")}
      >
        <div>
          <p className="eyebrow">
            {pick(locale, "PERAN SAYA", "MY CONTRIBUTION")}
          </p>
          <p>{project.responsibility}</p>
        </div>
        <div>
          <p className="eyebrow">{pick(locale, "HASIL", "DELIVERY")}</p>
          <p>{project.outcome}</p>
        </div>
      </section>
      <section className="section shell case-layout">
        <aside>
          <div className="case-sidebar">
            <p className="eyebrow">
              {pick(locale, "DALAM STUDI KASUS INI", "IN THIS CASE STUDY")}
            </p>
            <nav
              aria-label={pick(
                locale,
                "Bagian studi kasus",
                "Case study sections",
              )}
            >
              {sections.map((s) => (
                <a key={s.id} href={"#" + s.id}>
                  {s.title}
                </a>
              ))}
              <a href="#scope">
                {pick(locale, "Fitur & lingkup", "Features & scope")}
              </a>
            </nav>
            <div className="tags">
              {project.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {project.url && (
              <a
                className="text-link"
                href={project.url}
                target="_blank"
                rel="noreferrer"
              >
                {pick(locale, "Kunjungi website", "Visit website")} ↗︎
              </a>
            )}
          </div>
        </aside>
        <div className="case-sections">
          {sections.map((s, i) => (
            <section id={s.id} key={s.id}>
              <p className="eyebrow">0{i + 1}</p>
              <h2>{s.title}</h2>
              <p>{s.copy}</p>
            </section>
          ))}
          <section id="scope">
            <p className="eyebrow">04</p>
            <h2>{pick(locale, "Fitur & lingkup utama", "Features & scope")}</h2>
            <ul className="feature-list">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
          {slug === "veritik" && (
            <section className="engineering-note">
              <p className="eyebrow">
                {pick(locale, "KEPUTUSAN DESAIN", "A DESIGN DECISION")}
              </p>
              <h2>
                {pick(
                  locale,
                  "AI membantu. Manusia memutuskan.",
                  "AI supports. People decide.",
                )}
              </h2>
              <p>
                {pick(
                  locale,
                  "Rekomendasi AI dipisahkan dari status rekrutmen. Validasi keluaran AI, isolasi data workspace, dan pelaporan kegagalan dokumen membantu menjaga evaluasi tetap dapat ditinjau.",
                  "AI recommendations remain separate from recruitment status. Validated AI output, workspace data isolation, and explicit document-processing failures keep the evaluation reviewable.",
                )}
              </p>
            </section>
          )}
        </div>
      </section>
      <CTA locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
