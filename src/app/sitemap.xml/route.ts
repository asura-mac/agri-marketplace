import { NextResponse } from "next/server";

const BASE_URL = "https://krushimandi.com"; // canonical domain
const now = new Date().toISOString();

const urls = [
  "/", "about-us", "contact-us", "faq",
  "privacy-policy", "terms-and-conditions", "sell",
  "categories",
  "categories/fruits",
  "categories/vegetables",
  "categories/grains",
  "categories/pulses",
  "categories/oilseeds",
  "categories/seeds",
  "categories/fertilizer",
  "categories/equipment",
  "categories/ayurvedic",
  "categories/honey",
  "categories/cattle-feed",
  "categories/nursery-plant",
  "categories/fish",
  "categories/spices",
  "categories/flowers",
  "categories/tea",
  "categories/nuts",
  "categories/dairy",
];

export async function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (path) => `
      <url>
        <loc>${BASE_URL}/${path.replace(/^\//, "")}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${path === "/" ? "1.0" : "0.7"}</priority>
      </url>`
      )
      .join("\n")}
  </urlset>`;

  return new NextResponse(body, {
    headers: { "Content-Type": "application/xml" },
  });
}