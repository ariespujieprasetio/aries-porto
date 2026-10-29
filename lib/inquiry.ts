export const projectTypes = [
  "websites",
  "web-applications",
  "mobile",
  "integrations",
  "maintenance",
  "other",
];
export const budgets = [
  "",
  "under-3m",
  "3-10m",
  "10-25m",
  "25-50m",
  "above-50m",
];
export type Inquiry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  project: string;
  budget: string;
  description: string;
  timeline: string;
  website: string;
  locale: "id" | "en";
};
export function validateInquiry(input: unknown): Inquiry | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const obj = input as Record<string, unknown>;
  const limits: Record<string, number> = {
    name: 120,
    company: 120,
    email: 254,
    phone: 40,
    project: 40,
    budget: 30,
    description: 5000,
    timeline: 120,
    website: 200,
  };
  const result: Record<string, string> = {};
  for (const [key, max] of Object.entries(limits)) {
    const value = obj[key] ?? "";
    if (typeof value !== "string" || value.length > max) return null;
    result[key] = value.trim();
  }
  if (
    (obj.locale !== undefined && obj.locale !== "id" && obj.locale !== "en") ||
    Object.entries(result).some(
      ([key, value]) => key !== "description" && /[\x00-\x1f\x7f]/.test(value),
    ) ||
    result.name.length < 1 ||
    /[\r\n]/.test(result.name) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email) ||
    result.description.length < 20 ||
    !projectTypes.includes(result.project) ||
    !budgets.includes(result.budget)
  )
    return null;
  return { ...result, locale: obj.locale === "en" ? "en" : "id" } as Inquiry;
}
