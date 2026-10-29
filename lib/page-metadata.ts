import { type Locale, labels } from "@/config/site";
import { metadata } from "@/lib/seo";
const descriptions = {
  id: {
    services:
      "Jasa pembuatan website UMKM, aplikasi custom, mobile, integrasi API, dan maintenance. Penawaran disesuaikan dengan lingkup proyek.",
    work: "Karya Aries: Velutara, Veritik, sistem enterprise, dan riset IoT. Studi kasus pengembangan produk dan software.",
    about:
      "Kenali Aries Pujie Prasetio, Senior Software Engineer di Jakarta dengan pengalaman enterprise dan produk mandiri.",
    experience:
      "Perjalanan profesional Aries di Astra International, Astra Property, Global Service Indonesia, BATAN, dan Telkom.",
    contact:
      "Diskusikan website, aplikasi, atau integrasi bisnis Anda dengan Aries. Sampaikan kebutuhan proyek melalui formulir atau email.",
    resume:
      "Resume Aries Pujie Prasetio: pengalaman, keahlian teknis, pendidikan, dan sertifikasi. Cetak atau simpan sebagai PDF.",
  },
  en: {
    services:
      "Business websites, custom applications, mobile development, API integration, and maintenance. Quotations are tailored to your scope.",
    work: "Selected work by Aries: Velutara, Veritik, enterprise systems, and IoT research. Product and software engineering case studies.",
    about:
      "Meet Aries Pujie Prasetio, a Senior Software Engineer in Jakarta with enterprise experience and independent products.",
    experience:
      "Aries’s career across Astra International, Astra Property, Global Service Indonesia, BATAN, and Telkom.",
    contact:
      "Discuss your website, application, or business integration with Aries. Share your project needs through the inquiry form or email.",
    resume:
      "Aries Pujie Prasetio’s resume: experience, technical capabilities, education, and credentials. Print or save as PDF.",
  },
};

export function pageMetadata(
  locale: Locale,
  page: keyof typeof descriptions.en,
) {
  return metadata(
    locale,
    page,
    labels[locale][page],
    descriptions[locale][page],
  );
}
