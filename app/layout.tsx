import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import localFont from "next/font/local";
const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "400 800",
});
import "@/app/globals.css";
import { site } from "@/config/site";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ARIES. — Independent Software Studio",
    template: "%s | ARIES.",
  },
  description:
    "Independent software engineer in Jakarta. Websites, business applications, mobile development, and integrations.",
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#0b1020" };
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale =
    (await headers()).get("x-studio-locale") === "en" ? "en" : "id";
  return (
    <html lang={locale}>
      <body className={manrope.variable}>
        {children}
        {process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" && (
          <Script
            src="/_vercel/insights/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
