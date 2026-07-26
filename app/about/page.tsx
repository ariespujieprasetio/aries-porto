import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { capabilities, practices } from "@/data/capabilities";
import { education, languages } from "@/data/education";

export const metadata: Metadata = {
  title: "About",
  description: "The engineering journey, working principles, and capabilities of Aries Pujie Prasetio.",
  alternates: { canonical: "/about" },
};

const journey = [
  ["2018—2022", "Telecommunication engineering", "Built a foundation in electronics, networks, and the way physical and digital systems interact."],
  ["2021—2022", "Research & connected hardware", "Worked across sensors, embedded processing, real-time communication, and Android at BATAN."],
  ["2022—2025", "Full-stack & IoT systems", "Expanded into backend, web products, operational platforms, and connected industrial systems."],
  ["2025—Now", "Enterprise product engineering", "Moved into broader ownership across APIs, authentication, web, and mobile products in the Astra ecosystem."],
];

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About / Engineering journey" title="I work across layers because products rarely live in just one." description="My career has moved from telecommunication engineering and connected hardware into full-stack product development and enterprise software. That range shapes how I reason about systems today." />
      <section className="section shell narrative-grid">
        <SectionHeading index="01" label="Journey" />
        <div className="journey-list">
          {journey.map(([period, title, copy]) => (
            <article key={title}><p>{period}</p><h2>{title}</h2><span>{copy}</span></article>
          ))}
        </div>
      </section>
      <section className="section section-tint">
        <div className="shell philosophy-grid">
          <SectionHeading index="02" label="How I work" title="Pragmatic engineering, clear ownership." />
          <div>
            <p className="large-copy">I aim for software that is understandable to the next engineer, dependable for the people using it, and adaptable as the business changes.</p>
            <p>That means getting close to the problem, making trade-offs explicit, keeping architecture proportional, and treating reviews, tests, documentation, and collaboration as part of delivery—not work around it.</p>
            <div className="practice-list">{practices.map((practice) => <span key={practice}>{practice}</span>)}</div>
          </div>
        </div>
      </section>
      <section className="section shell">
        <SectionHeading index="03" label="Technical range" title="Capabilities organized around outcomes." />
        <div className="capability-grid">
          {capabilities.map((item) => <article className="capability" key={item.title}><h3>{item.title}</h3><p>{item.description}</p><div className="tech-list">{item.technologies.join(" · ")}</div></article>)}
        </div>
      </section>
      <section className="section shell facts-grid">
        <div><p className="eyebrow">Education</p><h2>{education.institution}</h2><p>{education.degree}<br />{education.faculty}<br />{education.period}</p></div>
        <div><p className="eyebrow">Languages</p>{languages.map((item) => <p className="language-row" key={item.language}><strong>{item.language}</strong><span>{item.proficiency}</span></p>)}</div>
      </section>
    </>
  );
}
