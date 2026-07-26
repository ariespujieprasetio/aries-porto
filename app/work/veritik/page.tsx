import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { profile } from "@/config/profile";

export const metadata: Metadata = {
  title: "Veritik — AI Recruitment Platform Case Study",
  description:
    "A product engineering case study of Veritik, an AI-assisted recruitment platform built by Senior Software Engineer Aries Pujie Prasetio.",
  alternates: { canonical: "/work/veritik" },
};

const projectContext = [
  ["Role", "Product design & engineering"],
  ["Type", "Personal product"],
  ["Status", "In development"],
  ["Focus", "Recruitment workflow / AI-assisted evaluation"],
];

const workflow = [
  ["Create a job", "Define the role and the requirements candidates will be reviewed against."],
  ["Add candidates", "Bring candidate profiles and resume information into the recruitment workflow."],
  ["Analyze", "Use structured and AI-assisted processing to make candidate information easier to review."],
  ["Rank", "Surface candidates in relation to the selected job context."],
  ["Compare", "Review relevant candidate information side by side."],
  ["Decide", "Use the organized evidence to support—not replace—human judgment."],
];

const capabilities = [
  "Job creation",
  "Candidate management",
  "Resume processing",
  "AI-assisted analysis",
  "Candidate ranking",
  "Candidate comparison",
  "Recruitment dashboards",
  "Structured evaluation",
];

const productViews = [
  {
    title: "Candidate ranking",
    label: "Evaluation overview",
    copy: "Candidates are presented in the context of a selected role, making the review sequence and relative signals easier to scan.",
    src: "/images/work/veritik/candidate-ranking.png",
    alt: "Veritik candidate ranking interface showing candidates evaluated for a selected job",
  },
  {
    title: "Recruitment pipeline",
    label: "Workflow visibility",
    copy: "The pipeline view brings recruitment progress into one product surface so candidate movement can be followed across stages.",
    src: "/images/work/veritik/recruitment-pipeline.png",
    alt: "Veritik recruitment pipeline interface showing candidates organized across hiring stages",
  },
  {
    title: "Candidate comparison",
    label: "Side-by-side review",
    copy: "Comparison places candidate information next to the same job context, supporting a more deliberate review without treating the product as the decision-maker.",
    src: "/images/work/veritik/compare-candidate.png",
    alt: "Veritik comparison interface showing candidate information side by side",
  },
  {
    title: "AI-assisted screening",
    label: "Decision support",
    copy: "AI-assisted analysis is presented as an input to evaluation. Recruiters remain responsible for interpretation and the final hiring decision.",
    src: "/images/work/veritik/smarter-hiring.png",
    alt: "Veritik AI-assisted screening overview presenting structured candidate evaluation",
  },
];

