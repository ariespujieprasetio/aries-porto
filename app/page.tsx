import Link from "next/link";
import { achievements } from "@/data/achievements";
import { capabilities } from "@/data/capabilities";
import { experiences } from "@/data/experience";
import { profile } from "@/config/profile";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { ContactCta } from "@/components/contact-cta";
import { ProjectList } from "@/components/project-list";
import { SectionHeading } from "@/components/section-heading";

export default function HomePage() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-status">
          <span className="status-dot" />
          <span>Senior Software Engineer · Jakarta</span>
        </div>
        <h1>
          Engineering reliable products,
          <br />
          {" "}<em>from interface to infrastructure.</em>
        </h1>
        <div className="hero-bottom">
          <p>
            I’m <strong>{profile.name}</strong>, a full-stack engineer with five years of experience
            building enterprise software across mobile, web, backend, and connected systems.
          </p>
          <div className="hero-current">
            <span>Currently</span>
            <strong>PT Astra International Tbk</strong>
            <span>June 2026 — Present</span>
          </div>
        </div>
        <div className="hero-actions">
          <Link href="/work" className="button">Explore selected work <ArrowRight className="inline-icon" /></Link>
          <Link href="/about" className="text-link">More about me <ArrowUpRight className="inline-icon" /></Link>
        </div>
      </section>

      <section className="section shell">
        <SectionHeading index="01" label="Selected work" title="A range of systems, one engineering mindset." />
        <ProjectList limit={3} />
        <div className="section-end"><Link className="text-link" href="/work">View all work <ArrowRight className="inline-icon" /></Link></div>
      </section>

      <section className="section shell">
        <SectionHeading index="02" label="Experience" title="Building across the full product surface." />
        <div className="home-experience">
          {experiences.slice(0, 3).map((item) => (
            <article key={item.company} className="home-role">
              <p className="role-period">{item.period}</p>
              <div>
                <p className="role-company">{item.company}</p>
                <h3>{item.role}</h3>
              </div>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
        <div className="section-end"><Link className="text-link" href="/experience">Full experience <ArrowRight className="inline-icon" /></Link></div>
      </section>

      <section className="section section-tint">
        <div className="shell">
          <SectionHeading index="03" label="Capabilities" title="Breadth without losing depth." />
          <div className="capability-grid">
            {capabilities.map((capability, index) => (
              <article key={capability.title} className="capability">
                <span className="capability-number">0{index + 1}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <div className="tech-list">{capability.technologies.join(" · ")}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell achievements-home">
        <SectionHeading index="04" label="Recognition" title="Ideas carried beyond implementation." />
        <div className="achievement-list">
          {achievements.map((item) => (
            <article key={item.title}>
              <span>{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.organization}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell about-preview">
        <p className="eyebrow">05 / Engineering journey</p>
        <div>
          <p className="large-copy">
            My path into software began with telecommunication engineering and a radiation
            monitoring system—an early lesson that reliable products are shaped by the whole
            system, not one layer.
          </p>
          <Link className="text-link" href="/about">Read my story <ArrowRight className="inline-icon" /></Link>
        </div>
      </section>

      <section className="section shell writing-preview">
        <SectionHeading index="06" label="Engineering notes" title="Writing, soon." />
        <div className="empty-row">
          <p>Notes on architecture, product engineering, and lessons from building across stacks.</p>
          <Link className="text-link" href="/writing">Visit writing <ArrowRight className="inline-icon" /></Link>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
