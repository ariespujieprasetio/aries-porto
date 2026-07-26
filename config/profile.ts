export const profile = {
  name: "Aries Pujie Prasetio",
  shortName: "Aries P.",
  title: "Senior Software Engineer",
  location: "Jakarta, Indonesia",
  email: "mbulkragan12@gmail.com",
  github: "https://github.com/ariespujieprasetio",
  linkedin: null as string | null, // TODO: Add LinkedIn profile URL.
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://aries-pujie-portfolio.arsiparies.chatgpt.site",
  description:
    "Senior Software Engineer in Jakarta building reliable software across mobile, web, backend, enterprise systems, and IoT.",
} as const;
