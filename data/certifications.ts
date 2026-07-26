import type { Certification } from "@/types";

export const certifications: Certification[] = [
  {
    name: "AWS Certified Developer — Associate",
    issuer: "Amazon Web Services",
    year: "2022",
    featured: true,
    // TODO: Add credential URL.
  },
  {
    name: "PCAP: Programming Essentials in Python",
    issuer: "Cisco Networking Academy",
    year: "2020",
    // TODO: Add credential URL.
  },
  ...[
    "Software Engineer",
    "React / Frontend Developer",
    "Angular Intermediate",
    "Node.js Intermediate",
    "REST API Intermediate",
    "SQL Advanced",
    "Go Intermediate",
  ].map((name) => ({
    name,
    issuer: "HackerRank",
    // TODO: Add credential URL.
  })),
];
