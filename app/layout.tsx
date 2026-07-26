import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Mono, Manrope } from "next/font/google";
import "@/app/globals.css";
import { profile } from "@/config/profile";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ["500", "600"], display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["300", "400", "500"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: `${profile.name} — ${profile.title}`, template: `%s — ${profile.name}` },
  description: profile.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} — ${profile.title}`,
    description: profile.description,
  },
  twitter: { card: "summary_large_image", title: `${profile.name} — ${profile.title}`, description: profile.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f4f1e9" }, { media: "(prefers-color-scheme: dark)", color: "#11110f" }] };

const themeScript = `
  try {
    const saved = localStorage.getItem('theme');
    const theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
    sameAs: [profile.github, ...(profile.linkedin ? [profile.linkedin] : [])],
    url: profile.siteUrl,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <JsonLd data={personSchema} />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
