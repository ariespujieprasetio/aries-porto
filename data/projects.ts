import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "veritik",
    index: "01",
    title: "Veritik",
    category: "AI Product",
    description:
      "An AI-assisted recruitment platform designed to make candidate screening more structured, comparable, and clear.",
    detail: "Personal product · In development",
    href: "/work/veritik",
    tags: ["Product engineering", "AI-assisted workflow", "Full stack"],
  },
  {
    slug: "enterprise-mobile",
    index: "02",
    title: "Enterprise mobile",
    category: "Mobile Engineering",
    description:
      "Customer-facing React Native applications integrated with enterprise services across the Astra ecosystem.",
    detail: "Selected work · Details limited by confidentiality",
    tags: ["React Native", "API integration", "Product delivery"],
  },
  {
    slug: "platforms",
    index: "03",
    title: "Backend & API platforms",
    category: "Platform Engineering",
    description:
      "Central APIs and internal systems that connect web, mobile, authentication, and operational workflows.",
    detail: "Selected work · Details limited by confidentiality",
    tags: ["Laravel", "Go", "Spring Boot", "REST"],
  },
  {
    slug: "radiation-monitor",
    index: "04",
    title: "Radiation monitoring system",
    category: "IoT & Research",
    description:
      "A connected system spanning radiation sensors, embedded firmware, real-time data transmission, and an Android application.",
    detail: "BATAN · Engineering research",
    tags: ["Microcontrollers", "Sensors", "Android", "Real-time data"],
  },
];
