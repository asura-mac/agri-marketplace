'use client';
import { INDIAN_STATES_AND_UTS } from './constants';
export interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface ReverseGeocodeResult {
  address: string;
  city?: string;
  state?: string;
  district?: string;
  pincode?: string;
  country?: string;
  formatted: string;
}

/**
 * Get user's current GPS coordinates
 */
export function getCurrentPosition(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        let errorMessage = 'Location detection failed';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000, // Cache position for 1 minute
      }
    );
  });
}

/**
 * Convert GPS coordinates to human-readable address using OpenStreetMap Nominatim API
 */
export async function reverseGeocode(
  coordinates: GeolocationCoordinates
): Promise<ReverseGeocodeResult> {
  const { latitude, longitude } = coordinates;
  
  try {
    // Using OpenStreetMap Nominatim API for reverse geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?` +
      `lat=${latitude}&` +
      `lon=${longitude}&` +
      `format=json&` +
      `addressdetails=1&` +
      `zoom=18&` +
      `accept-language=en`
    );

    if (!response.ok) {
      throw new Error(`Geocoding API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data || data.error) {
      throw new Error(data?.error || 'No address found for this location');
    }

    // Extract address components
    const address = data.address || {};
    
    // Build formatted address components
    const addressParts = [];
    
    // Add specific location details first
    if (address.house_number && address.road) {
      addressParts.push(`${address.house_number} ${address.road}`);
    } else if (address.road) {
      addressParts.push(address.road);
    } else if (address.neighbourhood) {
      addressParts.push(address.neighbourhood);
    }
    
    // Add area/locality
    if (address.suburb) {
      addressParts.push(address.suburb);
    } else if (address.village) {
      addressParts.push(address.village);
    } else if (address.town) {
      addressParts.push(address.town);
    }
    
    // Add city
    const city = address.city || address.town || address.village || address.municipality || '';
    if (city && !addressParts.includes(city)) {
      addressParts.push(city);
    }
    
    // Add district/county
    const district = address.county || address.state_district || '';
    
    // Add state
    const state = address.state || '';
    
    // Add pincode
    const pincode = address.postcode || '';
    
    // Create formatted address
    const formattedParts = [];
    if (addressParts.length > 0) {
      formattedParts.push(addressParts.join(', '));
    }
    if (city && !formattedParts.some(part => part.includes(city))) {
      formattedParts.push(city);
    }
    if (district && district !== city) {
      formattedParts.push(district);
    }
    if (state) {
      formattedParts.push(state);
    }
    if (pincode) {
      formattedParts.push(pincode);
    }
    
    const result: ReverseGeocodeResult = {
      address: addressParts.length > 0 ? addressParts.join(', ') : (data.display_name || 'Unknown location'),
      city: city || undefined,
      state: state || undefined,
      district: district || undefined,
      pincode: pincode || undefined,
      country: address.country || undefined,
      formatted: formattedParts.length > 0 ? formattedParts.join(', ') : (data.display_name || 'Unknown location'),
    };

    return result;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    throw new Error(
      error instanceof Error 
        ? `Failed to get address: ${error.message}`
        : 'Failed to get address from coordinates'
    );
  }
}

/**
 * Detect user location and get human-readable address
 */
export async function detectUserLocation(): Promise<ReverseGeocodeResult> {
  try {
    console.log('Getting user coordinates...');
    const coordinates = await getCurrentPosition();
    
    console.log('Coordinates obtained:', coordinates);
    console.log('Converting to address...');
    const address = await reverseGeocode(coordinates);
    
    console.log('Address obtained:', address);
    return address;
  } catch (error) {
    console.error('Location detection error:', error);
    throw error;
  }
}

/**
 * Format address for display (shorter version)
 */
export function formatAddressShort(result: ReverseGeocodeResult): string {
  const parts = [];
  
  if (result.city) {
    parts.push(result.city);
  }
  
  if (result.district && result.district !== result.city) {
    parts.push(result.district);
  }
  
  if (result.state) {
    parts.push(result.state);
  }
  
  return parts.length > 0 ? parts.join(', ') : result.formatted;
}

/**
 * Extract Indian state name from geocoding result
 */
export function extractIndianState(result: ReverseGeocodeResult): string {
  // Import here to avoid circular dependency
  // const { INDIAN_STATES_AND_UTS } = await import('./constants');
  
  const stateFromResult = result.state || '';
  
  // Try to find exact match
  const exactMatch = INDIAN_STATES_AND_UTS.find((state: string) => 
    state.toLowerCase() === stateFromResult.toLowerCase()
  );
  
  if (exactMatch) {
    return exactMatch;
  }
  
  // Try to find partial match
  const partialMatch = INDIAN_STATES_AND_UTS.find((state: string) => 
    state.toLowerCase().includes(stateFromResult.toLowerCase()) ||
    stateFromResult.toLowerCase().includes(state.toLowerCase())
  );
  
  return partialMatch || stateFromResult;
}
