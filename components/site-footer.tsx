import Link from "next/link";
import { profile } from "@/config/profile";
import { ArrowUpRight } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="eyebrow">Jakarta / Available for the right conversation</p>
          <h2>Let’s build<br /><em>something useful.</em></h2>
          <p className="footer-intro">
            Open to conversations around software engineering, products, and thoughtful collaboration.
          </p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>
            Email <ArrowUpRight className="inline-icon" />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight className="inline-icon" />
          </a>
          {profile.linkedin ? (
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight className="inline-icon" /></a>
          ) : null}
          <Link href="/contact">Contact <ArrowUpRight className="inline-icon" /></Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} Aries Pujie Prasetio</p>
        <p>Designed & engineered in Jakarta</p>
      </div>
    </footer>
  );
}
