"use client";
import { useState, useEffect, useCallback } from "react";
import { getActiveListings } from "@/lib/listings-utils";
import type { Listing } from "@/lib/listings-utils";
import ListingCard from "./ListingCard";

type ListingsGridProps = {
  category?: string;
  itemsPerPage?: number;
};

export default function ListingsGrid({ category, itemsPerPage = 12 }: ListingsGridProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = listings.slice(0, endIndex);
  const remainingItems = listings.length - endIndex;

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getActiveListings(category);
      setListings(data);
      setHasMore(data.length > itemsPerPage);
      setCurrentPage(1);
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Failed to load listings. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [category, itemsPerPage]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const loadMore = () => {
    if (remainingItems > 0) {
      setCurrentPage(prev => prev + 1);
      if (remainingItems <= itemsPerPage) {
        setHasMore(false);
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ListingCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchListings}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-6v10M9 7l3 3 3-3" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings found</h3>
          <p className="text-gray-600 mb-4">
            {category ? `No ${category} listings are available right now.` : 'No products are listed yet.'}
          </p>
          <p className="text-gray-500 text-sm">
            Be the first to list your products!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {currentListings.length} of {listings.length} products
          {category && ` in ${category}`}
        </p>
        
        {/* Sort options - can be expanded later */}
        <div className="text-sm text-gray-500">
          Sorted by most recent
        </div>
      </div>

      {/* Listings grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {/* Load more button */}
      {hasMore && remainingItems > 0 && (
        <div className="text-center pt-8">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Load More ({remainingItems} remaining)
          </button>
        </div>
      )}

      {/* End message */}
      {!hasMore && listings.length > itemsPerPage && (
        <div className="text-center pt-8">
          <p className="text-gray-500">You&apos;ve reached the end of the listings</p>
        </div>
      )}
    </div>
  );
}

// Skeleton loading component
function ListingCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200"></div>
      
      {/* Content skeleton */}
      <div className="p-4">
        {/* Title and price skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        
        {/* Minimum order skeleton */}
        <div className="space-y-1 mb-3">
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
        
        {/* Category badge skeleton */}
        <div className="mb-3">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>
        
        {/* Location skeleton */}
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}