export default function VeritikPage() {
  return (
    <>
      <header className="case-hero shell">
        <Link href="/work" className="back-link">← Selected work</Link>
        <div className="case-meta">
          <span>Veritik / Product case study</span>
          <span>Personal product · In development</span>
        </div>
        <h1>Veritik</h1>
        <p className="case-product-type">AI-assisted recruitment platform</p>
        <p className="case-lede">
          A product designed to make candidate screening more structured,
          comparable, and easier to evaluate.
        </p>
        <div className="case-tags">
          <span>Personal product</span>
          <span>Product engineering</span>
          <span>AI-assisted workflow</span>
          <span>Full-stack</span>
        </div>
      </header>

      <div className="case-product-hero shell">
        <figure>
          <Image
            src="/images/work/veritik/banner-veritik.png"
            alt="Veritik product overview combining candidate ranking, recruitment pipeline, and candidate comparison"
            fill
            priority
            sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1200px) calc(100vw - 48px), 1180px"
          />
          <figcaption>Veritik / Product overview</figcaption>
        </figure>
      </div>

      <dl className="case-context shell" aria-label="Project context">
        {projectContext.map(([term, detail]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>

      <article className="case-body shell">
        <aside className="case-nav" aria-label="Case study sections">
          <p className="eyebrow">In this case study</p>
          <a href="#overview">Overview</a>
          <a href="#problem">Problem</a>
          <a href="#workflow">Workflow</a>
          <a href="#product">Product views</a>
          <a href="#engineering">Engineering</a>
          <a href="#principle">AI principle</a>
        </aside>

        <div className="case-content">
          <section id="overview">
            <p className="eyebrow">01 / Overview</p>
            <h2>One product surface for a connected review process.</h2>
            <p>
              Veritik is a personal product actively designed and developed around recruitment
              and candidate screening. It connects job setup, candidate information, resume
              processing, analysis, ranking, comparison, and structured evaluation in a
              coherent workflow.
            </p>
          </section>

          <section id="problem">
            <p className="eyebrow">02 / The problem</p>
            <h2>Candidate information is only useful when it can be reviewed in context.</h2>
            <p>
              Recruitment teams often need to evaluate many candidate profiles against the
              same job requirements. The difficulty is not merely storing applications; it is
              turning unstructured resume information into something that can be reviewed
              consistently and compared meaningfully.
            </p>
            <p>
              Veritik explores how a connected product workflow and AI-assisted analysis can
              support that work without removing human interpretation from the process.
            </p>
          </section>

          <section id="workflow">
            <p className="eyebrow">03 / Product workflow</p>
            <h2>Designed around the sequence of evaluation.</h2>
            <div className="workflow-list">
              {workflow.map(([title, copy], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="product" className="case-product-section">
            <p className="eyebrow">04 / Product views</p>
            <h2>The workflow, shown through the product.</h2>
            <p>
              These are real product views using demonstration candidate data. Each visual
              represents a distinct part of the screening and evaluation flow.
            </p>
            <div className="product-stories">
              {productViews.map((view, index) => (
                <article className={index % 2 ? "product-story product-story-reverse" : "product-story"} key={view.title}>
                  <div className="product-story-copy">
                    <p className="eyebrow">{String(index + 1).padStart(2, "0")} / {view.label}</p>
                    <h3>{view.title}</h3>
                    <p>{view.copy}</p>
                  </div>
                  <a href={view.src} target="_blank" rel="noreferrer" aria-label={`Open ${view.title} image at full size`}>
                    <figure>
                      <Image
                        src={view.src}
                        alt={view.alt}
                        fill
                        sizes="(max-width: 900px) calc(100vw - 32px), 760px"
                      />
                      <figcaption>Open full size <ArrowUpRight className="inline-icon" /></figcaption>
                    </figure>
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section id="engineering">
            <p className="eyebrow">05 / Engineering the product</p>
            <h2>Full-stack work shaped by the product workflow.</h2>
            <p>
              Veritik is approached as a product system rather than a collection of isolated
              screens. The engineering work spans the user-facing workflow and the application
              behavior required to connect jobs, candidates, resumes, analysis, ranking, and comparison.
            </p>
            <div className="engineering-themes">
              <article>
                <span>Product structure</span>
                <p>Keep related recruitment tasks connected so context is not lost between features.</p>
              </article>
              <article>
                <span>Information design</span>
                <p>Present dense candidate information in forms that remain reviewable and comparable.</p>
              </article>
              <article>
                <span>AI integration</span>
                <p>Place assisted analysis inside the workflow while keeping its role and limits clear.</p>
              </article>
            </div>
            <div className="capability-index" aria-label="Veritik product capabilities">
              {capabilities.map((capability, index) => (
                <p key={capability}><span>{String(index + 1).padStart(2, "0")}</span>{capability}</p>
              ))}
            </div>
          </section>

          <section id="principle" className="ai-principle">
            <p className="eyebrow">06 / Product principle</p>
            <blockquote>AI as decision support, not decision authority.</blockquote>
            <p>
              Veritik can assist with organizing and analyzing candidate information. People
              remain responsible for interpreting that information and making hiring decisions.
            </p>
          </section>

          <nav className="case-end-nav" aria-label="Case study navigation">
            <Link href="/work">← Back to Work</Link>
            <a href={`mailto:${profile.email}`}>
              Discuss product engineering <ArrowRight className="inline-icon" />
            </a>
          </nav>
        </div>
      </article>
    </>
  );
}
