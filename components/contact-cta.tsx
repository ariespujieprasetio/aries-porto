import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export function ContactCta() {
  return (
    <section className="contact-cta shell">
      <p className="eyebrow">Software / Products / Collaboration</p>
      <div>
        <h2>A good system starts with a clear conversation.</h2>
        <Link className="text-link" href="/contact">Get in touch <ArrowRight className="inline-icon" /></Link>
      </div>
    </section>
  );
}
