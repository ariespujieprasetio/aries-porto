import type { MetadataRoute } from "next";
import { profile } from "@/config/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/work", "/work/veritik", "/experience", "/writing", "/resume", "/contact"].map((path) => ({
    url: `${profile.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : path === "/work" ? 0.9 : 0.7,
  }));
}
