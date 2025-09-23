import type { Metadata } from "next";
import PrivacyClient from "@/components/PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy - Kisan Near Me",
  description: "Privacy policy and data protection information for Kisan Near Me users.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyClient />;
}