import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
      <div className="case-product-hero shell">
        <figure>
          <Image
            src="/images/work/veritik/banner-veritik.png"
            alt="Veritik candidate ranking, recruitment pipeline, and comparison interface"
            fill
            priority
            sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1200px) calc(100vw - 48px), 1180px"
          />
          <figcaption>Veritik / Product overview</figcaption>
        </figure>
      </div>
      <article className="case-body shell">
        <aside className="case-nav" aria-label="Case study sections">
          <p className="eyebrow">In this case study</p>
          <a href="#overview">Overview</a><a href="#problem">Context</a><a href="#product">Product</a><a href="#screens">Product views</a>
        </aside>
        <div className="case-content">
          <section id="overview"><p className="eyebrow">01 / Overview</p><h2>A focused product for a complex decision process.</h2><p>Veritik is a personal software product I’m building around recruitment and candidate screening. It brings job setup, candidate information, CV processing, analysis, ranking, comparison, and structured evaluation into one coherent workflow.</p><p>The product is still in development. This case study intentionally avoids unverified claims about usage, outcomes, or model performance.</p></section>
          <section id="problem"><p className="eyebrow">02 / Context</p><h2>Making candidate review easier to structure.</h2><p>Recruitment involves information spread across roles, CVs, assessments, and reviewer judgment. Veritik explores how a single product can organize those inputs and assist the evaluation process without presenting automated analysis as the final decision.</p></section>
          <section id="product"><p className="eyebrow">03 / Core capabilities</p><h2>The product surface.</h2><div className="feature-list">{capabilities.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}</div></section>
          <section id="screens">
            <p className="eyebrow">04 / Product views</p>
            <h2>From screening to structured comparison.</h2>
            <p>Selected product views show the current Veritik direction using demonstration candidate data.</p>
            <div className="product-gallery">
              <figure className="product-shot product-shot-wide">
                <Image src="/images/work/veritik/candidate-ranking.png" alt="Veritik candidate ranking product view" fill sizes="(max-width: 900px) calc(100vw - 32px), 760px" />
                <figcaption><span>01</span> Candidate ranking</figcaption>
              </figure>
              <figure className="product-shot">
                <Image src="/images/work/veritik/recruitment-pipeline.png" alt="Veritik recruitment pipeline product view" fill sizes="(max-width: 900px) calc(100vw - 32px), 370px" />
                <figcaption><span>02</span> Recruitment pipeline</figcaption>
              </figure>
              <figure className="product-shot">
                <Image src="/images/work/veritik/compare-candidate.png" alt="Veritik side-by-side candidate comparison product view" fill sizes="(max-width: 900px) calc(100vw - 32px), 370px" />
                <figcaption><span>03</span> Candidate comparison</figcaption>
              </figure>
              <figure className="product-shot product-shot-wide">
                <Image src="/images/work/veritik/smarter-hiring.png" alt="Veritik AI-assisted candidate scoring product view" fill sizes="(max-width: 900px) calc(100vw - 32px), 760px" />
                <figcaption><span>04</span> AI-assisted screening</figcaption>
              </figure>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
