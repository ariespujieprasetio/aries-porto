import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    company: "PT Astra International Tbk",
    role: "Senior Software Engineer",
    period: "Jun 2026 — Present",
    current: true,
    summary:
      "Building and maintaining customer-facing mobile and web products across Astra’s digital ecosystem, with a focus on dependable integration and long-term maintainability.",
    highlights: [
      "Develop and maintain MotorkuX and Digiroom mobile applications using React Native.",
      "Deliver product features and integrate secure enterprise REST services with attention to data consistency.",
      "Contribute to React and Next.js applications supporting internal and customer-facing workflows.",
      "Work across engineering, design, QA, and product through reviews, planning, technical discussions, and releases.",
    ],
    technologies: ["React Native", "React", "Next.js", "REST APIs"],
  },
  {
    company: "PT Astra Land Indonesia / Astra Property",
    role: "Software Engineer",
    period: "Mar 2025 — May 2026",
    summary:
      "Owned end-to-end development across the central API platform, mobile applications, authentication, and business-facing web systems.",
    highlights: [
      "Architected and maintained a central Laravel REST API serving web, mobile, and internal applications.",
      "Developed React Native products and web applications in AngularJS, React, and Next.js.",
      "Managed centralized authentication with Java Spring Boot.",
      "Improved system quality through scalability work, refactoring, optimization, and code reviews.",
    ],
    technologies: ["Laravel", "Spring Boot", "React Native", "Next.js"],
  },
  {
    company: "PT Global Service Indonesia",
    role: "Software Engineer",
    period: "Nov 2022 — Mar 2025",
    summary:
      "Led implementation across backend services, internal platforms, real-time web applications, and connected hardware systems.",
    highlights: [
      "Designed and built accounting and attendance systems using Go, Laravel, and PHP.",
      "Built a real-time dashboard with React and NestJS, and implemented Odoo 15 Helpdesk.",
      "Developed Gotjob.id using Python and Vue.js.",
      "Combined hardware and software in an IoT Smart Forklift system while contributing analysis and technical specifications.",
    ],
    technologies: ["Go", "Laravel", "React", "NestJS", "Python", "Vue.js", "IoT"],
  },
  {
    company: "Badan Tenaga Nuklir Nasional (BATAN)",
    role: "Physics Techno Research",
    period: "Jul 2021 — Sep 2022",
    summary:
      "Helped deliver a complete radiation monitoring system spanning sensors, embedded processing, real-time transmission, and an Android interface.",
    highlights: [
      "Designed and calibrated a microcontroller-based radiation monitoring system.",
      "Developed firmware for radiation data processing and real-time transmission.",
      "Built an Android application for readings, thresholds, and alerts.",
    ],
    technologies: ["C", "Microcontrollers", "Sensors", "Android", "Real-time data"],
  },
  {
    company: "PT Telkom Indonesia",
    role: "Home Service Intern",
    period: "Jul 2020 — Sep 2020",
    summary:
      "Supported service operations through operational monitoring, customer data processing, and reporting.",
    highlights: [],
  },
];
