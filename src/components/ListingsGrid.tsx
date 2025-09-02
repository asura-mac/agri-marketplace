"use client";
import { useState, useEffect, useCallback } from "react";
import { getActiveListings, searchListings } from "@/lib/listings-utils";
import type { Listing } from "@/lib/listings-utils";
import { useSearch } from "@/contexts/SearchContext";
import ListingCard from "./ListingCard";

type ListingsGridProps = {
  category?: string;
  itemsPerPage?: number;
};

export default function ListingsGrid({ category, itemsPerPage = 12 }: ListingsGridProps) {
  const { searchParams, isSearchActive, isFilterActive, clearSearch, clearStateFilter } = useSearch();
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
      
      // Use search functionality if search params exist, otherwise use regular fetch
      const searchActive = Boolean(searchParams.searchQuery?.trim() || searchParams.state);
      
      let data: Listing[];
      if (searchActive) {
        data = await searchListings({
          ...searchParams,
          category: category || searchParams.category,
          limit: undefined // Get all results for client-side pagination
        });
      } else {
        data = await getActiveListings(category);
      }
      
      setListings(data);
      setHasMore(data.length > itemsPerPage);
      setCurrentPage(1);
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Failed to load listings. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [category, itemsPerPage, searchParams]);

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

  // Create search/filter status component
  const SearchFilterStatus = () => {
    if (!isSearchActive && !isFilterActive) return null;
    
    return (
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {isSearchActive && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Search: &ldquo;{searchParams.searchQuery}&rdquo;
              </span>
            )}
            {isFilterActive && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                State: {searchParams.state}
              </span>
            )}
            <span className="text-sm text-gray-600">
              {listings.length} listing{listings.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <SearchFilterStatus />
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
      <div className="space-y-6">
        <SearchFilterStatus />
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
      </div>
    );
  }

  // Empty state
  if (listings.length === 0) {
    
    return (
      <div className="space-y-6">
        <SearchFilterStatus />
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isSearchActive || isFilterActive ? 'No Results Found' : 'No Listings Available'}
            </h3>
            <p className="text-gray-600 mb-4">
              {isSearchActive || isFilterActive 
                ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                : category 
                  ? `No ${category} listings are available right now.`
                  : 'No products are listed yet. Be the first to list your products!'}
            </p>
            {(isSearchActive || isFilterActive) && (
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                {isSearchActive && (
                  <button
                    onClick={clearSearch}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                  >
                    Clear Search
                  </button>
                )}
                {isFilterActive && (
                  <button
                    onClick={clearStateFilter}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchFilterStatus />
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
