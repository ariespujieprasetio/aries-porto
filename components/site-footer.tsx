import Link from "next/link";
import { profile } from "@/config/profile";
import { ArrowUpRight } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="eyebrow">Start a conversation</p>
          <h2>Have a system worth building?</h2>
          <a className="footer-email" href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
        <div className="footer-links">
          <Link href="/resume">Resume</Link>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight className="inline-icon" />
          </a>
          {profile.linkedin ? (
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight className="inline-icon" /></a>
          ) : null}
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} Aries Pujie Prasetio</p>
        <p>Designed & engineered in Jakarta</p>
      </div>
    </footer>
  );
}
