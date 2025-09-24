"use client";
import Image from "next/image";
import { useAuth } from "@/app/providers";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { getUserLocation } from "@/lib/auth-utils";
import { useSearch } from "@/contexts/SearchContext";
import { useOnboardingProtection } from "@/contexts/OnboardingProtectionContext";
import { INDIAN_STATES_AND_UTS } from "@/lib/constants";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import {
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  ChevronDownIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const {
    searchParams,
    updateSearchParams,
    clearSearch,
    clearStateFilter,
    isSearchActive,
    isFilterActive,
  } = useSearch();
  const { isNavigationBlocked, attemptNavigation } = useOnboardingProtection();
  const { t } = useTranslation();

  // const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileFilterDropdownRef = useRef<HTMLDivElement>(null);
  const desktopFilterDropdownRef = useRef<HTMLDivElement>(null);

  const [locationLabel, setLocationLabel] = useState<string>(
    t("header.setLocation")
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const fetchUserLocation = useCallback(async () => {
    if (!user) return;

    const location = await getUserLocation(user.id);
    setLocationLabel(location);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserLocation();
    } else {
      // Reset location label when user logs out
      setLocationLabel(t("header.setLocation"));
    }
  }, [user, fetchUserLocation, t]);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams({ searchQuery: searchQuery.trim() });
    // Navigate to home page to show search results
    router.push("/");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    clearSearch();
  };

  // Handle state filter
  const handleStateFilter = (state: string) => {
    updateSearchParams({ state });
    setShowFilterDropdown(false);
    // Navigate to home page to show filtered results
    router.push("/");
  };

  const handleClearStateFilter = () => {
    clearStateFilter();
    setShowFilterDropdown(false);
  };

  // Handle click outside events
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Close filter dropdowns if clicking outside
      if (
        mobileFilterDropdownRef.current &&
        !mobileFilterDropdownRef.current.contains(target) &&
        desktopFilterDropdownRef.current &&
        !desktopFilterDropdownRef.current.contains(target)
      ) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sync search query with context
  useEffect(() => {
    setSearchQuery(searchParams.searchQuery || "");
  }, [searchParams.searchQuery]);

  return (
    <header className="w-full bg-white border-b">
      {/* Mobile */}
      <div className="md:hidden px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => attemptNavigation("/")}
            disabled={isNavigationBlocked}
            className={isNavigationBlocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          >
            <Image
              src="/KM-LOGO-FULLV2.png"
              alt="Kisan Near Me Logo"
              width={119}
              height={39.5}
              className="cursor-pointer"
            />
          </button>
        </div>

        <div className="flex items-center justify-center gap-5">
          <LanguageSelector />

          <button
            onClick={() => attemptNavigation("/sell")}
            disabled={isNavigationBlocked}
            className={`px-3 py-2 text-sm font-medium rounded-md text-center ${
              isNavigationBlocked 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {t("header.sell")}
          </button>
          <div>
            {!loading && user ? (
              <button
                onClick={() => attemptNavigation("/profile")}
                disabled={isNavigationBlocked}
                className={`flex items-center text-sm font-medium ${
                  isNavigationBlocked 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-blue-700'
                }`}
              >
                <UserCircleIcon className={`transform h-7 w-7 mr-2 ${
                  isNavigationBlocked ? 'text-gray-400' : 'text-blue-700'
                }`} />
                {/* {t("header.profile")} */}
              </button>
            ) : (
              <button
                onClick={() => attemptNavigation("/login")}
                disabled={isNavigationBlocked}
                className={`flex items-center text-sm font-medium ${
                  isNavigationBlocked 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-blue-700'
                }`}
              >
                <UserCircleIcon className={`transform h-7 w-7 mr-2 ${
                  isNavigationBlocked ? 'text-gray-400' : 'text-blue-700'
                }`} />
                {/* {t("header.login")} */}
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center gap-2"
        >
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={t("header.searchPlaceholderMobile")}
              className="w-full h-10 rounded-md border pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
            {isSearchActive && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Mobile Filter Button + Dropdown */}
          <div className="relative" ref={mobileFilterDropdownRef}>
            <button
              type="button"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`h-10 px-3 rounded-md border flex items-center gap-1 transition-colors ${
                isFilterActive
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FunnelIcon className="h-4 w-4" />
              {/* Show selected state in mobile */}
              {isFilterActive && (
                <span className="text-xs text-blue-600 ml-1">
                  ({searchParams.state})
                </span>
              )}
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {/* Header */}
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      {t("search.filterByState")}
                    </h3>
                    {isFilterActive && (
                      <button
                        type="button"
                        onClick={handleClearStateFilter}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        {t("header.clearFilter")}
                      </button>
                    )}
                  </div>
                  {isFilterActive && (
                    <p className="text-xs text-gray-500 mt-1">
                      {t("search.showingListings", {
                        state: searchParams.state,
                      })}
                    </p>
                  )}
                </div>

                {/* List of States */}
                <div className="max-h-40 overflow-y-auto">
                  {INDIAN_STATES_AND_UTS.map((state) => (
                    <button
                      key={state}
                      type="button" // ✅ prevents accidental form submission
                      onClick={() => {
                        handleStateFilter(state); // updates context
                        setTimeout(() => setShowFilterDropdown(false), 0); // ✅ close after state updates
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                        searchParams.state === state
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-4 px-6 py-4">
        <div className="mr-auto flex items-center gap-4">
          <button
            onClick={() => attemptNavigation("/")}
            disabled={isNavigationBlocked}
            className={isNavigationBlocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          >
            <Image
              src="/KM-LOGO-FULLV2.png"
              alt="Kisan Near Me Logo"
              width={140}
              height={36}
              className="cursor-pointer"
            />
          </button>
          <button
            onClick={() => attemptNavigation("/profile")}
            disabled={isNavigationBlocked}
            className={`flex items-center text-sm font-medium truncate ${
              isNavigationBlocked 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-blue-700'
            }`}
          >
            <MapPinIcon className={`transform h-5 w-5 mr-2 ${
              isNavigationBlocked ? 'text-gray-400' : 'text-blue-700'
            }`} />
            {locationLabel}
          </button>
          {/* <div className="text-blue-700 font-medium">{locationLabel}</div> */}
        </div>

        {/* Desktop Search Bar */}
        <div className="flex-1 max-w-xl">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center gap-3"
          >
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={t("header.searchPlaceholder")}
                className="w-full h-10 rounded-md border pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              />
              {isSearchActive && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Desktop Filter Button */}
            <div className="relative" ref={desktopFilterDropdownRef}>
              <button
                type="button"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`h-10 px-4 rounded-md border flex items-center gap-2 transition-colors ${
                  isFilterActive
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FunnelIcon className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {t("header.filter")}
                </span>
                {isFilterActive && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-xs">({searchParams.state})</span>
                  </div>
                )}
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${
                    showFilterDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Filter Dropdown */}
              {showFilterDropdown && (
                <div className="absolute right-0 top-12 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        {t("search.filterByState")}
                      </h3>
                      {isFilterActive && (
                        <button
                          onClick={handleClearStateFilter}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {t("header.clearFilter")}
                        </button>
                      )}
                    </div>
                    {isFilterActive && (
                      <p className="text-xs text-gray-500 mt-1">
                        {t("search.showingListings", {
                          state: searchParams.state,
                        })}
                      </p>
                    )}
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {INDIAN_STATES_AND_UTS.map((state) => (
                      <button
                        key={state}
                        onClick={() => handleStateFilter(state)}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                          searchParams.state === state
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => attemptNavigation("/sell")}
            disabled={isNavigationBlocked}
            className={`px-4 py-2 font-medium rounded-md transition-colors ${
              isNavigationBlocked 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {t("header.sell")}
          </button>
          <LanguageSelector />
          <div>
            {!loading && user ? (
              <button
                onClick={() => attemptNavigation("/profile")}
                disabled={isNavigationBlocked}
                className={`flex items-center text-sm font-medium ${
                  isNavigationBlocked 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-blue-700'
                }`}
              >
                <UserCircleIcon className={`transform h-7 w-7 mr-2 ${
                  isNavigationBlocked ? 'text-gray-400' : 'text-blue-700'
                }`} />
                {t("header.profile")}
              </button>
            ) : (
              <button
                onClick={() => attemptNavigation("/login")}
                disabled={isNavigationBlocked}
                className={`flex items-center text-sm font-medium ${
                  isNavigationBlocked 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-blue-700'
                }`}
              >
                <UserCircleIcon className={`transform h-7 w-7 mr-2 ${
                  isNavigationBlocked ? 'text-gray-400' : 'text-blue-700'
                }`} />
                {t("header.login")}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
