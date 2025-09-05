import type { Metadata } from "next";
// import Script from "next/script";

export const metadata: Metadata = {
  title: "Sell Your Products - Agri Market Platform",
  description: "Post your agricultural products for sale. Choose from various categories including grains, fruits, vegetables, and more.",
  keywords: "sell agriculture, post ad, farming products, agricultural marketplace",
};

export default function SellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
