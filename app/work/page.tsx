import type { Metadata } from "next";
import { ContactCta } from "@/components/contact-cta";
import { EnterpriseWork } from "@/components/enterprise-work";
import { FeaturedProject } from "@/components/featured-project";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected product, enterprise mobile, backend platform, and connected hardware work by Aries Pujie Prasetio.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageIntro eyebrow="Work / Selected systems" title="Work that spans products, platforms, and physical systems." description="A curated view of the engineering dimensions I’ve worked across. Public detail is intentionally limited for enterprise systems; the focus is the scope and nature of the work." />
      <section className="work-page-index shell">
        <FeaturedProject />
        <header className="enterprise-intro">
          <p className="eyebrow">Professional systems</p>
          <p>Enterprise work is presented as an engineering record—not as fictional public case studies.</p>
        </header>
        <EnterpriseWork />
      </section>
      <section className="shell confidentiality-note"><p className="eyebrow">A note on enterprise work</p><p>Some systems shown here support internal operations or customer-facing services at large organizations. Details are presented at an appropriate level and do not disclose confidential implementation information.</p></section>
      <ContactCta />
    </>
  );
}
