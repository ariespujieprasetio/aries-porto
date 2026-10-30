import Link from "next/link";
import Image from "next/image";
import presentationPhoto from "@/public/images/achievements/inovy-2023-presentation.webp";
import { type Locale, pick } from "@/config/site";
import { capabilities } from "@/data/capabilities";
import { CTA, Intro, SectionTitle } from "./shared";
import { Credentials } from "./credentials";
export function AboutPage({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro
        eyebrow={pick(
          locale,
          "TENTANG / ENGINEER DI BALIK ARIES.",
          "ABOUT / THE ENGINEER BEHIND ARIES.",
        )}
        title={pick(
          locale,
          "Memahami sistem. Membangun yang berarti.",
          "Understand the system. Build what matters.",
        )}
        description={pick(
          locale,
          "Saya Aries Pujie Prasetio, Senior Software Engineer di Jakarta. Saya menggabungkan pengalaman enterprise dengan pengembangan produk mandiri untuk membantu bisnis membangun software yang tepat.",
          "I’m Aries Pujie Prasetio, a Senior Software Engineer in Jakarta. I combine enterprise experience with independent product development to help businesses build useful software.",
        )}
      />
      <section className="section shell story-grid">
        <div className="about-portrait">
          <Image
            src={presentationPhoto}
            alt={pick(locale, "Aries Pujie Prasetio sedang mempresentasikan proyek dalam INOVY Competition 2023", "Aries Pujie Prasetio presenting a project at INOVY Competition 2023")}
            sizes="(max-width: 760px) 92vw, (max-width: 1280px) 40vw, 520px"
          />
        </div>
        <div>
          <p className="eyebrow">
            {pick(locale, "PERJALANAN SAYA", "MY JOURNEY")}
          </p>
          <h2>
            {pick(
              locale,
              "Dari sistem fisik ke produk digital.",
              "From physical systems to digital products.",
            )}
          </h2>
          <p>
            {pick(
              locale,
              "Pendidikan Teknik Telekomunikasi di Telkom University membentuk cara saya memahami keterhubungan sistem. Riset di BATAN membawa saya bekerja dengan sensor, mikrokontroler, firmware, dan aplikasi Android.",
              "Telecommunication Engineering at Telkom University shaped how I understand connected systems. Research at BATAN brought me into sensors, microcontrollers, firmware, and Android applications.",
            )}
          </p>
          <p>
            {pick(
              locale,
              "Dari sana, saya berkembang ke software akuntansi, dashboard, IoT, API, aplikasi web, dan mobile. Kini saya bekerja sebagai Senior Software Engineer di PT Astra International Tbk, sekaligus mengembangkan produk dan layanan software secara independen.",
              "From there, I moved into accounting software, dashboards, IoT, APIs, web, and mobile. Today I work as a Senior Software Engineer at PT Astra International Tbk while independently developing products and providing software services.",
            )}
          </p>
          <Link className="text-link" href={"/" + locale + "/experience"}>
            {pick(locale, "Lihat perjalanan karier", "Explore my career")} ↗︎
          </Link>
        </div>
      </section>
      <section className="light-section section">
        <div className="shell story-grid">
          <div>
            <p className="eyebrow">
              {pick(locale, "FILOSOFI KERJA", "ENGINEERING PHILOSOPHY")}
            </p>
            <h2>
              {pick(
                locale,
                "Software yang dipahami, digunakan, dan dirawat.",
                "Software people can understand, use, and maintain.",
              )}
            </h2>
          </div>
          <div>
            <p className="large-copy">
              {pick(
                locale,
                "Solusi yang baik dimulai dari masalah yang dipahami dengan baik.",
                "Good solutions start with a well-understood problem.",
              )}
            </p>
            <p>
              {pick(
                locale,
                "Saya mengutamakan lingkup yang jelas, komunikasi langsung, dan arsitektur yang sebanding dengan kebutuhan. Pengujian, dokumentasi, dan keterawatan adalah bagian dari hasil kerja.",
                "I value clear scope, direct communication, and architecture proportional to the need. Testing, documentation, and maintainability are part of delivery.",
              )}
            </p>
            <div className="tags">
              {(locale === "id"
                ? ["Kejelasan", "Tanggung jawab", "Keterawatan"]
                : ["Clarity", "Ownership", "Maintainability"]
              ).map((v) => (
                <span key={v}>{v}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section shell">
        <SectionTitle
          number="01"
          label={pick(locale, "KEMAMPUAN", "CAPABILITIES")}
          title={pick(
            locale,
            "Lintas lapisan, satu tujuan.",
            "Across layers, one purpose.",
          )}
        />
        <div className="capability-grid">
          {capabilities.map((c, i) => (
            <article key={c.title}>
              <h3>
                {locale === "id"
                  ? [
                      "Backend & platform",
                      "Antarmuka produk",
                      "Integrasi sistem",
                      "Pengembangan & rilis",
                    ][i]
                  : c.title}
              </h3>
              <p className="tech-line">{c.technologies.join(" · ")}</p>
            </article>
          ))}
        </div>
        <div className="education-block">
          <p className="eyebrow">{pick(locale, "PENDIDIKAN", "EDUCATION")}</p>
          <h3>Telkom University</h3>
          <p>
            {pick(
              locale,
              "Sarjana Teknik Telekomunikasi",
              "Bachelor’s Degree in Telecommunication Engineering",
            )}{" "}
            · 2018–2022
          </p>
        </div>
      </section>
      <section className="section shell">
        <Credentials locale={locale} />
      </section>
      <CTA locale={locale} />
    </>
  );
}
