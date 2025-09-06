"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@/app/providers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

// Import icons from Heroicons
import {   
} from "@heroicons/react/24/outline";
import GrainsIcon from "@/components/Icons/GrainsIcon";
import PulsesIcon from "@/components/Icons/PulsesIcon";
import FruitsIcon from "@/components/Icons/FruitsIcon";
import VegetablesIcon from "@/components/Icons/VegetablesIcon";
import OilseedsIcon from "@/components/Icons/OilseedsIcon";
import SeedsIcon from "@/components/Icons/SeedsIcon";
import SpicesIcon from "@/components/Icons/SpicesIcon";
import FlowersIcon from "@/components/Icons/FlowersIcon";
import TeaIcon from "@/components/Icons/TeaIcon";
import NutsIcon from "@/components/Icons/NutsIcon";
import DairyIcon from "@/components/Icons/DairyIcon";
import FishIcon from "@/components/Icons/FishIcon";
import FertilizerIcon from "@/components/Icons/FertilizerIcon";
import EquipmentIcon from "@/components/Icons/EquipmentIcon";
import HoneyIcon from "@/components/Icons/HoneyIcon";
import CattleFoodIcon from "@/components/Icons/CattleFoodIcon";
import NurseryPlantIcon from "@/components/Icons/NurseryPlantIcon";
import AyurvedicIcon from "@/components/Icons/AyurvedicIcon";

type Category = {
  key: string;
  label: string;
  icon: ReactNode;
  description: string;
};

const categories: Category[] = [
  { 
    key: "grains", 
    label: "Grains", 
    icon: <GrainsIcon className="w-8 h-8" />, 
    description: "Rice, wheat, corn, barley, and other cereals" 
  },
  { 
    key: "pulses", 
    label: "Pulses", 
    icon: <PulsesIcon className="w-8 h-8" />, 
    description: "Lentils, chickpeas, beans, and legumes" 
  },
  { 
    key: "fruits", 
    label: "Fruits", 
    icon: <FruitsIcon className="w-8 h-8" />, 
    description: "Fresh fruits, seasonal produce" 
  },
  { 
    key: "vegetables", 
    label: "Vegetables", 
    icon: <VegetablesIcon className="w-8 h-8" />, 
    description: "Fresh vegetables, leafy greens, root vegetables" 
  },
  { 
    key: "oilseeds", 
    label: "Oilseeds", 
    icon: <OilseedsIcon className="w-8 h-8" />, 
    description: "Sunflower, mustard, sesame, and other oil seeds" 
  },
  { 
    key: "seeds", 
    label: "Seeds", 
    icon: <SeedsIcon className="w-8 h-8" />, 
    description: "Seeds for planting and cultivation" 
  },
  { 
    key: "spices", 
    label: "Spices", 
    icon: <SpicesIcon className="w-8 h-8" />, 
    description: "Turmeric, chili, coriander, and aromatic spices" 
  },
  { 
    key: "flowers", 
    label: "Flowers", 
    icon: <FlowersIcon className="w-8 h-8" />, 
    description: "Fresh flowers, garlands, decorative flowers" 
  },
  { 
    key: "tea", 
    label: "Tea", 
    icon: <TeaIcon className="w-8 h-8" />, 
    description: "Tea leaves, herbal teas, organic varieties" 
  },
  { 
    key: "nuts", 
    label: "Nuts", 
    icon: <NutsIcon className="w-8 h-8" />, 
    description: "Almonds, cashews, walnuts, and dry fruits" 
  },
  { 
    key: "dairy", 
    label: "Dairy", 
    icon: <DairyIcon className="w-8 h-8" />, 
    description: "Milk, cheese, butter, and dairy products" 
  },
  { 
    key: "fish", 
    label: "Fish", 
    icon: <FishIcon className="w-8 h-8" />, 
    description: "Fresh fish, seafood, aquaculture products" 
  },
  { 
    key: "fertilizer", 
    label: "Fertilizer", 
    icon: <FertilizerIcon className="w-8 h-8" />, 
    description: "Organic and chemical fertilizers, soil enhancers" 
  },
  { 
    key: "equipment", 
    label: "Equipment", 
    icon: <EquipmentIcon className="w-8 h-8" />, 
    description: "Farming tools, machinery, and agricultural equipment" 
  },
  { 
    key: "honey", 
    label: "Honey", 
    icon: <HoneyIcon className="w-8 h-8" />, 
    description: "Honey, bee products, and honey-based products" 
  },
  { 
    key: "cattlefeed", 
    label: "Cattle Feed", 
    icon: <CattleFoodIcon className="w-8 h-8" />, 
    description: "Cattle feed, poultry feed, and other animal feed" 
  },
  { 
    key: "nurseryplants", 
    label: "Nursery Plants", 
    icon: <NurseryPlantIcon className="w-8 h-8" />, 
    description: "Nursery plants, seeds, and other nursery products" 
  },
  { 
    key: "ayurvedic", 
    label: "Ayurvedic", 
    icon: <AyurvedicIcon className="w-8 h-8" />, 
    description: "Ayurvedic products, herbs, and other ayurvedic products" 
  },
];

export default function SellPage() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-blue-700">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            {t("common.postYourAd")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the category that best describes what you want to sell. This
            helps buyers find your products more easily.
          </p>
        </div>

        {/* Category Selection Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            CHOOSE A CATEGORY
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.key}
                href={`/sell/${category.key}`}
                className="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 text-blue-600 group-hover:text-blue-700">
                    {category.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-900 mb-1">
                      {category.label}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Need Help?
          </h3>
          <p className="text-blue-700 mb-4">
            Can&apos;t find the right category? Contact our support team for
            assistance.
          </p>
          <Link
            href={`https://evoolfoundation.org/contact-us`}
            target="_blank"
          >
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
