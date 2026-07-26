import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { experiences } from "@/data/experience";
import { capabilities } from "@/data/capabilities";
import { achievements } from "@/data/achievements";
import { certifications } from "@/data/certifications";
import { education, languages } from "@/data/education";
import { profile } from "@/config/profile";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = { title: "Resume", description: "Web resume for Aries Pujie Prasetio, Senior Software Engineer.", alternates: { canonical: "/resume" } };

export default function ResumePage() {
  return (
    <>
      <PageIntro eyebrow="Resume / Web edition" title="Senior Software Engineer" description="Five years of professional experience building software across enterprise mobile, backend platforms, web applications, IoT, and engineering research." />
      <div className="shell resume-toolbar"><a className="button" href="/aries-pujie-prasetio-resume.pdf" download>Download resume <ArrowUpRight className="inline-icon" /></a><p>PDF becomes available when added to <code>public/</code>.</p></div>
      <article className="resume shell">
        <header><div><h2>{profile.name}</h2><p>{profile.title} · {profile.location}</p></div><div><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.github}>github.com/ariespujieprasetio</a></div></header>
        <section><p className="eyebrow">Profile</p><p className="resume-summary">Full-stack software engineer with experience delivering end-to-end systems across mobile, backend, web, enterprise software, and IoT. Focused on ownership, maintainability, reliability, performance, and translating business requirements into working technical systems.</p></section>
        <section><p className="eyebrow">Experience</p>{experiences.map((item) => <div className="resume-role" key={item.company}><div><strong>{item.role}</strong><span>{item.company}</span><small>{item.period}</small></div><div><p>{item.summary}</p>{item.highlights.length ? <ul>{item.highlights.map((point) => <li key={point}>{point}</li>)}</ul> : null}</div></div>)}</section>
        <section><p className="eyebrow">Capabilities</p><div className="resume-capabilities">{capabilities.map((item) => <div key={item.title}><strong>{item.title}</strong><p>{item.technologies.join(", ")}</p></div>)}</div></section>
        <section className="resume-columns"><div><p className="eyebrow">Education</p><strong>{education.institution}</strong><p>{education.degree}<br />{education.faculty}<br />{education.period}</p></div><div><p className="eyebrow">Languages</p>{languages.map((item) => <p key={item.language}>{item.language} — {item.proficiency}</p>)}</div></section>
        <section><p className="eyebrow">Recognition</p><div className="resume-columns">{achievements.map((item) => <div key={item.title}><strong>{item.title}</strong><p>{item.organization} · {item.year}</p></div>)}</div></section>
        <section><p className="eyebrow">Certifications</p><div className="certification-list">{certifications.map((item) => <div key={item.name}><strong>{item.name}</strong><span>{item.issuer}{item.year ? ` · ${item.year}` : ""}</span></div>)}</div></section>
      </article>
    </>
  );
}
