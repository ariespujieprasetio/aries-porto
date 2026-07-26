import type { Metadata } from "next";
import { ArrowUpRight } from "@/components/icons";
import { profile } from "@/config/profile";

export const metadata: Metadata = { title: "Contact", description: "Contact Aries Pujie Prasetio for senior software engineering opportunities and product collaboration.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <section className="contact-page shell">
      <p className="eyebrow">Contact / Jakarta, Indonesia</p>
      <h1>Let’s discuss the system,<br /> <em>not just the stack.</em></h1>
      <div className="contact-grid">
        <div><p>I’m open to thoughtful conversations about senior software engineering opportunities, product collaboration, technical challenges, and selected consulting work.</p><p>If there’s meaningful context and a problem worth understanding, email is the best place to start.</p></div>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}><span>Email</span><strong>{profile.email}</strong><ArrowUpRight className="icon" /></a>
          <a href={profile.github} target="_blank" rel="noreferrer"><span>GitHub</span><strong>@ariespujieprasetio</strong><ArrowUpRight className="icon" /></a>
          {profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>Connect professionally</strong><ArrowUpRight className="icon" /></a> : <div className="contact-link-disabled"><span>LinkedIn</span><strong>Profile link coming soon</strong></div>}
        </div>
      </div>
    </section>
  );
}
