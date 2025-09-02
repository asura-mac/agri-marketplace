"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ListingSearchParams } from '@/lib/listings-utils';

interface SearchContextType {
  searchParams: ListingSearchParams;
  updateSearchParams: (params: Partial<ListingSearchParams>) => void;
  clearSearch: () => void;
  clearStateFilter: () => void;
  isSearchActive: boolean;
  isFilterActive: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

interface SearchProviderProps {
  children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchParams, setSearchParams] = useState<ListingSearchParams>({});

  const updateSearchParams = useCallback((params: Partial<ListingSearchParams>) => {
    setSearchParams(prev => ({ ...prev, ...params }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchParams(prev => ({ ...prev, searchQuery: undefined }));
  }, []);

  const clearStateFilter = useCallback(() => {
    setSearchParams(prev => ({ ...prev, state: undefined }));
  }, []);

  const isSearchActive = Boolean(searchParams.searchQuery?.trim());
  const isFilterActive = Boolean(searchParams.state);

  const value: SearchContextType = {
    searchParams,
    updateSearchParams,
    clearSearch,
    clearStateFilter,
    isSearchActive,
    isFilterActive,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}
