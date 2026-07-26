import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Writing",
  description: "Engineering notes on architecture, backend, mobile, product systems, and building Veritik.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <>
      <PageIntro eyebrow="Writing / Engineering notes" title="Notes from building across systems." description="A future home for practical writing on architecture, backend engineering, React Native, product systems, and lessons from building Veritik." />
      <section className="section shell writing-empty">
        <span className="writing-glyph">Aa</span>
        <div><p className="eyebrow">No published notes yet</p><h2>The first essay is still being shaped.</h2><p>I won’t publish filler. When there is a useful idea backed by real engineering work, it will appear here.</p></div>
      </section>
      <section className="shell topic-list"><p className="eyebrow">Topics in the notebook</p><div>{["Software architecture", "Backend engineering", "React & Next.js", "React Native", "System design", "Building Veritik", "Production engineering"].map((topic) => <span key={topic}>{topic}</span>)}</div></section>
    </>
  );
}
