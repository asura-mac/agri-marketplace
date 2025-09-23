import type { Metadata } from "next";
import FaqClient from "@/components/FaqClient";
import Script from "next/script";

export const metadata: Metadata = {
  title: "FAQ - Kisan Near Me",
  description: "Frequently asked questions about Kisan Near Me agricultural marketplace.",
};

export default function FAQPage() {
  return (
    <>
      {/* FAQ Structured Data for Rich Results */}
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Kisan Near Me?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Kisan Near Me is a digital agriculture marketplace in India by Evool Foundation. It connects farmers directly with buyers and traders without middlemen. Farmers can sell crops online, and buyers can easily find local farmers near me through the Kisan Near Me app."
                }
              },
              {
                "@type": "Question",
                "name": "How does Kisan Near Me work for farmers and buyers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Farmers can list their products on the online mandi for farmers, and buyers or traders can connect with them directly through phone calls or WhatsApp. This makes it simple to buy vegetables online or purchase wholesale fruits and vegetables near me directly from farmers."
                }
              },
              {
                "@type": "Question",
                "name": "What products can I buy or sell on Kisan Near Me?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The platform supports a wide range of categories including grains, pulses, seeds, oilseeds, fruits, vegetables, dairy, fish, flowers, tea, spices, and nuts. Agricultural equipment companies and fertilizer suppliers can also list their products for farmers."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use Kisan Near Me to find farmers near me?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Kisan Near Me allows you to connect with local farmers near me who are ready to sell farm produce directly. This makes it easier for buyers to purchase fresh produce directly from farmers at fair prices."
                }
              },
              {
                "@type": "Question",
                "name": "Is Kisan Near Me free for farmers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Kisan Near Me app is free for farmers to register and list their crops. The goal is to provide a fair price and give farmers access to more buyers without paying high commissions."
                }
              },
              {
                "@type": "Question",
                "name": "Who can buy from Kisan Near Me?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Anyone including wholesale buyers, retailers, hotels, restaurants, and traders can buy directly from farmers. Businesses searching for wholesale vegetables near me or fruits near me can use the Kisan Near Me platform."
                }
              },
              {
                "@type": "Question",
                "name": "How do farmers and traders communicate?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Communication is direct through phone calls or WhatsApp. This makes Kisan Near Me a trusted farmer-to-buyer platform, helping both sides negotiate and close deals quickly."
                }
              },
              {
                "@type": "Question",
                "name": "What makes Kisan Near Me different from traditional mandis?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Unlike traditional mandis with heavy middlemen charges, Kisan Near Me is an online mandi for farmers where crops go straight from farm to market. Buyers get fresh produce and farmers get fair prices without exploitation."
                }
              },
              {
                "@type": "Question",
                "name": "Can agricultural equipment and fertilizer companies join Kisan Near Me?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Kisan Near Me is open to agriculture equipment manufacturers and fertilizer companies who want to showcase their products directly to farmers."
                }
              },
              {
                "@type": "Question",
                "name": "Is Kisan Near Me available across India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Kisan Near Me is accessible across India. Whether you are looking for wholesale fruits and vegetables near me, local farmers near me, or want to use an online mandi for farmers, Kisan Near Me brings everything to one platform."
                }
              },
              {
                "@type": "Question",
                "name": "What is the mission of Kisan Near Me?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The mission of Kisan Near Me is to empower farmers, build a sustainable agriculture marketplace in India, reduce middlemen, and strengthen the rural economy by providing fair trade opportunities."
                }
              }
            ]
          }),
        }}
      />

      {/* Your actual FAQ content */}
      <FaqClient />
    </>
  );
}

