"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import { MapPinIcon } from "@heroicons/react/24/outline";
import type { Listing } from "@/lib/listings-utils";

// Category icon mapping
const categoryIcons: Record<string, string> = {
  grains: "🌾",
  pulses: "🫘", 
  fruits: "🍎",
  vegetables: "🥕",
  oilseeds: "🌻",
  seeds: "🌱",
  spices: "🌶️",
  flowers: "🌸",
  tea: "🍃",
  nuts: "🥜",
  dairy: "🥛",
  fish: "🐟",
  fertilizer: "🧪",
  equipment: "🚜",
};

// Category display names helper
const getCategoryName = (category: string, t: (key: string) => string): string => {
  return t(`categories.${category}`).toUpperCase();
};

// Category colors
const categoryColors: Record<string, string> = {
  grains: "bg-yellow-100 text-yellow-800",
  pulses: "bg-green-100 text-green-800",
  fruits: "bg-orange-100 text-orange-800",
  vegetables: "bg-green-100 text-green-800",
  oilseeds: "bg-yellow-100 text-yellow-800",
  seeds: "bg-green-100 text-green-800",
  spices: "bg-red-100 text-red-800",
  flowers: "bg-pink-100 text-pink-800",
  tea: "bg-green-100 text-green-800",
  nuts: "bg-amber-100 text-amber-800",
  dairy: "bg-blue-100 text-blue-800",
  fish: "bg-cyan-100 text-cyan-800",
  fertilizer: "bg-gray-100 text-gray-800",
  equipment: "bg-gray-100 text-gray-800",
};

type ListingCardProps = {
  listing: Listing;
  onClick?: () => void;
  showContact?: boolean;
};

export default function ListingCard({ listing, onClick, showContact = false }: ListingCardProps) {
  const { t } = useTranslation();
  const image = listing.images?.[0] || "/next.svg";
  const categoryIcon = categoryIcons[listing.category] || "📦";
  const categoryName = getCategoryName(listing.category, t);
  const categoryColor = categoryColors[listing.category] || "bg-gray-100 text-gray-800";

  const cardContent = (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer">
      {/* Image Section */}
      <div className="relative w-full h-48 bg-gray-50">
        <Image
          src={image}
          alt={listing.product_name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Blue accent bar */}
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Product Name and Price */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 truncate">
              {listing.product_name}
            </h3>
            <div className="text-lg font-bold text-gray-900">
              ₹ {listing.price_per_unit}/{t(`units.${listing.unit}`)}
            </div>
          </div>
        </div>

        {/* Minimum Order */}
        <div className="mb-3">
          <div className="text-sm text-gray-800">
            <span className="font-medium">{t('listing.minimumOrder')}</span>
          </div>
          <div className="text-sm font-semibold text-black">
            {listing.minimum_order} {t(`units.${listing.unit}`)}
          </div>
        </div>

        {/* Category Badge */}
        <div className="flex items-center justify-between mb-3">
          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
            <span>{categoryIcon}</span>
            <span>{categoryName}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-800">
          <MapPinIcon className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">
            {[listing.state, listing.district].filter(Boolean).join(', ') || t('listing.locationNotSpecified')}
          </span>
        </div>

        {/* Contact Information (conditionally shown) */}
        {showContact && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-700 mb-1">{t('listing.contact')}</div>
            <div className="text-sm font-medium text-blue-600">
              {listing.contact_phone}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link href={`/listings/${listing.id}`}>
      {cardContent}
    </Link>
  );
}


