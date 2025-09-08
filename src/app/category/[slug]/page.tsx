"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from 'react-i18next';
import ListingsGrid from "@/components/ListingsGrid";
import Breadcrumb from "@/components/Breadcrumb";


// Valid category keys that exist in translation files
const validCategories = [
  'grains', 'pulses', 'fruits', 'vegetables', 'oilseeds', 
  'seeds', 'spices', 'flowers', 'tea', 'nuts', 'dairy', 
  'fish', 'honey', 'cattlefeed', 'nurseryplants', 'ayurvedic', 
  'fertilizer', 'equipment'
];

export default function CategoryPage() {
  const { t } = useTranslation();
  const params = useParams();
  const category = params.slug as string;

  // Check if category is valid
  if (!validCategories.includes(category)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t('common.categoryNotFound')}
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            ← {t('navigation.backToHome')}
          </Link>
        </div>
      </div>
    );
  }

  // Get translated category name
  const categoryLabel = t(`categories.${category}`);

  const breadcrumbItems = [
    { label: t('navigation.home'), href: '/' },
    { label: t('navigation.categories') },
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
            {t('navigation.backToHome')}
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('listing.categoryProducts', { category: categoryLabel })}
          </h1>
          <p className="text-gray-600">
            {t('listing.browseCategoryDescription', { category: categoryLabel.toLowerCase() })}
          </p>
        </div>

        {/* Listings */}
        <ListingsGrid category={category} itemsPerPage={16} />
      </div>
    </div>
  );
}