import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { ContactCta } from "@/components/contact-cta";

export const metadata: Metadata = {
  title: "Veritik — AI Recruitment Product",
  description: "A case study of Veritik, an AI-assisted recruitment and candidate screening platform by Aries Pujie Prasetio.",
  alternates: { canonical: "/work/veritik" },
};

const capabilities = ["Job creation", "Candidate management", "CV processing", "AI-assisted analysis", "Candidate ranking", "Candidate comparison", "Recruitment dashboards", "Structured evaluation"];

export default function VeritikPage() {
  return (
    <>
      <header className="case-hero shell">
        <Link href="/work" className="back-link">← Selected work</Link>
        <div className="case-meta"><span>01 / AI Product</span><span>Personal product · In development</span></div>
        <h1>Veritik</h1>
        <p>An AI-assisted recruitment platform designed to bring structure and clarity to candidate screening.</p>
        <div className="case-tags"><span>Product engineering</span><span>Recruitment workflow</span><span>AI-assisted analysis</span></div>
      </header>
      <div className="case-visual" aria-label="Abstract product visual for Veritik">
        <div className="case-visual-inner shell">
          <span>VERITIK / PRODUCT SYSTEM</span>
          <div className="visual-mark">V<span>.</span></div>
          <p>Evidence over instinct.</p>
        </div>
      </div>
      <article className="case-body shell">
        <aside className="case-nav" aria-label="Case study sections">
          <p className="eyebrow">In this case study</p>
          <a href="#overview">Overview</a><a href="#problem">Context</a><a href="#product">Product</a><a href="#engineering">Engineering</a><a href="#screens">Screenshots</a><a href="#reflection">Reflection</a>
        </aside>
        <div className="case-content">
          <section id="overview"><p className="eyebrow">01 / Overview</p><h2>A focused product for a complex decision process.</h2><p>Veritik is a personal software product I’m building around recruitment and candidate screening. It brings job setup, candidate information, CV processing, analysis, ranking, comparison, and structured evaluation into one coherent workflow.</p><p>The product is still in development. This case study intentionally avoids unverified claims about usage, outcomes, or model performance.</p></section>
          <section id="problem"><p className="eyebrow">02 / Context</p><h2>Making candidate review easier to structure.</h2><p>Recruitment involves information spread across roles, CVs, assessments, and reviewer judgment. Veritik explores how a single product can organize those inputs and assist the evaluation process without presenting automated analysis as the final decision.</p></section>
          <section id="product"><p className="eyebrow">03 / Core capabilities</p><h2>The product surface.</h2><div className="feature-list">{capabilities.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}</div></section>
          <section id="engineering"><p className="eyebrow">04 / Engineering</p><h2>Technical decisions will follow evidence.</h2><p>The product architecture and infrastructure details are intentionally not documented here until they can be described accurately. The case study is prepared to capture system boundaries, data flow, AI integration decisions, privacy considerations, and trade-offs as implementation matures.</p><div className="decision-placeholder"><span>CASE STUDY NOTE</span><p>Architecture, stack, and key technical decisions will be added from implementation evidence—not inferred for presentation.</p></div></section>
          <section id="screens"><p className="eyebrow">05 / Screenshots</p><h2>Product walkthrough coming next.</h2><p>The layout below is ready for real Veritik product captures. No fictional UI has been created to fill the space.</p><div className="screenshot-grid"><div><span>01</span><p>Product overview</p></div><div><span>02</span><p>Candidate workflow</p></div><div><span>03</span><p>Analysis & comparison</p></div></div></section>
          <section id="reflection"><p className="eyebrow">06 / Challenges & lessons</p><h2>A living case study.</h2><p>Challenges, constraints, and lessons will be documented as the product develops and decisions can be supported by real implementation work.</p><Link href="/contact" className="text-link">Discuss the product <ArrowRight className="inline-icon" /></Link></section>
        </div>
      </article>
      <ContactCta />
    </>
  );
}
