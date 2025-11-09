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

export default function SellPage() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const router = useRouter();

  const categories: Category[] = [
    { key: "grains", icon: <GrainsIcon className="w-8 h-8" /> },
    { key: "pulses", icon: <PulsesIcon className="w-8 h-8" /> },
    { key: "fruits", icon: <FruitsIcon className="w-8 h-8" /> },
    { key: "vegetables", icon: <VegetablesIcon className="w-8 h-8" /> },
    { key: "oilseeds", icon: <OilseedsIcon className="w-8 h-8" /> },
    { key: "seeds", icon: <SeedsIcon className="w-8 h-8" /> },
    { key: "spices", icon: <SpicesIcon className="w-8 h-8" /> },
    { key: "flowers", icon: <FlowersIcon className="w-8 h-8" /> },
  { key: "tea", icon: <TeaIcon className="w-8 h-8" /> },
    { key: "nuts", icon: <NutsIcon className="w-8 h-8" /> },
    { key: "dairy", icon: <DairyIcon className="w-8 h-8" /> },
    { key: "honey", icon: <HoneyIcon className="w-8 h-8" /> },
    { key: "cattlefeed", icon: <CattleFoodIcon className="w-8 h-8" /> },
    { key: "nurseryplants", icon: <NurseryPlantIcon className="w-8 h-8" /> },
    { key: "ayurvedic", icon: <AyurvedicIcon className="w-8 h-8" /> },
  { key: "fish", icon: <FishIcon className="w-8 h-8" /> },
    { key: "fertilizer", icon: <FertilizerIcon className="w-8 h-8" /> },
    { key: "equipment", icon: <EquipmentIcon className="w-8 h-8" /> },
  ].map((cat) => ({
    ...cat,
    label: t(`categories.${cat.key}`),
    description: t(`categoryDescriptions.${cat.key}`),
  }));

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
            {t("common.chooseFromCategory")}
          </p>
        </div>

        {/* Category Selection Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {t("common.chooseACategory")}
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
            {t('common.needHelp')}
          </h3>
          <p className="text-blue-700 mb-4">
            {t("common.helpType")}
          </p>
          <Link
            href={`https://evoolfoundation.org/contact-us`}
            target="_blank"
          >
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
              {t("common.ContactSupport")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
