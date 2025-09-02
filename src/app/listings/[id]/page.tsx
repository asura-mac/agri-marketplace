"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPinIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { 
  WhatsappIcon,
  DirectionsIcon,
  CallIcon
} from "@/components/ContactIcons";
import { fetchListingById, fetchSellerListings, type ListingWithProfile, type Listing } from "@/lib/listings-utils";

export default function ListingDetailPage() {
  const params = useParams();
  const listingId = params.id as string;

  const [listing, setListing] = useState<ListingWithProfile | null>(null);
  const [relatedListings, setRelatedListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function loadListingData() {
      try {
        setLoading(true);
        
        // Fetch the main listing
        const listingData = await fetchListingById(listingId);
        
        if (!listingData) {
          setError("Listing not found");
          return;
        }
        
        setListing(listingData);
        
        // Fetch related listings from the same seller
        const relatedData = await fetchSellerListings(listingData.user_id, listingId, 6);
        setRelatedListings(relatedData);
        
      } catch (error) {
        console.error('Error loading listing:', error);
        setError("Failed to load listing");
      } finally {
        setLoading(false);
      }
    }

    if (listingId) {
      loadListingData();
    }
  }, [listingId]);

  const nextImage = () => {
    if (listing && listing.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === listing.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (listing && listing.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? listing.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 animate-pulse">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error || "Listing not found"}
          </h1>
          <p className="text-gray-600 mb-4">
            The listing you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:block bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Product Info */}
            <div className="p-8">
              {/* Product Title and Price */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {listing.product_name}
                </h1>
                <div className="text-2xl font-bold text-gray-900">
                  $ {listing.price_per_unit}/{listing.unit}
                </div>
              </div>

              {/* Minimum Order */}
              <div className="mb-6">
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="text-sm text-gray-600 mb-1">Minimum Order Quantity</div>
                  <div className="text-lg font-semibold">{listing.minimum_order}{listing.unit}</div>
                </div>
              </div>

              {/* State and District */}
              <div className="mb-6 flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  {[listing.state, listing.district].filter(Boolean).join(', ') || 'Location not specified'}
                </span>
              </div>

              {/* Contact Buttons */}
              <div className="mb-8 flex gap-3">
                <CallIcon phone={listing.contact_phone} />
                {/* <DirectionsIcon /> */}
                <WhatsappIcon phone={listing.whatsapp_number} />
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative">
              {listing.images.length > 0 ? (
                <div className="relative h-full min-h-96">
                  <Image
                    src={listing.images[currentImageIndex]}
                    alt={listing.product_name}
                    fill
                    className="object-cover"
                  />
                  {listing.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                      >
                        <ChevronLeftIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                      >
                        <ChevronRightIcon className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="h-full min-h-96 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No images available</span>
                </div>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="p-8 border-t bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {listing.product_description}
            </p>
          </div>

          {/* Seller Profile Section */}
          <div className="p-8 border-t bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {listing.user_profiles?.role === 'farmer' ? 'Farmer' : 'Trader'} Profile
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                listing.user_profiles?.role === 'farmer' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {listing.user_profiles?.role?.toUpperCase() || 'TRADER'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-gray-600 mb-1">State</div>
                <div className="font-medium">{listing.user_profiles?.state || 'Not specified'}</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Contact</div>
                <div className="font-medium">{listing.contact_phone}</div>
              </div>
            </div>
          </div>

          {/* Related Listings */}
          {relatedListings.length > 0 && (
            <div className="p-8 border-t bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                See More Product From{' '}
                <span className="underline">
                  {listing.user_profiles?.role === 'farmer' ? 'Farmer' : 'Trader'}
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {relatedListings.slice(0, 2).map((relatedListing) => (
                  <div key={relatedListing.id} className="bg-white rounded-lg border p-4">
                    <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                      {relatedListing.images.length > 0 ? (
                        <Image
                          src={relatedListing.images[0]}
                          alt={relatedListing.product_name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No image</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {relatedListing.product_name}
                      </h3>
                      <div className="text-lg font-bold text-gray-900">
                        ₹ {relatedListing.price_per_unit}/{relatedListing.unit.toUpperCase()}
                      </div>
                      <div className="text-sm text-gray-600">
                        Minimum Order Qty. {relatedListing.minimum_order}{relatedListing.unit}
                      </div>
                      
                      {/* Category Badge */}
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          relatedListing.category === 'fruits' ? 'bg-orange-100 text-orange-800' :
                          relatedListing.category === 'grains' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {relatedListing.category.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{relatedListing.state},{relatedListing.district}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden bg-white">
          {/* Product Header */}
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              {listing.product_name}
            </h1>
            <div className="text-lg font-semibold text-gray-900">
              $ {listing.price_per_unit}/{listing.unit}
            </div>
          </div>

          {/* Minimum Order */}
          <div className="p-4 border-b">
            <div className="text-sm text-gray-600">Minimum Order Quantity</div>
            <div className="font-medium">{listing.minimum_order}{listing.unit}</div>
          </div>

          {/* Location */}
          <div className="p-4 border-b flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              {[listing.state, listing.district].filter(Boolean).join(', ') || 'Location not specified'}
            </span>
          </div>

          {/* Contact Buttons */}
          <div className="p-4 border-b">
            <div className="flex gap-2">
              <CallIcon phone={listing.contact_phone} />
              <DirectionsIcon />
              <WhatsappIcon phone={listing.whatsapp_number} />
            </div>
          </div>

          {/* Image Gallery */}
          <div className="relative">
            {listing.images.length > 0 ? (
              <div className="aspect-square relative">
                <Image
                  src={listing.images[currentImageIndex]}
                  alt={listing.product_name}
                  fill
                  className="object-cover"
                />
                {listing.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No images available</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {listing.product_description}
            </p>
          </div>

          {/* Seller Info */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {listing.user_profiles?.role === 'farmer' ? 'Farmer' : 'Trader'}
              </h2>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                listing.user_profiles?.role === 'farmer' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {listing.user_profiles?.role?.toUpperCase() || 'TRADER'}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">State</span>
                <span className="font-medium">{listing.user_profiles?.state || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contact</span>
                <span className="font-medium">{listing.contact_phone}</span>
              </div>
            </div>
          </div>

          {/* Related Listings */}
          {relatedListings.length > 0 && (
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                See More Product From{' '}
                <span className="underline">
                  {listing.user_profiles?.role === 'farmer' ? 'Farmer' : 'Trader'}
                </span>
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {relatedListings.map((relatedListing) => (
                  <Link 
                    key={relatedListing.id}
                    href={`/listings/${relatedListing.id}`}
                    className="flex-shrink-0 w-48 bg-white border rounded-lg p-3"
                  >
                    <div className="relative aspect-square mb-3 rounded-lg overflow-hidden">
                      {relatedListing.images.length > 0 ? (
                        <Image
                          src={relatedListing.images[0]}
                          alt={relatedListing.product_name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                        {relatedListing.product_name}
                      </h3>
                      <div className="text-sm font-bold text-gray-900">
                        ₹ {relatedListing.price_per_unit}/{relatedListing.unit.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-600">
                        Min Order: {relatedListing.minimum_order}{relatedListing.unit}
                      </div>
                      
                      {/* Category Badge */}
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        relatedListing.category === 'fruits' ? 'bg-orange-100 text-orange-800' :
                        relatedListing.category === 'grains' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {relatedListing.category.toUpperCase()}
                      </span>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPinIcon className="w-3 h-3" />
                        <span className="truncate">{relatedListing.state},{relatedListing.district}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}