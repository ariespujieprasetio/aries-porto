import { type Locale, pick } from "@/config/site";
export function projects(locale: Locale) {
  return [
    {
      slug: "velutara",
      name: "Velutara",
      category: pick(
        locale,
        "AI & proyek internasional",
        "AI & international delivery",
      ),
      description: pick(
        locale,
        "Aplikasi perencanaan perjalanan berbantuan AI, diserahkan melalui kerja sama langsung dengan perusahaan di Singapura.",
        "AI-assisted travel planning, delivered through a direct business relationship with a Singapore-based company.",
      ),
      url: "https://velutara.com",
      tags: ["AI integration", "Product engineering"],
      context: pick(
        locale,
        "Membantu mengubah ide perjalanan menjadi rencana yang lebih terstruktur melalui aplikasi berbantuan AI.",
        "An opportunity to turn travel ideas into more structured plans through an AI-assisted application.",
      ),
      solution: pick(
        locale,
        "Pengembangan aplikasi perencanaan perjalanan dengan integrasi AI dan penyerahan source code secara komersial.",
        "Development of an AI-assisted travel planning application and commercial delivery of its source code.",
      ),
      responsibility: pick(
        locale,
        "Pengembangan software dan penyerahan proyek melalui hubungan langsung dengan klien internasional.",
        "Software development and project handover through a direct international client relationship.",
      ),
      approach: pick(
        locale,
        "Menghubungkan pengalaman pengguna dengan kemampuan AI dalam satu alur perencanaan. Detail implementasi milik klien tidak dipublikasikan.",
        "Connecting the user experience with AI capabilities in a planning workflow. Client-owned implementation details are not published.",
      ),
      features: pick(
        locale,
        "Perencanaan perjalanan berbantuan AI; Alur perencanaan digital; Penyerahan source code komersial",
        "AI-assisted travel planning; Digital planning workflow; Commercial source-code handover",
      ).split("; "),
      outcome: pick(
        locale,
        "Source code dijual dan diserahkan kepada perusahaan yang berbasis di Singapura.",
        "The source code was commercially sold and delivered to a Singapore-based company.",
      ),
    },
    {
      slug: "veritik",
      name: "Veritik",
      category: pick(
        locale,
        "Produk mandiri & rekrutmen",
        "Independent product & recruitment",
      ),
      description: pick(
        locale,
        "Platform rekrutmen berbantuan AI untuk menyusun, mengevaluasi, dan membandingkan informasi kandidat.",
        "An AI-assisted recruitment platform for structuring, evaluating, and comparing candidate information.",
      ),
      url: "https://veritik.space",
      tags: ["AI integration", "B2B software", "Full stack"],
      context: pick(
        locale,
        "Informasi dalam resume perlu diolah menjadi konteks yang konsisten agar kandidat lebih mudah ditinjau.",
        "Resume information needs consistent context to make candidate review more structured.",
      ),
      solution: pick(
        locale,
        "Satu alur kerja untuk parsing resume, screening, penilaian kandidat, dan perbandingan. AI membantu evaluasi; keputusan tetap di tangan manusia.",
        "A connected workflow for resume parsing, screening, candidate assessment, and comparison. AI supports evaluation; people retain decision-making responsibility.",
      ),
      responsibility: pick(
        locale,
        "Pengembangan produk mandiri, integrasi AI, dan rekayasa aplikasi bisnis dari awal hingga akhir.",
        "Independent product development, AI integration, and end-to-end business application engineering.",
      ),
      approach: pick(
        locale,
        "Data rekrutmen terstruktur, autentikasi, ekstraksi dokumen, validasi keluaran AI, dan pemisahan rekomendasi AI dari status rekrutmen.",
        "Structured recruitment data, authentication, document extraction, AI output validation, and separation of AI recommendations from recruitment status.",
      ),
      features: pick(
        locale,
        "Parsing resume; Screening kandidat; Evaluasi dan scoring; Perbandingan kandidat; Dukungan alur rekrutmen",
        "Resume parsing; Candidate screening; Evaluation and scoring; Candidate comparisons; Recruitment workflow support",
      ).split("; "),
      outcome: pick(
        locale,
        "Produk ini menunjukkan kemampuan pengembangan software B2B dan integrasi AI secara mandiri.",
        "The product demonstrates independent B2B software engineering and AI integration.",
      ),
    },
    {
      slug: "enterprise",
      name: pick(locale, "Sistem enterprise", "Enterprise systems"),
      category: pick(
        locale,
        "Pengalaman profesional",
        "Professional experience",
      ),
      description: pick(
        locale,
        "Kontribusi pada aplikasi mobile, API terpusat, autentikasi, dan sistem operasional dalam lingkungan enterprise.",
        "Contributions to mobile applications, central APIs, authentication, and operational systems in enterprise environments.",
      ),
      tags: ["React Native", "Laravel", "Spring Boot", "Next.js"],
      context: pick(
        locale,
        "Aplikasi pelanggan dan operasional perlu terhubung dengan layanan backend serta autentikasi yang konsisten.",
        "Customer and operational applications need dependable connections to backend services and consistent authentication.",
      ),
      solution: pick(
        locale,
        "Kontribusi pada MotorkuX dan Digiroom di Astra International, serta API Laravel dan autentikasi Spring Boot di Astra Property.",
        "Contributions to MotorkuX and Digiroom at Astra International, and Laravel APIs and Spring Boot authentication at Astra Property.",
      ),
      responsibility: pick(
        locale,
        "Pengembangan fitur mobile dan web, integrasi API, pemeliharaan sistem, dan kolaborasi dalam siklus pengembangan software.",
        "Mobile and web feature development, API integration, system maintenance, and collaboration across the software development lifecycle.",
      ),
      approach: pick(
        locale,
        "React Native untuk mobile, React dan Next.js untuk web, Laravel untuk API, dan Java Spring Boot untuk autentikasi.",
        "React Native for mobile, React and Next.js for web, Laravel for APIs, and Java Spring Boot for authentication.",
      ),
      features: pick(
        locale,
        "Aplikasi pelanggan; API terpusat; Autentikasi; Integrasi layanan",
        "Customer applications; Central APIs; Authentication; Service integration",
      ).split("; "),
      outcome: pick(
        locale,
        "Pengalaman profesional lintas frontend, backend, dan mobile. Ringkasan ini tidak mewakili dukungan atau afiliasi studio dengan pemberi kerja.",
        "Professional experience across frontend, backend, and mobile. This summary does not imply employer endorsement or affiliation with the studio.",
      ),
    },
    {
      slug: "radiation-monitor",
      name: pick(locale, "Pemantauan radiasi", "Radiation monitoring"),
      category: pick(
        locale,
        "Riset & IoT \u00b7 BATAN",
        "Research & IoT \u00b7 BATAN",
      ),
      description: pick(
        locale,
        "Sistem pemantauan berbasis mikrokontroler yang menghubungkan sensor, firmware, komunikasi data, dan aplikasi Android.",
        "A microcontroller-based monitoring system connecting sensors, firmware, data communication, and an Android application.",
      ),
      tags: ["C", "Microcontrollers", "Android", "IoT"],
      context: pick(
        locale,
        "Riset pemantauan radiasi membutuhkan integrasi perangkat fisik dan software.",
        "Radiation monitoring research requires integration between physical devices and software.",
      ),
      solution: pick(
        locale,
        "Sistem pemantauan yang mengintegrasikan sensor dan pemrosesan embedded dengan aplikasi Android.",
        "A monitoring system integrating sensors and embedded processing with an Android application.",
      ),
      responsibility: pick(
        locale,
        "Riset dan pengembangan sistem mikrokontroler, firmware, komunikasi, dan antarmuka Android.",
        "Research and development across microcontrollers, firmware, communication, and the Android interface.",
      ),
      approach: pick(
        locale,
        "Menghubungkan pembacaan sensor dengan pemrosesan data dan tampilan aplikasi.",
        "Connecting sensor readings to data processing and application presentation.",
      ),
      features: pick(
        locale,
        "Integrasi sensor; Firmware; Komunikasi data; Aplikasi Android",
        "Sensor integration; Firmware; Data communication; Android application",
      ).split("; "),
      outcome: pick(
        locale,
        "Pengalaman membangun sistem yang menjembatani hardware dan software selama riset di BATAN.",
        "Experience building a system spanning hardware and software during research at BATAN.",
      ),
    },
  ];
}

// Derive discovery from the same content model as the real case-study pages.
export const projectSlugs = projects("id").map((project) => project.slug);
