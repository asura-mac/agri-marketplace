"use client";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import { CubeIcon, ShoppingBagIcon, BuildingStorefrontIcon, BeakerIcon, SparklesIcon, BugAntIcon, CakeIcon, WrenchScrewdriverIcon, CpuChipIcon, BoltIcon, PhotoIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import GrainsIcon from "./Icons/GrainsIcon";

type Category = {
  key: string;
  label: string;
  icon: ReactNode;
};

const getCategoriesData = (t: (key: string) => string): Category[] => [
  { key: "grains", label: t('categories.grains'), icon: <GrainsIcon className="w-7 h-7" /> },
  { key: "pulses", label: t('categories.pulses'), icon: <CubeIcon className="w-7 h-7" /> },
  { key: "fruits", label: t('categories.fruits'), icon: <ShoppingBagIcon className="w-7 h-7" /> },
  { key: "vegetables", label: t('categories.vegetables'), icon: <BoltIcon className="w-7 h-7" /> },
  { key: "oilseeds", label: t('categories.oilseeds'), icon: <BeakerIcon className="w-7 h-7" /> },
  { key: "seeds", label: t('categories.seeds'), icon: <CpuChipIcon className="w-7 h-7" /> },
  { key: "spices", label: t('categories.spices'), icon: <SparklesIcon className="w-7 h-7" /> },
  { key: "flowers", label: t('categories.flowers'), icon: <BugAntIcon className="w-7 h-7" /> },
  { key: "tea", label: t('categories.tea'), icon: <CakeIcon className="w-7 h-7" /> },
  { key: "nuts", label: t('categories.nuts'), icon: <CpuChipIcon className="w-7 h-7" /> },
  { key: "dairy", label: t('categories.dairy'), icon: <BuildingStorefrontIcon className="w-7 h-7" /> },
  { key: "fish", label: t('categories.fish'), icon: <PhotoIcon className="w-7 h-7" /> },
  { key: "fertilizer", label: t('categories.fertilizer'), icon: <BeakerIcon className="w-7 h-7" /> },
  { key: "equipment", label: t('categories.equipment'), icon: <WrenchScrewdriverIcon className="w-7 h-7" /> },
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


