import Link from "next/link";
import { achievements } from "@/data/achievements";
import { capabilities } from "@/data/capabilities";
import { experiences } from "@/data/experience";
import { profile } from "@/config/profile";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { FeaturedProject } from "@/components/featured-project";
import { EnterpriseWork } from "@/components/enterprise-work";

export default function HomePage() {
  return (
    <>
      <section className="identity-hero shell">
        <div className="identity-line">
          <p>{profile.name}</p>
          <span>Portfolio / 2026</span>
        </div>
        <div className="identity-meta">
          <div>
            <span>Role</span>
            <strong>{profile.title}</strong>
          </div>
          <div>
            <span>Based in</span>
            <strong>{profile.location}</strong>
          </div>
          <div>
            <span>Currently</span>
            <strong>Astra International</strong>
          </div>
        </div>
        <h1>
          I build software across
          <br />
          {" "}<em>products, platforms</em>
          <br />
          and systems.
        </h1>
        <div className="identity-footer">
          <p>
            Full-stack engineering across mobile, web, backend, enterprise systems,
            and connected hardware.
          </p>
          <div className="hero-actions">
            <Link href="/work" className="button">
              Selected work <ArrowUpRight className="inline-icon" />
            </Link>
            <Link href="/about" className="text-link">About me</Link>
          </div>
        </div>
      </section>

      <section className="work-stage">
        <div className="shell">
          <header className="work-stage-heading">
            <p className="eyebrow">Selected work</p>
            <h2>One public product.<br />A wider body of systems.</h2>
          </header>
          <FeaturedProject />
          <div className="enterprise-intro">
            <p className="eyebrow">Enterprise engineering</p>
            <p>
              Professional work across customer products, internal platforms, APIs,
              and physical systems—presented without exposing confidential detail.
            </p>
          </div>
          <EnterpriseWork />
          <div className="section-end">
            <Link className="text-link" href="/work">
              Explore the complete work index <ArrowRight className="inline-icon" />
            </Link>
          </div>
        </div>
      </section>

      <section className="career-record shell">
        <header className="career-heading">
          <p className="eyebrow">Experience / 2020—Present</p>
          <h2>Increasing scope.<br /><em>End-to-end ownership.</em></h2>
        </header>
        <div className="career-list">
          {experiences.slice(0, 4).map((item, index) => (
            <article className={item.current ? "current" : undefined} key={item.company}>
              <div className="career-period">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item.period}</p>
              </div>
              <div className="career-role">
                <p>{item.company}</p>
                <h3>{item.role}</h3>
              </div>
              <p className="career-summary">{item.summary}</p>
              <p className="career-stack">{item.technologies?.slice(0, 4).join(" · ")}</p>
            </article>
          ))}
        </div>
        <div className="section-end">
          <Link className="text-link" href="/experience">
            Full career record <ArrowRight className="inline-icon" />
          </Link>
        </div>
      </section>

      <section className="capability-manifesto">
        <div className="shell">
          <header>
            <p className="eyebrow">What I engineer</p>
            <p className="manifesto-line">
              I move between layers to keep the product—and the system behind it—coherent.
            </p>
          </header>
          <div className="capability-editorial">
            {capabilities.map((capability) => (
              <article key={capability.title}>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <span>{capability.technologies.join(" / ")}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="evidence-section shell">
        <div className="recognition-editorial">
          <p className="eyebrow">Selected recognition</p>
          <div>
            {achievements.map((item) => (
              <article key={item.title}>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.organization}</p>
              </article>
            ))}
          </div>
        </div>
        <aside className="journey-teaser">
          <p className="eyebrow">Engineering beyond the browser</p>
          <p>
            My path began in Telecommunication Engineering and hardware research,
            including a real-time radiation monitoring system, before expanding into
            backend, web, mobile, and enterprise software.
          </p>
          <Link className="text-link" href="/about">
            Read my story <ArrowRight className="inline-icon" />
          </Link>
        </aside>
      </section>

      <section className="home-contact shell">
        <p className="eyebrow">Aries Pujie Prasetio / Jakarta</p>
        <div>
          <h2>Useful software.<br /><em>Built with context.</em></h2>
          <p>
            Open to thoughtful conversations about senior engineering roles,
            product collaboration, and selected technical work.
          </p>
          <a className="button" href={`mailto:${profile.email}`}>
            Email Aries <ArrowUpRight className="inline-icon" />
          </a>
        </div>
      </section>
    </>
  );
}
