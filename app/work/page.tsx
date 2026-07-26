import type { Metadata } from "next";
import { ContactCta } from "@/components/contact-cta";
import { PageIntro } from "@/components/page-intro";
import { ProjectList } from "@/components/project-list";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected product, enterprise mobile, backend platform, and connected hardware work by Aries Pujie Prasetio.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageIntro eyebrow="Work / Selected systems" title="Work that spans products, platforms, and physical systems." description="A curated view of the engineering dimensions I’ve worked across. Public detail is intentionally limited for enterprise systems; the focus is the scope and nature of the work." />
      <section className="section shell"><ProjectList /></section>
      <section className="shell confidentiality-note"><p className="eyebrow">A note on enterprise work</p><p>Some systems shown here support internal operations or customer-facing services at large organizations. Details are presented at an appropriate level and do not disclose confidential implementation information.</p></section>
      <ContactCta />
    </>
  );
}
