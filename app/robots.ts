import type { MetadataRoute } from "next";
import { site } from "@/config/site";
// No authentication, request headers, or locale middleware required.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: site.url + "/sitemap.xml",
  };
}
