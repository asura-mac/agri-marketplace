"use client";

import CategoriesGrid from "@/components/CategoriesGrid";
import ListingsGrid from "@/components/ListingsGrid";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Categories Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <CategoriesGrid />
        </div>
      </div>

      {/* Listings Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("common.freshProduct")}
          </h2>
          <p className="text-gray-600">
            Discover the best agricultural products from verified farmers and traders
          </p>
        </div>
        
        <ListingsGrid itemsPerPage={12} />
      </div>
    </div>
  );
}