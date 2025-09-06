import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://krushimandi.com/sitemap.xml",
    host: "https://krushimandi.com",
  };
}