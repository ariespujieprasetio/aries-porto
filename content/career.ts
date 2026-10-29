import { type Locale, pick } from "@/config/site";
export function career(locale: Locale) {
  return [
    {
      company: "PT Astra International Tbk",
      role: "Senior Software Engineer",
      period: pick(
        locale,
        "Juni 2026 \u2014 Sekarang",
        "June 2026 \u2014 Present",
      ),
      copy: pick(
        locale,
        "Mengembangkan fitur React Native untuk MotorkuX dan Digiroom, mengintegrasikan layanan enterprise, serta berkontribusi pada aplikasi React dan Next.js dalam siklus pengembangan software.",
        "Developing React Native features for MotorkuX and Digiroom, integrating enterprise services, and contributing to React and Next.js applications across the software development lifecycle.",
      ),
      tech: "React Native \u2014 React \u2014 Next.js \u2014 REST APIs",
    },
    {
      company: "PT Astra Land Indonesia (Astra Property)",
      role: "Software Engineer",
      period: pick(
        locale,
        "Maret 2025 \u2014 Mei 2026",
        "March 2025 \u2014 May 2026",
      ),
      copy: pick(
        locale,
        "Membangun dan memelihara REST API terpusat dengan Laravel, mengembangkan aplikasi React Native, serta mengelola autentikasi Java Spring Boot untuk sistem internal dan pelanggan.",
        "Built and maintained central Laravel REST APIs, worked on React Native applications, and enhanced Java Spring Boot authentication for internal and customer-facing systems.",
      ),
      tech: "Laravel \u2014 React Native \u2014 Java Spring Boot",
    },
    {
      company: "PT Global Service Indonesia",
      role: "Software Engineer",
      period: pick(
        locale,
        "November 2022 \u2014 Maret 2025",
        "November 2022 \u2014 March 2025",
      ),
      copy: pick(
        locale,
        "Mengembangkan software akuntansi, dashboard real-time, portal lowongan kerja, aplikasi internal, integrasi sistem, dan solusi IoT Smart Forklift.",
        "Developed accounting software, real-time dashboards, a job portal, internal applications, system integrations, and IoT Smart Forklift solutions.",
      ),
      tech: "Go \u2014 Laravel \u2014 React \u2014 NestJS \u2014 Python \u2014 IoT",
    },
    {
      company: "BATAN",
      role: "Physics Techno Research",
      period: pick(
        locale,
        "Juli 2021 \u2014 September 2022",
        "July 2021 \u2014 September 2022",
      ),
      copy: pick(
        locale,
        "Mengembangkan sistem pemantauan radiasi berbasis mikrokontroler dengan integrasi sensor, firmware, protokol komunikasi, dan aplikasi Android.",
        "Developed a microcontroller-based radiation monitoring system integrating sensors, firmware, communication protocols, and Android applications.",
      ),
      tech: "C \u2014 Microcontrollers \u2014 Android",
    },
    {
      company: "PT Telkom Indonesia",
      role: pick(locale, "Magang", "Internship"),
      period: pick(
        locale,
        "Juli 2020 \u2014 September 2020",
        "July 2020 \u2014 September 2020",
      ),
      copy: pick(
        locale,
        "Mendukung operasional layanan, pengolahan data pelanggan, dan pelaporan.",
        "Supported service operations, customer data processing, and reporting.",
      ),
      tech: "Telecommunication \u2014 Service operations",
    },
  ];
}
