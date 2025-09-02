"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { CubeIcon, ShoppingBagIcon, BuildingStorefrontIcon, BeakerIcon, SparklesIcon, BugAntIcon, CakeIcon, WrenchScrewdriverIcon, CircleStackIcon, CpuChipIcon, BoltIcon, PhotoIcon } from "@heroicons/react/24/outline";

type Category = {
  key: string;
  label: string;
  icon: ReactNode;
};

const categories: Category[] = [
  { key: "grains", label: "Grains", icon: <CircleStackIcon className="w-7 h-7" /> },
  { key: "pulses", label: "Pulses", icon: <CubeIcon className="w-7 h-7" /> },
  { key: "fruits", label: "Fruits", icon: <ShoppingBagIcon className="w-7 h-7" /> },
  { key: "vegetables", label: "Vegetables", icon: <BoltIcon className="w-7 h-7" /> },
  { key: "oilseeds", label: "Oilseeds", icon: <BeakerIcon className="w-7 h-7" /> },
  { key: "seeds", label: "Seeds", icon: <CpuChipIcon className="w-7 h-7" /> },
  { key: "spices", label: "Spices", icon: <SparklesIcon className="w-7 h-7" /> },
  { key: "flowers", label: "Flowers", icon: <BugAntIcon className="w-7 h-7" /> },
  { key: "tea", label: "Tea", icon: <CakeIcon className="w-7 h-7" /> },
  { key: "nuts", label: "Nuts", icon: <CpuChipIcon className="w-7 h-7" /> },
  { key: "dairy", label: "Dairy", icon: <BuildingStorefrontIcon className="w-7 h-7" /> },
  { key: "fish", label: "Fish", icon: <PhotoIcon className="w-7 h-7" /> },
  { key: "fertilizer", label: "Fertilizer", icon: <BeakerIcon className="w-7 h-7" /> },
  { key: "equipment", label: "Equipment", icon: <WrenchScrewdriverIcon className="w-7 h-7" /> },
];

export default function CategoriesGrid() {
  return (
    <section className="px-4 md:px-6 py-4">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
        {categories.map((c) => (
          <Link 
            key={c.key} 
            href={`/category/${c.key}`}
            className="group flex flex-col items-center justify-center gap-2 rounded-lg border border-blue-100 bg-white p-4 hover:border-blue-300 hover:shadow transition-all duration-200"
          >
            <div className="text-blue-700">{c.icon}</div>
            <div className="text-xs md:text-sm font-medium text-blue-900 group-hover:text-blue-700">{c.label}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}


