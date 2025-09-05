import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krushi Mandi | Free Digital Agriculture Marketplace by Evool Foundation",
  description: "Krushi Mandi is a free digital agriculture platform by Evool Foundation, connecting farmers, buyers and traders to sell crops, vegetables, fruits, seeds and produce fairly.",
  keywords: "sell agriculture, post ad, farming products, agricultural marketplace",
  icons: {
    icon: "/Favicon.png",
    shortcut: "/Favicon.png",    
    apple: "/Favicon.png",
  },
  other: {
    "application/ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Krushi Mandi",
        "url": "https://www.krushimandi.com/",
        "alternateName": "KrushiMandi - Agricultural Marketplace",
        "alternateUrl": "https://www.krushimandi.in/",
        "description": "Krushi Mandi is an online agricultural marketplace, an initiative by Evool Foundation, where farmers and traders can sell grains, pulses, seeds, oilseeds, vegetables, fruits, nuts, spices, flowers, tea, dairy, fish, fertilizer, equipment, honey, cattle feed, nursery plants, and herbal plants.",
        "publisher": {
          "@type": "Organization",
          "name": "Evool Foundation",
          "url": "https://www.evoolfoundation.org",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.krushimandi.com/KM-LOGO-FULL.png"
          }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": [
            "https://www.krushimandi.com/search?query={search_term_string}",
            "https://www.krushimandi.in/search?query={search_term_string}"
          ],
          "query-input": "required name=search_term_string"
        },
        "mainEntity": [
          { "@type": "Product", "name": "Grains", "url": "https://www.krushimandi.com/categories/grains" },
          { "@type": "Product", "name": "Pulses", "url": "https://www.krushimandi.com/categories/pulses" },
          { "@type": "Product", "name": "Seeds", "url": "https://www.krushimandi.com/categories/seeds" },
          { "@type": "Product", "name": "Oilseeds", "url": "https://www.krushimandi.com/categories/oilseeds" },
          { "@type": "Product", "name": "Vegetables", "url": "https://www.krushimandi.com/categories/vegetables" },
          { "@type": "Product", "name": "Fruits", "url": "https://www.krushimandi.com/categories/fruits" },
          { "@type": "Product", "name": "Nuts", "url": "https://www.krushimandi.com/categories/nuts" },
          { "@type": "Product", "name": "Spices", "url": "https://www.krushimandi.com/categories/spices" },
          { "@type": "Product", "name": "Flowers", "url": "https://www.krushimandi.com/categories/flowers" },
          { "@type": "Product", "name": "Tea", "url": "https://www.krushimandi.com/categories/tea" },
          { "@type": "Product", "name": "Dairy", "url": "https://www.krushimandi.com/categories/dairy" },
          { "@type": "Product", "name": "Fish", "url": "https://www.krushimandi.com/categories/fish" },
          { "@type": "Product", "name": "Fertilizer", "url": "https://www.krushimandi.com/categories/fertilizer" },
          { "@type": "Product", "name": "Equipment", "url": "https://www.krushimandi.com/categories/equipment" },
          { "@type": "Product", "name": "Honey", "url": "https://www.krushimandi.com/categories/honey" },
          { "@type": "Product", "name": "Cattle Feed", "url": "https://www.krushimandi.com/categories/cattlefeed" },
          { "@type": "Product", "name": "Nursery Plants", "url": "https://www.krushimandi.com/categories/nurseryplants" },
          { "@type": "Product", "name": "Herbal Plants", "url": "https://www.krushimandi.com/categories/herbalplants" }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "url": "https://www.evoolfoundation.org/contact-us",
          "contactType": "customer support"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Evool Foundation",
        "url": "https://www.evoolfoundation.org",
        "logo": "https://www.krushimandi.com/KM-LOGO-FULL.png",
        "sameAs": [
          "https://www.facebook.com/people/Evool-Foundation/61575736152884/",
          "https://x.com/evoolfoundation/",
          "https://www.instagram.com/evoolfoundation/",
          "https://www.krushimandi.com/",
          "https://www.krushimandi.in/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.krushimandi.com/" },
          { "@type": "ListItem", "position": 2, "name": "Sell", "item": "https://www.krushimandi.com/sell" },
          { "@type": "ListItem", "position": 3, "name": "Grains", "item": "https://www.krushimandi.com/categories/grains" },
          { "@type": "ListItem", "position": 4, "name": "Pulses", "item": "https://www.krushimandi.com/categories/pulses" },
          { "@type": "ListItem", "position": 5, "name": "Seeds", "item": "https://www.krushimandi.com/categories/seeds" },
          { "@type": "ListItem", "position": 6, "name": "Oilseeds", "item": "https://www.krushimandi.com/categories/oilseeds" },
          { "@type": "ListItem", "position": 7, "name": "Vegetables", "item": "https://www.krushimandi.com/categories/vegetables" },
          { "@type": "ListItem", "position": 8, "name": "Fruits", "item": "https://www.krushimandi.com/categories/fruits" },
          { "@type": "ListItem", "position": 9, "name": "Nuts", "item": "https://www.krushimandi.com/categories/nuts" },
          { "@type": "ListItem", "position": 10, "name": "Spices", "item": "https://www.krushimandi.com/categories/spices" },
          { "@type": "ListItem", "position": 11, "name": "Flowers", "item": "https://www.krushimandi.com/categories/flowers" },
          { "@type": "ListItem", "position": 12, "name": "Tea", "item": "https://www.krushimandi.com/categories/tea" },
          { "@type": "ListItem", "position": 13, "name": "Dairy", "item": "https://www.krushimandi.com/categories/dairy" },
          { "@type": "ListItem", "position": 14, "name": "Fish", "item": "https://www.krushimandi.com/categories/fish" },
          { "@type": "ListItem", "position": 15, "name": "Fertilizer", "item": "https://www.krushimandi.com/categories/fertilizer" },
          { "@type": "ListItem", "position": 16, "name": "Equipment", "item": "https://www.krushimandi.com/categories/equipment" },
          { "@type": "ListItem", "position": 17, "name": "Honey", "item": "https://www.krushimandi.com/categories/honey" },
          { "@type": "ListItem", "position": 18, "name": "Cattle Feed", "item": "https://www.krushimandi.com/categories/cattlefeed" },
          { "@type": "ListItem", "position": 19, "name": "Nursery Plants", "item": "https://www.krushimandi.com/categories/nurseryplants" },
          { "@type": "ListItem", "position": 20, "name": "Herbal Plants", "item": "https://www.krushimandi.com/categories/herbalplants" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Krushi Mandi?",
            "acceptedAnswer": { "@type": "Answer", "text": "Krushi Mandi is a digital agriculture marketplace in India by Evool Foundation. It connects farmers directly with buyers and traders without middlemen. Farmers can sell crops online, and buyers can easily find local farmers near me through the Krushi Mandi app." }
          },
          {
            "@type": "Question",
            "name": "How does Krushi Mandi work for farmers and buyers?",
            "acceptedAnswer": { "@type": "Answer", "text": "Farmers can list their products on the online mandi for farmers, and buyers or traders can connect with them directly through phone calls or WhatsApp. This makes it simple to buy vegetables online or purchase wholesale fruits and vegetables near me directly from farmers." }
          },
          {
            "@type": "Question",
            "name": "What products can I buy or sell on Krushi Mandi?",
            "acceptedAnswer": { "@type": "Answer", "text": "The platform supports a wide range of categories including grains, pulses, seeds, oilseeds, fruits, vegetables, dairy, fish, flowers, tea, spices, and nuts. Agricultural equipment companies and fertilizer suppliers can also list their products for farmers." }
          },
          {
            "@type": "Question",
            "name": "Can I use Krushi Mandi to find farmers near me?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, Krushi Mandi allows you to connect with local farmers near me who are ready to sell farm produce directly. This makes it easier for buyers to purchase fresh produce directly from farmers at fair prices." }
          },
          {
            "@type": "Question",
            "name": "Is Krushi Mandi free for farmers?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, Krushi Mandi app is free for farmers to register and list their crops. The goal is to provide a fair price and give farmers access to more buyers without paying high commissions." }
          },
          {
            "@type": "Question",
            "name": "Who can buy from Krushi Mandi?",
            "acceptedAnswer": { "@type": "Answer", "text": "Anyone including wholesale buyers, retailers, hotels, restaurants, and traders can buy directly from farmers. Businesses searching for wholesale vegetables near me or fruits near me can use the Krushi Mandi platform." }
          },
          {
            "@type": "Question",
            "name": "How do farmers and traders communicate?",
            "acceptedAnswer": { "@type": "Answer", "text": "Communication is direct through phone calls or WhatsApp. This makes Krushi Mandi a trusted farmer-to-buyer platform, helping both sides negotiate and close deals quickly." }
          },
          {
            "@type": "Question",
            "name": "What makes Krushi Mandi different from traditional mandis?",
            "acceptedAnswer": { "@type": "Answer", "text": "Unlike traditional mandis with heavy middlemen charges, Krushi Mandi is an online mandi for farmers where crops go straight from farm to market. Buyers get fresh produce and farmers get fair prices without exploitation." }
          },
          {
            "@type": "Question",
            "name": "Can agricultural equipment and fertilizer companies join Krushi Mandi?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, Krushi Mandi is open to agriculture equipment manufacturers and fertilizer companies who want to showcase their products directly to farmers." }
          },
          {
            "@type": "Question",
            "name": "Is Krushi Mandi available across India?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, Krushi Mandi is accessible across India. Whether you are looking for wholesale fruits and vegetables near me, local farmers near me, or want to use an online mandi for farmers, Krushi Mandi brings everything to one platform." }
          },
          {
            "@type": "Question",
            "name": "What is the mission of Krushi Mandi?",
            "acceptedAnswer": { "@type": "Answer", "text": "The mission of Krushi Mandi is to empower farmers, build a sustainable agriculture marketplace in India, reduce middlemen, and strengthen the rural economy by providing fair trade opportunities." }
          }
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
