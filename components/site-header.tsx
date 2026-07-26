"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/config/navigation";
import { Close, Menu } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Aries Pujie Prasetio, home">
          AP<span className="accent">.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname.startsWith(item.href) ? "active" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="nav-contact">Let’s talk</Link>
          <ThemeToggle />
        </nav>
        <div className="mobile-actions">
          <ThemeToggle />
          <button
            className="icon-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <Close className="icon" /> : <Menu className="icon" />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${open ? "open" : ""}`} aria-label="Mobile navigation">
        <div className="shell">
          {[...navigation, { label: "Contact", href: "/contact" }, { label: "Resume", href: "/resume" }].map((item, index) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>{item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
