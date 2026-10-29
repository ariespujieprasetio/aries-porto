import { type Locale, pick, site } from "@/config/site";
export function services(locale: Locale) {
  return [
    {
      slug: "websites",
      mark: "\u2197",
      title: pick(locale, "Website bisnis", "Business websites"),
      description: pick(
        locale,
        "Bangun kepercayaan sejak kunjungan pertama. Website yang menjelaskan bisnis Anda dan memudahkan calon pelanggan menghubungi Anda.",
        "Build trust from the first visit. A website that explains your business and makes it easy for potential customers to reach you.",
      ),
      examples: pick(
        locale,
        "Company profile \u00b7 Landing page \u00b7 Katalog produk",
        "Company profiles \u00b7 Landing pages \u00b7 Product catalogs",
      ),
      features: pick(
        locale,
        "Desain responsif, formulir kontak, dasar SEO, serta pilihan CMS, WhatsApp, dan integrasi analitik sesuai kebutuhan.",
        "Responsive design, contact forms, SEO foundations, and optional CMS, WhatsApp, and analytics integrations.",
      ),
      tech: "Next.js \u00b7 React \u00b7 CMS",
      price:
        pick(locale, "Mulai dari ", "Starting from ") +
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(site.websiteStartingPrice),
    },
    {
      slug: "web-applications",
      mark: "\u25a6",
      title: pick(locale, "Aplikasi web custom", "Custom web applications"),
      description: pick(
        locale,
        "Kurangi pekerjaan berulang dengan aplikasi yang mengikuti proses bisnis Anda, dari operasional harian hingga pelaporan.",
        "Reduce repetitive work with applications shaped around your business, from daily operations to reporting.",
      ),
      examples: pick(
        locale,
        "Inventori \u00b7 Booking \u00b7 Dashboard \u00b7 Portal internal",
        "Inventory \u00b7 Booking \u00b7 Dashboards \u00b7 Internal portals",
      ),
      features: pick(
        locale,
        "Alur kerja sesuai kebutuhan, pengelolaan akses, data terpusat, serta integrasi dengan sistem yang sudah digunakan.",
        "Purpose-built workflows, access management, centralized data, and connections to your existing systems.",
      ),
      tech: "Laravel \u00b7 React \u00b7 Go \u00b7 PostgreSQL",
      price: pick(locale, "Penawaran sesuai lingkup", "Scoped quotation"),
    },
    {
      slug: "mobile",
      mark: "\u25af",
      title: pick(locale, "Aplikasi mobile", "Mobile applications"),
      description: pick(
        locale,
        "Hadirkan layanan Anda lebih dekat dengan pelanggan dan tim melalui aplikasi Android dan iOS.",
        "Bring your services closer to customers and teams with Android and iOS applications.",
      ),
      examples: pick(
        locale,
        "Aplikasi pelanggan \u00b7 Aplikasi karyawan \u00b7 Produk digital",
        "Customer apps \u00b7 Employee apps \u00b7 Digital products",
      ),
      features: pick(
        locale,
        "Pengembangan lintas platform, integrasi API, pengujian perangkat, serta persiapan rilis sesuai lingkup yang disepakati.",
        "Cross-platform development, API integration, device testing, and release preparation within an agreed scope.",
      ),
      tech: "React Native \u00b7 REST APIs",
      price: pick(locale, "Penawaran sesuai lingkup", "Scoped quotation"),
    },
    {
      slug: "integrations",
      mark: "\u21c4",
      title: pick(locale, "Integrasi & otomasi", "Integration & automation"),
      description: pick(
        locale,
        "Hubungkan aplikasi dan data agar tim tidak perlu memindahkan informasi secara manual.",
        "Connect your applications and data so your team can spend less time moving information manually.",
      ),
      examples: pick(
        locale,
        "Integrasi API \u00b7 Sinkronisasi data \u00b7 Otomasi alur kerja",
        "API integrations \u00b7 Data synchronization \u00b7 Workflow automation",
      ),
      features: pick(
        locale,
        "Pemetaan alur data, pengembangan API, penanganan kegagalan, dan dokumentasi integrasi.",
        "Data-flow mapping, API development, failure handling, and integration documentation.",
      ),
      tech: "REST \u00b7 GraphQL \u00b7 gRPC \u00b7 Node.js",
      price: pick(locale, "Penawaran sesuai lingkup", "Scoped quotation"),
    },
    {
      slug: "maintenance",
      mark: "+",
      title: pick(locale, "Maintenance & dukungan", "Maintenance & support"),
      description: pick(
        locale,
        "Jaga aplikasi tetap relevan dengan perbaikan yang terarah dan pengembangan fitur lanjutan.",
        "Keep your applications useful through focused improvements and ongoing feature development.",
      ),
      examples: pick(
        locale,
        "Perbaikan bug \u00b7 Optimasi \u00b7 Pembaruan aplikasi",
        "Bug fixes \u00b7 Optimization \u00b7 Application updates",
      ),
      features: pick(
        locale,
        "Audit awal, prioritas perbaikan bersama, pengujian, dan catatan perubahan yang jelas.",
        "An initial review, agreed priorities, testing, and clear release notes.",
      ),
      tech: pick(
        locale,
        "Disesuaikan dengan stack Anda",
        "Adapted to your stack",
      ),
      price: pick(
        locale,
        "Retainer bulanan atau per proyek",
        "Monthly retainer or project quotation",
      ),
    },
  ];
}
