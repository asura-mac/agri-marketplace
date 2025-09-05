import type { Metadata } from "next";
import TermsClient from "@/components/TermsClient";

export const metadata: Metadata = {
  title: "Terms and Conditions - KrushiMandi",
  description: "Terms and conditions for using KrushiMandi agricultural marketplace platform.",
};

export default function ermsAndConditionsPage() {
  return <TermsClient />;
}
