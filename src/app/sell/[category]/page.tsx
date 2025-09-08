"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/providers";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { createListing, getListingForEdit, updateListing } from "@/lib/listings-utils";
import { testAuthAndDatabase } from "@/lib/supabase";
import type { ListingFormData, Listing } from "@/lib/listings-utils";
import Breadcrumb from "@/components/Breadcrumb";
import ImageUpload from "@/components/ImageUpload";
import { INDIAN_STATES_AND_UTS } from "@/lib/constants";
import { detectUserLocation, extractIndianState } from "@/lib/location-utils";
import { useTranslation } from "react-i18next";



const unitOptions = [
  { value: 'kg', label: 'Kilogram (kg)' },
  { value: 'quintal', label: 'Quintal' },
  { value: 'ton', label: 'Ton' },
  { value: 'nos', label: 'Numbers (nos)' },
  { value: 'litre', label: 'Litre' },
  { value: 'dozen', label: 'Dozen' },
] as const;

function CategorySellContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const category = params.category as string;
  const editId = searchParams.get('edit');
  const { t } = useTranslation();

  const categoryLabels: Record<string, string> = {
    grains: t("categories.grains"),
    pulses: t("categories.pulses"),
    fruits: t("categories.fruits"),
    vegetables: t("categories.vegetables"),
    oilseeds: t("categories.oilseeds"),
    seeds: t("categories.seeds"),
    spices: t("categories.spices"),
    flowers: t("categories.flowers"),
    tea: t("categories.tea"),
    nuts: t("categories.nuts"),
    dairy: t("categories.dairy"),
    honey: t("categories.honey"),
    cattlefeed: t("categories.cattlefeed"),
    nurseryplants: t("categories.nurseryplants"),
    ayurvedic: t("categories.ayurvedic"),
    fish: t("categories.fish"),
    fertilizer: t("categories.fertilizer"),
    equipment: t("categories.equipment"),
  };
  
  const categoryLabel = categoryLabels[category] || "Unknown Category";

  // Form state
  const [formData, setFormData] = useState<Omit<ListingFormData, 'category'>>({
    productName: '',
    description: '',
    pricePerUnit: 0,
    unit: 'kg',
    minimumOrder: 0,
    state: '',
    district: '',
    contactPhone: '',
    whatsappNumber: '',
    sameAsPhone: false,
    images: []
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [detecting, setDetecting] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loadingEditData, setLoadingEditData] = useState(false);
  const [editListing, setEditListing] = useState<Listing | null>(null);

  // Check if user is authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Load existing listing data for editing
  useEffect(() => {
    if (editId && user) {
      setIsEditMode(true);
      setLoadingEditData(true);
      
      getListingForEdit(editId)
        .then((listing) => {
          if (listing) {
            setEditListing(listing);
            // Pre-populate form with existing data
            setFormData({
              productName: listing.product_name,
              description: listing.product_description,
              pricePerUnit: listing.price_per_unit,
              unit: listing.unit,
              minimumOrder: listing.minimum_order,
              state: listing.state || '',
              district: listing.district || '',
              contactPhone: listing.contact_phone || '',
              whatsappNumber: listing.whatsapp_number || '',
              sameAsPhone: listing.contact_phone === listing.whatsapp_number,
              images: listing.images || []
            });
          } else {
            console.error('Failed to load listing for editing');
            alert('Could not load listing data. Please try again.');
            router.push('/profile');
          }
        })
        .catch((error) => {
          console.error('Error loading listing for edit:', error);
          alert('Error loading listing data. Please try again.');
          router.push('/profile');
        })
        .finally(() => {
          setLoadingEditData(false);
        });
    }
  }, [editId, user, router]);

  // Load user's location from profile
  useEffect(() => {
    if (user) {
      // You could fetch user's location from profile here
      // For now, we'll let them enter it manually
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-blue-700">{t("common.loading")}</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  if (!categoryLabels[category]) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("common.categoryNotFound")}</h1>
          <Link href="/sell" className="text-blue-600 hover:text-blue-700">
            ← {t("common.backToCat")}
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: `${t("navigation.categories")}`, href: '/sell' },
    { label: categoryLabel, href: `/sell/${category}` },
    { label: `${t("sell.createListing")}` }
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    } else if (formData.productName.length > 100) {
      newErrors.productName = 'Product name must be 100 characters or less';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description must be 500 characters or less';
    }

    if (!formData.pricePerUnit || formData.pricePerUnit <= 0) {
      newErrors.pricePerUnit = 'Price per unit must be greater than 0';
    }

    if (!formData.minimumOrder || formData.minimumOrder <= 0) {
      newErrors.minimumOrder = 'Minimum order must be greater than 0';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.district.trim()) {
      newErrors.district = 'District is required';
    }
  

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Contact phone number is required';
    } else if (!/^[+]?[0-9\s\-()]{10,15}$/.test(formData.contactPhone.trim())) {
      newErrors.contactPhone = 'Please enter a valid phone number (10-15 digits)';
    }

    // WhatsApp validation (optional field)
    if (formData.whatsappNumber && formData.whatsappNumber.trim()) {
      const cleanWhatsApp = formData.whatsappNumber.trim();
      if (!/^(\+)?[0-9]{10,15}$/.test(cleanWhatsApp)) {
        newErrors.whatsappNumber = 'WhatsApp number should contain only digits and optional + sign (10-15 digits)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      const listingData: ListingFormData = {
        ...formData,
        category
      };

      if (isEditMode && editListing) {
        // Update existing listing
        console.log('Updating listing with data:', listingData);
        const success = await updateListing(editListing.id, listingData);

        if (success) {
          console.log('Listing updated successfully, redirecting to:', `/listings/${editListing.id}`);
          router.push(`/listings/${editListing.id}`);
        } else {
          console.error('Failed to update listing - updateListing returned false');
          alert('Error updating listing. Please check the browser console for details and try again.');
        }
      } else {
        // Create new listing
        console.log('Creating listing with data:', listingData);
        const listingId = await createListing(user.id, listingData);

        if (listingId) {
          console.log('Listing created successfully, redirecting to:', `/listings/${listingId}`);
          router.push(`/listings/${listingId}`);
        } else {
          console.error('Failed to create listing - createListing returned null');
          alert('Error creating listing. Please check the browser console for details and try again.');
        }
      }
    } catch (error) {
      console.error('Unexpected error submitting listing:', error);
      alert(`Unexpected error ${isEditMode ? 'updating' : 'creating'} listing. Please check the browser console for details and try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number | string[] | boolean) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-sync WhatsApp when sameAsPhone is checked and phone changes
      if (field === 'contactPhone' && prev.sameAsPhone) {
        updated.whatsappNumber = value as string;
      }
      
      // When sameAsPhone is toggled
      if (field === 'sameAsPhone' && value) {
        updated.whatsappNumber = prev.contactPhone;
      }
      
      return updated;
    });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Clear location error when user types in state or district
    if ((field === 'state' || field === 'district') && locationError) {
      setLocationError(null);
    }
  };

  const handleLocationDetection = async () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    setDetecting(true);
    setLocationError(null);

    try {
      const result = await detectUserLocation();
      
      // Auto-fill form fields if data is available
      const updates: Partial<typeof formData> = {};
      
      // Auto-fill state if detected and matches Indian states
      if (result.state) {
        const indianState = extractIndianState(result);
        if (indianState && (INDIAN_STATES_AND_UTS as readonly string[]).includes(indianState)) {
          updates.state = indianState;
        }
      }
      
      // Auto-fill district if available
      if (result.district) {
        updates.district = result.district;
      }
      
      setFormData(prev => ({ ...prev, ...updates }));
      
      // Clear any existing errors for auto-filled fields
      setErrors(prev => {
        const newErrors = { ...prev };
        if (updates.state) delete newErrors.state;
        if (updates.district) delete newErrors.district;
        return newErrors;
      });
      
    } catch (error) {
      console.error('Location detection failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to detect location';
      setLocationError(errorMessage);
    } finally {
      setDetecting(false);
    }
  };

  // Show loading state while loading edit data
  if (loadingEditData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-blue-700 text-lg mb-2">{t("common.loadingListingData")}...</div>
          <div className="text-gray-500">{t("common.pleaseWaitEditing")}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            {isEditMode ? `${t("profile.edit")} ${categoryLabel} ${t("common.listing")}` : `${t("profile.edit")} ${categoryLabel} ${t("common.listing")}`}
          </h1>
          <p className="text-lg text-gray-600">
            {isEditMode 
              ? t("sell.upateDetails")
              : t("sell.createListingForm")
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Product Details Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              INCLUDE SOME DETAILS
            </h2>

            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => handleInputChange('productName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.productName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter product name"
                  maxLength={100}
                />
                {errors.productName && (
                  <p className="mt-1 text-sm text-red-600">{errors.productName}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.productName.length}/100 characters
                </p>
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe your product..."
                  maxLength={500}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.description.length}/500 characters
                </p>
              </div>
            </div>
          </div>

          {/* Price and Quantity Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              PRICE / UNIT / QUANTITY
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Per Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Per Unit *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.pricePerUnit || ''}
                    onChange={(e) => handleInputChange('pricePerUnit', parseFloat(e.target.value) || 0)}
                    className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                      errors.pricePerUnit ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.pricePerUnit && (
                  <p className="mt-1 text-sm text-red-600">{errors.pricePerUnit}</p>
                )}
              </div>

              {/* Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit *
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value as 'kg' | 'quintal' | 'ton' | 'nos' | 'litre' | 'dozen')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  {unitOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minimum Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Order *
                </label>
                <div className="flex">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.minimumOrder || ''}
                    onChange={(e) => handleInputChange('minimumOrder', parseFloat(e.target.value) || 0)}
                    className={`flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                      errors.minimumOrder ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-700">
                    {formData.unit}
                  </span>
                </div>
                {errors.minimumOrder && (
                  <p className="mt-1 text-sm text-red-600">{errors.minimumOrder}</p>
                )}
              </div>
            </div>
          </div>

          {/* Location & Contact Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              LOCATION & CONTACT DETAILS
            </h2>

            <div className="space-y-4">
              {/* Location Detection Button */}
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-700">
                  Auto-fill location details
                </div>
                <button
                  type="button"
                  onClick={handleLocationDetection}
                  disabled={detecting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-md transition-colors disabled:cursor-not-allowed"
                >
                  {detecting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Detecting...
                    </span>
                  ) : (
                    "📍 Detect Location"
                  )}
                </button>
              </div>
              
              {/* Show error */}
              {locationError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">❌</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-red-800">Location detection failed</div>
                      <div className="text-sm text-red-700 mt-1">{locationError}</div>
                      <div className="text-xs text-red-600 mt-1">
                        Please fill the fields manually or try again.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className={`w-full h-11 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="" disabled>Select your state</option>
                  {INDIAN_STATES_AND_UTS.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Select your state or Union Territory
                </p>
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District *
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.district ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your district"
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.contactPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                  maxLength={15}
                />
                {errors.contactPhone && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Buyers will use this number to contact you directly
                </p>
              </div>

              {/* WhatsApp Number */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="tel"
                      value={formData.whatsappNumber}
                      onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.whatsappNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter WhatsApp number (optional)"
                      maxLength={15}
                    />
                    {errors.whatsappNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.whatsappNumber}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.sameAsPhone}
                        onChange={(e) => {
                          handleInputChange('sameAsPhone', e.target.checked);
                          if (e.target.checked) {
                            handleInputChange('whatsappNumber', formData.contactPhone);
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm text-gray-600">Same as phone number</span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Enable quick communication via WhatsApp for faster responses
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <ImageUpload
              images={formData.images}
              onImagesChange={(images) => handleInputChange('images', images)}
              userId={user.id}
              maxImages={3}
            />
          </div>

          {/* Submit Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              {/* Debug test button - remove in production */}
              <button
                type="button"
                onClick={() => {
                  console.log('Running debug tests...');
                  testAuthAndDatabase();
                }}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-md font-medium"
              >
                🐛 Debug Test
              </button>
              
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
              >
                {t("common.cancel")}
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md font-medium"
              >
                {submitting 
                  ? (isEditMode ? `${t("sell.updateListing")}...` : `${t("sell.createListing")}...`) 
                  : (isEditMode ? t("sell.updateListing") : t("sell.createListing"))
                }
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default function CategorySellPage() {
  const { t } = useTranslation();
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-blue-700 text-lg mb-2">{t("common.loading")}</div>
          <div className="text-gray-500">{t("common.pleaseWaitPrepareForm")}</div>
        </div>
      </div>
    }>
      <CategorySellContent />
    </Suspense>
  );
}
