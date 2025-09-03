import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - KrushiMandi",
  description: "Learn about KrushiMandi and our mission to empower farmers and traders through technology.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Krushi Mandi – An Evool Foundation Initiative</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Krushi Mandi is a farmer-first digital platform created to connect farmers directly with traders, buyers, and agricultural businesses. The purpose of this initiative is to remove middlemen, ensure fair pricing, and give farmers better access to genuine buyers.

            </p>
            
            <p className="text-gray-700 leading-relaxed">
              On Krushi Mandi, farmers can sell a wide range of products such as grains, pulses, seeds, oilseeds, fruits, vegetables, nuts, dairy, fish, flowers, tea, and spices. Along with this, agricultural equipment companies and fertilizer suppliers can also list their products and connect with farmers and traders in one place.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              The process is simple and transparent. Farmers and traders can communicate directly through phone calls or WhatsApp without extra layers or hidden costs. This helps farmers reach more buyers and sell their produce at the right value.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Backed by Evool Foundation’s mission of sustainability and social good, Krushi Mandi is building a digital agriculture marketplace that supports fair trade, empowers farmers, and strengthens the rural economy of India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Krushi Mandi – An Evool Foundation Initiative

// Krushi Mandi is a farmer-first digital platform created to connect farmers directly with traders, buyers, and agricultural businesses. The purpose of this initiative is to remove middlemen, ensure fair pricing, and give farmers better access to genuine buyers.

// On Krushi Mandi, farmers can sell a wide range of products such as grains, pulses, seeds, oilseeds, fruits, vegetables, nuts, dairy, fish, flowers, tea, and spices. Along with this, agricultural equipment companies and fertilizer suppliers can also list their products and connect with farmers and traders in one place.

// The process is simple and transparent. Farmers and traders can communicate directly through phone calls or WhatsApp without extra layers or hidden costs. This helps farmers reach more buyers and sell their produce at the right value.

// Backed by Evool Foundation’s mission of sustainability and social good, Krushi Mandi is building a digital agriculture marketplace that supports fair trade, empowers farmers, and strengthens the rural economy of India.
