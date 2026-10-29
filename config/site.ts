export type Locale = "id" | "en";
export const locales: Locale[] = ["id", "en"];
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);
export const pick = (locale: Locale, id: string, en: string) =>
  locale === "id" ? id : en;
export const site = {
  name: "Aries Pujie Prasetio",
  url: "https://www.ariespujieprasetio.my.id",
  email: "dev.ariespp@gmail.com",
  github: "https://github.com/ariespujieprasetio/",
  linkedin: "https://www.linkedin.com/in/ariespujieprasetio/",
  websiteStartingPrice: 2000000,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6282135342145",
};
export const pages = [
  "",
  "services",
  "work",
  "about",
  "experience",
  "contact",
  "resume",
] as const;
export const labels = {
  id: {
    home: "Beranda",
    services: "Layanan",
    work: "Karya",
    about: "Tentang",
    contact: "Kontak",
    experience: "Pengalaman",
    resume: "Resume",
    cta: "Konsultasi proyek",
    explore: "Lihat karya",
    all: "Semua karya",
    skip: "Lewati ke konten",
  },
  en: {
    home: "Home",
    services: "Services",
    work: "Work",
    about: "About",
    contact: "Contact",
    experience: "Experience",
    resume: "Resume",
    cta: "Start a project",
    explore: "Explore my work",
    all: "All work",
    skip: "Skip to content",
  },
};
export function whatsappUrl(locale: Locale) {
  return /^\d{8,15}$/.test(site.whatsapp)
    ? "https://wa.me/" +
        site.whatsapp +
        "?text=" +
        encodeURIComponent(
          pick(
            locale,
            "Halo Aries, saya ingin berdiskusi tentang proyek software.",
            "Hi Aries, I'd like to discuss a software project.",
          ),
        )
    : null;
}
