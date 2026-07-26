import type { Capability } from "@/types";

export const capabilities: Capability[] = [
  {
    title: "Backend & platforms",
    description:
      "Designing APIs and business systems that remain understandable as products and teams grow.",
    technologies: ["Laravel", "Go", "Node.js", "Spring Boot", "Django", "NestJS"],
  },
  {
    title: "Product interfaces",
    description:
      "Building responsive web and mobile experiences connected to real operational workflows.",
    technologies: ["React", "Next.js", "React Native", "AngularJS", "Vue.js"],
  },
  {
    title: "Systems & integration",
    description:
      "Connecting applications, enterprise services, data stores, and physical devices reliably.",
    technologies: ["REST", "GraphQL", "gRPC", "MySQL", "PostgreSQL", "MongoDB", "IoT"],
  },
  {
    title: "Delivery & quality",
    description:
      "Improving software through pragmatic architecture, testing, reviews, automation, and performance work.",
    technologies: ["Docker", "AWS", "GCP", "CI/CD", "Jenkins", "PyTest", "JMeter"],
  },
];

export const practices = [
  "System design",
  "Clean architecture",
  "Performance optimization",
  "Refactoring",
  "Code reviews",
  "Technical documentation",
  "Cross-team coordination",
];
