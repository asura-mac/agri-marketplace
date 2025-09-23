import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://kisannearme.com/sitemap.xml",
    host: "https://kisannearme.com",
  };
}