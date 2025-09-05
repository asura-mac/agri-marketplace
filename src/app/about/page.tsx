import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient"; // import from components folder

export const metadata: Metadata = {
  title: "About Us - KrushiMandi",
  description:
    "Learn about KrushiMandi and our mission to empower farmers and traders through technology.",
};

export default function AboutPage() {
  return <AboutClient />;
}
