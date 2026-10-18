import type { MetadataRoute } from "next";

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
    sitemap: "https://avanza.dev/sitemap.xml",
  };
}
