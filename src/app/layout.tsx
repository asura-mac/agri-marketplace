import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Kisan Near Me | Free Digital Agriculture Marketplace by Evool Foundation",
  description: "Kisan Near Me is a free digital agriculture platform by Evool Foundation, connecting farmers, buyers and traders to sell crops, vegetables, fruits, seeds and produce fairly.",
  keywords: "sell agriculture, post ad, farming products, agricultural marketplace",
  icons: {
    icon: "/FaviconV2.png",
    shortcut: "/FaviconV2.png",    
    apple: "/FaviconV2.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.kisannearme.com/",
    siteName: "Kisan Near Me",
    title: "Kisan Near Me | Free Digital Agriculture Marketplace by Evool Foundation",
    description:
      "Kisan Near Me is a free online mandi in India by Evool Foundation where farmers, buyers, and traders can connect directly for crops, vegetables, fruits, seeds, and more.",
    images: [
      {
        url: "https://www.kisannearme.com/KM-OGV2.png", // <-- yaha apna OG image ya logo ka URL daalna
        width: 1200,
        height: 630,
        alt: "Kisan Near Me - Agricultural Marketplace",
      },
    ],
  },
  other: {
    "application/ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Kisan Near Me",
        "url": "https://www.kisannearme.com/",
        "alternateName": "Kisan Near Me - Agricultural Marketplace",
        // "alternateUrl": "https://www.kisannearme.in/",
        "description": "Kisan Near Me is an online agricultural marketplace, an initiative by Evool Foundation, where farmers and traders can sell grains, pulses, seeds, oilseeds, vegetables, fruits, nuts, spices, flowers, tea, dairy, fish, fertilizer, equipment, honey, cattle feed, nursery plants, and herbal plants.",
        "publisher": {
          "@type": "Organization",
          "name": "Evool Foundation",
          "url": "https://www.evoolfoundation.org",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.kisannearme.com/KM-LOGO-FULLV2.png"
          }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": [
            "https://www.kisannearme.com/search?query={search_term_string}",
            "https://www.kisannearme.in/search?query={search_term_string}"
          ],
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Evool Foundation",
        "url": "https://www.evoolfoundation.org",
        "logo": "https://www.kisannearme.com/KM-LOGO-FULLV2.png",
        "sameAs": [
          "https://www.facebook.com/people/Evool-Foundation/61575736152884/",
          "https://x.com/evoolfoundation/",
          "https://www.instagram.com/evoolfoundation/",
          "https://www.kisannearme.com/"
          // "https://www.kisannearme.in/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Kisan Near Me Categories",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Grains", "url": "https://www.kisannearme.com/categories/grains" },
          { "@type": "ListItem", "position": 2, "name": "Pulses", "url": "https://www.kisannearme.com/categories/pulses" },
          { "@type": "ListItem", "position": 3, "name": "Seeds", "url": "https://www.kisannearme.com/categories/seeds" },
          { "@type": "ListItem", "position": 4, "name": "Oilseeds", "url": "https://www.kisannearme.com/categories/oilseeds" },
          { "@type": "ListItem", "position": 5, "name": "Vegetables", "url": "https://www.kisannearme.com/categories/vegetables" },
          { "@type": "ListItem", "position": 6, "name": "Fruits", "url": "https://www.kisannearme.com/categories/fruits" },
          { "@type": "ListItem", "position": 7, "name": "Nuts", "url": "https://www.kisannearme.com/categories/nuts" },
          { "@type": "ListItem", "position": 8, "name": "Spices", "url": "https://www.kisannearme.com/categories/spices" },
          { "@type": "ListItem", "position": 9, "name": "Flowers", "url": "https://www.kisannearme.com/categories/flowers" },
          { "@type": "ListItem", "position": 10, "name": "Cash Crops", "url": "https://www.kisannearme.com/categories/tea" },
          { "@type": "ListItem", "position": 11, "name": "Dairy", "url": "https://www.kisannearme.com/categories/dairy" },
          { "@type": "ListItem", "position": 12, "name": "Fish", "url": "https://www.kisannearme.com/categories/fish" },
          { "@type": "ListItem", "position": 13, "name": "Fertilizer", "url": "https://www.kisannearme.com/categories/fertilizer" },
          { "@type": "ListItem", "position": 14, "name": "Equipment", "url": "https://www.kisannearme.com/categories/equipment" },
          { "@type": "ListItem", "position": 15, "name": "Honey", "url": "https://www.kisannearme.com/categories/honey" },
          { "@type": "ListItem", "position": 16, "name": "Cattle Feed", "url": "https://www.kisannearme.com/categories/cattlefeed" },
          { "@type": "ListItem", "position": 17, "name": "Nursery Plants", "url": "https://www.kisannearme.com/categories/nurseryplants" },
          { "@type": "ListItem", "position": 18, "name": "Herbal Plants", "url": "https://www.kisannearme.com/categories/herbalplants" }
        ]
      }
    ])
  }  
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
