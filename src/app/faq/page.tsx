import type { Metadata } from "next";
import FaqClient from "@/components/FaqClient";

export const metadata: Metadata = {
  title: "FAQ - KrushiMandi",
  description: "Frequently asked questions about KrushiMandi agricultural marketplace.",
};

export default function FAQPage() {
  return <FaqClient />;
}

