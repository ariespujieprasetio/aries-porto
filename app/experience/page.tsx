import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience across Astra International, Astra Property, Global Service Indonesia, BATAN, and Telkom Indonesia.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageIntro eyebrow="Experience / 2020—Present" title="Five years of expanding ownership." description="From research hardware to enterprise product engineering, each role has widened the systems I can own and the teams I can work alongside." />
      <section className="section shell timeline">
        {experiences.map((item, index) => (
          <article className={`timeline-item ${item.current ? "current" : ""}`} key={item.company}>
            <div className="timeline-period"><span>{String(index + 1).padStart(2, "0")}</span><p>{item.period}</p>{item.current ? <b>Current</b> : null}</div>
            <div className="timeline-content">
              <p className="eyebrow">{item.company}</p>
              <h2>{item.role}</h2>
              <p className="timeline-summary">{item.summary}</p>
              {item.highlights.length ? <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul> : null}
              {item.technologies ? <div className="tag-row">{item.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div> : null}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
