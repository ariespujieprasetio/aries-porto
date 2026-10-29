import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
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
  referrer: "strict-origin",
  metadataBase: new URL(site.url),
  title: {
    default: "Aries Pujie Prasetio | ARIES. — Independent Software Studio",
    template: "%s | Aries Pujie Prasetio",
  },
  description:
    "Independent software engineer in Jakarta. Websites, business applications, mobile development, and integrations.",
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
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
