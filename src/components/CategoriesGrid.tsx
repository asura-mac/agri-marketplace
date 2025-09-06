"use client";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import GrainsIcon from "./Icons/GrainsIcon";
import PulsesIcon from "./Icons/PulsesIcon";
import FruitsIcon from "./Icons/FruitsIcon";
import VegetablesIcon from "./Icons/VegetablesIcon";
import OilseedsIcon from "./Icons/OilseedsIcon";
import SeedsIcon from "./Icons/SeedsIcon";
import SpicesIcon from "./Icons/SpicesIcon";
import FlowersIcon from "./Icons/FlowersIcon";
import TeaIcon from "./Icons/TeaIcon";
import NutsIcon from "./Icons/NutsIcon";
import DairyIcon from "./Icons/DairyIcon";
import HoneyIcon from "./Icons/HoneyIcon";
import CattleFoodIcon from "./Icons/CattleFoodIcon";
import NurseryPlantIcon from "./Icons/NurseryPlantIcon";
import AyurvedicIcon from "./Icons/AyurvedicIcon";
import FishIcon from "./Icons/FishIcon";
import FertilizerIcon from "./Icons/FertilizerIcon";
import EquipmentIcon from "./Icons/EquipmentIcon";


type Category = {
  key: string;
  label: string;
  icon: ReactNode;
};

const getCategoriesData = (t: (key: string) => string): Category[] => [
  { key: "grains", label: t('categories.grains'), icon: <GrainsIcon className="w-7 h-7" /> },
  { key: "pulses", label: t('categories.pulses'), icon: <PulsesIcon className="w-7 h-7" /> },
  { key: "fruits", label: t('categories.fruits'), icon: <FruitsIcon className="w-7 h-7" /> },
  { key: "vegetables", label: t('categories.vegetables'), icon: <VegetablesIcon className="w-7 h-7" /> },
  { key: "oilseeds", label: t('categories.oilseeds'), icon: <OilseedsIcon className="w-7 h-7" /> },
  { key: "seeds", label: t('categories.seeds'), icon: <SeedsIcon className="w-7 h-7" /> },
  { key: "spices", label: t('categories.spices'), icon: <SpicesIcon className="w-7 h-7" /> },
  { key: "flowers", label: t('categories.flowers'), icon: <FlowersIcon className="w-7 h-7" /> },
  { key: "tea", label: t('categories.tea'), icon: <TeaIcon className="w-7 h-7" /> },
  { key: "nuts", label: t('categories.nuts'), icon: <NutsIcon className="w-7 h-7" /> },
  { key: "dairy", label: t('categories.dairy'), icon: <DairyIcon className="w-7 h-7" /> },
  { key: "honey", label: t('categories.honey'), icon: <HoneyIcon className="w-7 h-7" /> },
  { key: "cattlefeed", label: t('categories.cattlefeed'), icon: <CattleFoodIcon className="w-7 h-7" /> },
  { key: "nurseryplants", label: t('categories.nurseryplants'), icon: <NurseryPlantIcon className="w-7 h-7" /> },
  { key: "ayurvedic", label: t('categories.ayurvedic'), icon: <AyurvedicIcon className="w-7 h-7" /> },  
  { key: "fish", label: t('categories.fish'), icon: <FishIcon className="w-7 h-7" /> },
  { key: "fertilizer", label: t('categories.fertilizer'), icon: <FertilizerIcon className="w-7 h-7" /> },
  { key: "equipment", label: t('categories.equipment'), icon: <EquipmentIcon className="w-7 h-7" /> },

];

export default function CategoriesGrid() {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  
  const categories = getCategoriesData(t);
  const visibleCategories = showAll ? categories : categories.slice(0, 6);
  const hasMoreCategories = categories.length > 6;
  return (
    <section className="px-4 md:px-6 py-4">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
        {visibleCategories.map((c) => (
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

      {hasMoreCategories && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-4 py-2 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
            >
              <span>{showAll ? t('common.showLess') : t('common.more')}</span>
              {showAll ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>
        </div>    
        )}
    </section>
  );
}


