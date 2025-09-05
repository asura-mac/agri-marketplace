import type { Metadata } from "next";
import PrivacyClient from "@/components/PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy - KrushiMandi",
  description: "Privacy policy and data protection information for KrushiMandi users.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyClient />;
}