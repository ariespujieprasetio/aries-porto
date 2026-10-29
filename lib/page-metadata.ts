import { type Locale, pages } from "@/config/site";
import { metadata } from "@/lib/seo";

type Page = (typeof pages)[number];
const content: Record<
  Locale,
  Record<Page, { title: string; description: string }>
> = {
  id: {
    "": {
      title: "Aries Pujie Prasetio | Software Engineer & Software Studio",
      description:
        "Portofolio resmi Aries Pujie Prasetio, Software Engineer di Jakarta. Jasa pengembangan website, aplikasi bisnis, mobile apps, dan software custom.",
    },
    services: {
      title: "Jasa Website & Custom Software | Aries Pujie Prasetio",
      description:
        "Jasa website UMKM, aplikasi web custom, mobile, dan integrasi API oleh Aries Pujie Prasetio di Jakarta. Lingkup dan biaya disepakati sebelum pengerjaan.",
    },
    work: {
      title: "Portofolio Software Development | Aries Pujie Prasetio",
      description:
        "Portofolio Aries Pujie Prasetio: Velutara, Veritik, sistem enterprise, dan riset IoT. Pelajari konteks, kontribusi, dan pendekatan pengembangan setiap proyek.",
    },
    about: {
      title: "Tentang Aries Pujie Prasetio | Software Engineer",
      description:
        "Kenali Aries Pujie Prasetio, Software Engineer independen di Jakarta dengan pengalaman aplikasi enterprise, pengembangan web, mobile, dan produk mandiri.",
    },
    experience: {
      title: "Pengalaman Profesional | Aries Pujie Prasetio",
      description:
        "Pengalaman profesional Aries Pujie Prasetio di Astra International, Astra Property, Global Service Indonesia, BATAN, dan Telkom.",
    },
    contact: {
      title: "Konsultasi Proyek Software | Aries Pujie Prasetio",
      description:
        "Diskusikan kebutuhan website, aplikasi web, mobile, atau integrasi bisnis dengan Aries Pujie Prasetio melalui formulir proyek, email, atau WhatsApp.",
    },
    resume: {
      title: "Resume Software Engineer | Aries Pujie Prasetio",
      description:
        "Resume Aries Pujie Prasetio: pengalaman profesional, keahlian teknis, pendidikan, dan sertifikasi. Cetak atau simpan sebagai PDF.",
    },
  },
  en: {
    "": {
      title: "Aries Pujie Prasetio | Software Engineer & Software Studio",
      description:
        "Official portfolio of Aries Pujie Prasetio, a software engineer in Jakarta providing web development, mobile applications, and custom software solutions.",
    },
    services: {
      title: "Web & Custom Software Development | Aries Pujie Prasetio",
      description:
        "Website, web application, mobile, and API development by Aries Pujie Prasetio in Jakarta, Indonesia. Scope and costs are agreed before development.",
    },
    work: {
      title: "Software Development Portfolio | Aries Pujie Prasetio",
      description:
        "Explore Aries Pujie Prasetio's work: Velutara, Veritik, enterprise systems, and IoT research. Project context, contributions, and engineering decisions.",
    },
    about: {
      title: "About Aries Pujie Prasetio | Software Engineer",
      description:
        "Meet Aries Pujie Prasetio, an independent software engineer in Jakarta with experience in enterprise applications, web, mobile, and independent products.",
    },
    experience: {
      title: "Professional Experience | Aries Pujie Prasetio",
      description:
        "Aries Pujie Prasetio's engineering experience at Astra International, Astra Property, Global Service Indonesia, BATAN, and Telkom.",
    },
    contact: {
      title: "Discuss Your Software Project | Aries Pujie Prasetio",
      description:
        "Discuss your website, web application, mobile app, or business integration with Aries Pujie Prasetio through the project form, email, or WhatsApp.",
    },
    resume: {
      title: "Software Engineer Resume | Aries Pujie Prasetio",
      description:
        "Aries Pujie Prasetio's resume: professional experience, technical skills, education, and credentials. Print or save as PDF.",
    },
  },
};

export function pageMetadata(locale: Locale, page: Page) {
  const { title, description } = content[locale][page];
  return metadata(locale, page, title, description);
}
