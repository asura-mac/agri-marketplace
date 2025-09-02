'use client';

import { supabase } from '@/lib/supabase';

export type ListingFormData = {
  category: string;
  productName: string;
  description: string;
  pricePerUnit: number;
  unit: 'kg' | 'quintal' | 'ton';
  minimumOrder: number;
  state: string;
  district: string;
  contactPhone: string;
  whatsappNumber: string;  // Add this
  sameAsPhone: boolean;
  images: string[];
};

export type Listing = {
  id: string;
  user_id: string;
  category: string;
  product_name: string;
  product_description: string;
  price_per_unit: number;
  unit: 'kg' | 'quintal' | 'ton';
  minimum_order: number;
  state: string | null;
  district: string | null;
  contact_phone: string;
  whatsapp_number: string | null;
  images: string[];
  status: 'active' | 'sold' | 'inactive';
  created_at: string;
  updated_at: string;
};

export type ListingWithProfile = Listing & {
  user_profiles: {
    role: string;
    phone: string;
    state: string;
    district: string;
  } | null;
};

/**
 * Upload image to Supabase Storage
 */
export async function uploadListingImage(file: File, userId: string): Promise<string | null> {
  if (!supabase) {
    console.error('Supabase client not available');
    return null;
  }

  try {
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${timestamp}-${randomString}.${fileExt}`;

    console.log('Uploading image:', fileName);

    const { error } = await supabase.storage
      .from('listing-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('listing-images')
      .getPublicUrl(fileName);

    console.log('Image uploaded successfully:', urlData.publicUrl);
    return urlData.publicUrl;
  } catch (error) {
    console.error('Unexpected error uploading image:', error);
    return null;
  }
}

/**
 * Delete image from Supabase Storage
 */
export async function deleteListingImage(imageUrl: string): Promise<boolean> {
  if (!supabase) {
    console.error('Supabase client not available');
    return false;
  }

  try {
    // Extract filename from URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/');
    const fileName = pathParts.slice(-2).join('/'); // Get userId/filename part

    const { error } = await supabase.storage
      .from('listing-images')
      .remove([fileName]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    console.log('Image deleted successfully:', fileName);
    return true;
  } catch (error) {
    console.error('Unexpected error deleting image:', error);
    return false;
  }
}

/**
 * Create a new listing
 */
export async function createListing(
  userId: string,
  listingData: ListingFormData
): Promise<string | null> {
  if (!supabase) {
    console.error('Supabase client not available');
    return null;
  }

  try {
    console.log('Creating listing with data:', {
      userId,
      category: listingData.category,
      productName: listingData.productName,
      description: listingData.description,
      pricePerUnit: listingData.pricePerUnit,
      unit: listingData.unit,
      minimumOrder: listingData.minimumOrder,
      state: listingData.state,
      district: listingData.district,
      contactPhone: listingData.contactPhone,
      whatsappNumber: listingData.whatsappNumber,
      images: listingData.images
    });

    // Prepare RPC parameters with proper type conversion
    const rpcParams = {
      listing_category: listingData.category,
      listing_product_name: listingData.productName,
      listing_description: listingData.description,
      listing_price: Number(listingData.pricePerUnit),
      listing_unit: listingData.unit,
      listing_min_order: Number(listingData.minimumOrder),
      listing_state: listingData.state,
      listing_district: listingData.district,
      listing_contact_phone: listingData.contactPhone,
      listing_whatsapp_number: listingData.whatsappNumber,
      listing_images: listingData.images || []
    };

    console.log('RPC parameters:', rpcParams);

    // First try the debug function to get detailed error information
    console.log('Trying debug function first...');
    const { data: debugData, error: debugError } = await supabase.rpc('create_listing_debug', rpcParams);
    
    console.log('Debug RPC response:', { debugData, debugError });
    
    if (debugError) {
      console.error('Debug function error:', debugError);
    }
    
    if (debugData && typeof debugData === 'string') {
      if (debugData.startsWith('SUCCESS:')) {
        // Extract the UUID from the success message
        const listingId = debugData.replace('SUCCESS: ', '');
        console.log('Debug function succeeded, listing ID:', listingId);
        return listingId;
      } else {
        console.error('Debug function returned error:', debugData);
        return null;
      }
    }

    // Fallback to original function for comparison
    console.log('Trying original create_listing function...');
    const { data, error } = await supabase.rpc('create_listing', rpcParams);

    console.log('Original RPC response:', { data, error });

    if (error) {
      console.error('Detailed RPC error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return null;
    }

    if (!data) {
      console.error('RPC returned no data (null or undefined)');
      return null;
    }

    console.log('Listing created successfully with ID:', data);
    return data as string;
  } catch (error) {
    console.error('Unexpected error creating listing:', error);
    return null;
  }
}

/**
 * Get user's listings
 */
export async function getUserListings(userId: string): Promise<Listing[]> {
  if (!supabase) {
    console.error('Supabase client not available');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('agricultural_listings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user listings:', error);
      return [];
    }

    return (data as Listing[]) || [];
  } catch (error) {
    console.error('Unexpected error fetching listings:', error);
    return [];
  }
}

/**
 * Search and filter parameters for listings
 */
export type ListingSearchParams = {
  searchQuery?: string;
  category?: string;
  state?: string;
  limit?: number;
  offset?: number;
};

/**
 * Utility function to safely convert a value to a searchable string
 * Handles null, undefined, and non-string values gracefully
 */
function safeStringSearch(value: string | null | undefined): string {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value).toLowerCase();
}

/**
 * Safely check if a searchable field contains a search term
 * @param field - The field value to search in (can be null/undefined)
 * @param searchTerm - The term to search for (should be lowercase)
 * @returns boolean indicating if the field contains the search term
 */
function fieldContainsSearchTerm(field: string | null | undefined, searchTerm: string): boolean {
  const safeField = safeStringSearch(field);
  return safeField.includes(searchTerm);
}

/**
 * Get all active listings with search and filter capabilities
 */
export async function getActiveListings(category?: string): Promise<Listing[]> {
  if (!supabase) {
    console.error('Supabase client not available');
    return [];
  }

  try {
    let query = supabase
      .from('agricultural_listings')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching active listings:', error);
      return [];
    }

    return (data as Listing[]) || [];
  } catch (error) {
    console.error('Unexpected error fetching listings:', error);
    return [];
  }
}

/**
 * Search and filter agricultural listings
 */
export async function searchListings(params: ListingSearchParams): Promise<Listing[]> {
  if (!supabase) {
    console.error('Supabase client not available');
    return [];
  }

  try {
    let query = supabase
      .from('agricultural_listings')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    // Apply category filter
    if (params.category) {
      query = query.eq('category', params.category);
    }

    // Apply state filter
    if (params.state) {
      query = query.eq('state', params.state);
    }

    // Apply limit and offset for pagination
    if (params.limit) {
      query = query.limit(params.limit);
    }
    if (params.offset) {
      query = query.range(params.offset, params.offset + (params.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error searching listings:', error);
      return [];
    }

    let results = (data as Listing[]) || [];

    // Apply client-side text search across multiple fields
    if (params.searchQuery && params.searchQuery.trim()) {
      const searchTerm = params.searchQuery.toLowerCase().trim();
      results = results.filter(listing => {
        return (
          fieldContainsSearchTerm(listing.product_name, searchTerm) ||
          fieldContainsSearchTerm(listing.product_description, searchTerm) ||
          fieldContainsSearchTerm(listing.category, searchTerm) ||
          fieldContainsSearchTerm(listing.state, searchTerm) ||
          fieldContainsSearchTerm(listing.district, searchTerm)
        );
      });
    }

    return results;
  } catch (error) {
    console.error('Unexpected error searching listings:', error);
    return [];
  }
}

/**
 * Fetch a single listing with seller profile information
 */
export async function fetchListingById(listingId: string): Promise<ListingWithProfile | null> {
  if (!supabase) {
    console.error('Supabase client not available');
    return null;
  }

  try {
    // First get the listing
    const { data: listing, error: listingError } = await supabase
      .from('agricultural_listings')
      .select('*')
      .eq('id', listingId)
      .eq('status', 'active')
      .single();

    if (listingError || !listing) {
      console.error('Error fetching listing:', listingError);
      return null;
    }

    // Then get the user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('role, phone, state, district')
      .eq('user_id', String(listing.user_id))
      .single();

    if (profileError) {
      console.warn('Could not fetch user profile:', profileError);
    }

    // Combine the data with proper type casting
    const result: ListingWithProfile = {
      ...(listing as Listing),
      user_profiles: profile ? {
        role: String(profile.role || ''),
        phone: String(profile.phone || ''),
        state: String(profile.state || ''),
        district: String(profile.district || '')
      } : null
    };

    return result;
  } catch (error) {
    console.error('Unexpected error fetching listing:', error);
    return null;
  }
}

/**
 * Fetch related listings from the same seller
 */
export async function fetchSellerListings(userId: string, excludeListingId?: string, limit: number = 10): Promise<Listing[]> {
  if (!supabase) {
    console.error('Supabase client not available');
    return [];
  }

  try {
    let query = supabase
      .from('agricultural_listings')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (excludeListingId) {
      query = query.neq('id', excludeListingId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching seller listings:', error);
      return [];
    }

    return (data || []) as Listing[];
  } catch (error) {
    console.error('Unexpected error fetching seller listings:', error);
    return [];
  }
}

/**
 * Fetch all listings for a specific user (for profile management)
 */
export async function fetchUserListings(userId: string): Promise<Listing[]> {
  if (!supabase) {
    console.error('Supabase client not available');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('agricultural_listings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user listings:', error);
      return [];
    }

    return (data || []) as Listing[];
  } catch (error) {
    console.error('Unexpected error fetching user listings:', error);
    return [];
  }
}

/**
 * Update listing status
 */
export async function updateListingStatus(
  listingId: string,
  status: 'active' | 'sold' | 'inactive'
): Promise<boolean> {
  if (!supabase) {
    console.error('Supabase client not available');
    return false;
  }

  try {
    const { data, error } = await supabase.rpc('update_listing_status', {
      listing_id: listingId,
      new_status: status
    });

    if (error) {
      console.error('Error updating listing status:', error);
      return false;
    }

    console.log('Listing status updated successfully');
    return Boolean(data);
  } catch (error) {
    console.error('Unexpected error updating listing status:', error);
    return false;
  }
}

/**
 * Delete a listing (mark as inactive)
 */
export async function deleteListing(listingId: string): Promise<boolean> {
  if (!supabase) {
    console.error('Supabase client not available');
    return false;
  }

  try {
    const { data, error } = await supabase.rpc('delete_listing', {
      listing_id: listingId
    });

    if (error) {
      console.error('Error deleting listing:', error);
      return false;
    }

    console.log('Listing deleted successfully');
    return Boolean(data);
  } catch (error) {
    console.error('Unexpected error deleting listing:', error);
    return false;
  }
}

/**
 * Get a listing for editing (user must own it)
 */
export async function getListingForEdit(listingId: string): Promise<Listing | null> {
  if (!supabase) {
    console.error('Supabase client not available');
    return null;
  }

  try {
    const { data, error } = await supabase.rpc('get_listing_for_edit', {
      listing_id: listingId
    });

    if (error) {
      console.error('Error fetching listing for edit:', error);
      return null;
    }

    return Array.isArray(data) && data.length > 0 ? (data[0] as Listing) : null;
  } catch (error) {
    console.error('Unexpected error fetching listing for edit:', error);
    return null;
  }
}

/**
 * Compress and resize image file
 */
export function compressImage(file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Canvas to Blob conversion failed'));
          }
        },
        file.type,
        quality
      );
    };

    img.onerror = () => reject(new Error('Image load failed'));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload only JPG, PNG, or WebP images' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image size must be less than 5MB' };
  }

  return { valid: true };
}
