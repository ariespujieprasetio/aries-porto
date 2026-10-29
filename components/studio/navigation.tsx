"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { type Locale, labels } from "@/config/site";
export function Navigation({ locale }: { locale: Locale }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const t = labels[locale];
  const links = [
    ["", t.home],
    ["services", t.services],
    ["work", t.work],
    ["about", t.about],
    ["contact", t.contact],
  ];
  const other = locale === "id" ? "en" : "id";
  const translated = "/" + other + path.replace(/^\/(id|en)/, "");
  const active = (slug: string) =>
    slug
      ? path === "/" + locale + "/" + slug ||
        path.startsWith("/" + locale + "/" + slug + "/")
      : path === "/" + locale;
  function switchLanguage(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.href =
      translated + window.location.search + window.location.hash;
    setOpen(false);
  }
  return (
    <header
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          button.current?.focus();
        }
      }}
    >
      <div className="shell header-inner">
        <Link
          className="brand"
          href={"/" + locale}
          aria-label={locale === "id" ? "ARIES. Beranda" : "ARIES. Home"}
          onClick={() => setOpen(false)}
        >
          ARIES<span>.</span>
        </Link>
        <nav
          className="desktop-nav"
          aria-label={locale === "id" ? "Navigasi utama" : "Main navigation"}
        >
          {links.map(([slug, label]) => (
            <Link
              key={slug}
              href={"/" + locale + (slug ? "/" + slug : "")}
              aria-current={active(slug) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="locale-switch"
            href={translated}
            hrefLang={other}
            lang={other}
            aria-label={
              other === "en" ? "Switch to English" : "Ganti ke Bahasa Indonesia"
            }
            onClick={switchLanguage}
          >
            <span className={locale === "id" ? "selected" : ""}>ID</span>
            <span>/</span>
            <span className={locale === "en" ? "selected" : ""}>EN</span>
          </a>
          <Link
            href={"/" + locale + "/contact"}
            className="button small header-cta"
            data-event="contact_cta"
          >
            {t.cta} <span aria-hidden="true">↗︎</span>
          </Link>
          <button
            ref={button}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={locale === "id" ? "Menu navigasi" : "Navigation menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        hidden={!open}
        aria-label={locale === "id" ? "Navigasi mobile" : "Mobile navigation"}
      >
        {links.map(([slug, label]) => (
          <Link
            key={slug}
            href={"/" + locale + (slug ? "/" + slug : "")}
            aria-current={active(slug) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
            <span aria-hidden="true">↗︎</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
