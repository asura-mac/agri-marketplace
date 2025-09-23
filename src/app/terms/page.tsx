import type { Metadata } from "next";
import TermsClient from "@/components/TermsClient";

export const metadata: Metadata = {
  title: "Terms and Conditions - Kisan Near Me",
  description: "Terms and conditions for using Kisan Near Me agricultural marketplace platform.",
};

export default function ermsAndConditionsPage() {
  return <TermsClient />;
}
