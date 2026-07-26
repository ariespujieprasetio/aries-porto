import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export function ContactCta() {
  return (
    <section className="contact-cta shell">
      <p className="eyebrow">Available for the right conversation</p>
      <div>
        <h2>Let’s build software that holds up in the real world.</h2>
        <Link className="text-link" href="/contact">Start a conversation <ArrowRight className="inline-icon" /></Link>
      </div>
    </section>
  );
}
