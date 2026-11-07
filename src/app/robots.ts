import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/leads",
        "/clients",
        "/projects",
        "/sprints",
        "/finances",
        "/settings",
        "/login",
      ],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
