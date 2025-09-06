"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ListingsGrid from "@/components/ListingsGrid";
import Breadcrumb from "@/components/Breadcrumb";

const categoryLabels: Record<string, string> = {
  grains: "Grains",
  pulses: "Pulses", 
  fruits: "Fruits",
  vegetables: "Vegetables",
  oilseeds: "Oilseeds",
  seeds: "Seeds",
  spices: "Spices",
  flowers: "Flowers",
  tea: "Tea",
  nuts: "Nuts",
  dairy: "Dairy",
  fish: "Fish",
  fertilizer: "Fertilizer",
  equipment: "Equipment",
  honey: "Honey",
  cattlefeed: "Cattle Feed",
  nurseryplants: "Nursery Pla",
  ayurvedic: "Ayurvedic",
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.slug as string;
  const categoryLabel = categoryLabels[category] || category;

  if (!categoryLabels[category]) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories' },
    { label: categoryLabel }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {categoryLabel} Products
          </h1>
          <p className="text-gray-600">
            Browse fresh {categoryLabel.toLowerCase()} from verified sellers
          </p>
        </div>

        {/* Listings */}
        <ListingsGrid category={category} itemsPerPage={16} />
      </div>
    </div>
  );
}
