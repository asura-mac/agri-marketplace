'use client';

import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

/**
 * Check if user has completed onboarding
 * Uses the database function to bypass RLS timing issues
 */
export async function checkOnboardingStatus(userId: string): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { data, error } = await supabase.rpc('get_user_onboarding_status', {
      user_uuid: userId,
    } as any);

    if (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }

    // Explicitly convert to boolean since RPC can return various types
    return Boolean(data);
  } catch (error) {
    console.error('Unexpected error checking onboarding:', error);
    return false;
  }
}

/**
 * Complete user onboarding with profile data
 * Uses the database function to ensure proper RLS handling
 */
export async function completeOnboarding(
  userId: string,
  profileData: {
    role: string;
    name: string;
    phone: string;
    state: string;
    district: string;
    pincode: string;
    location: string;
  }
): Promise<boolean> {
  if (!supabase) {
    console.error('Supabase client not available');
    return false;
  }

  try {
    console.log('Attempting to complete onboarding for user:', userId);
    console.log('Profile data:', profileData);

    const { data, error } = await supabase.rpc('complete_onboarding', {
      user_uuid: userId,
      user_role: profileData.role,
      user_name: profileData.name,
      user_phone: profileData.phone,
      user_state: profileData.state,
      user_district: profileData.district,
      user_pincode: profileData.pincode,
      user_location: profileData.location
    } as any);

    if (error) {
      console.error('Database error completing onboarding:', {
        error,
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      return false;
    }

    console.log('Onboarding completion result:', data);
    
    // Explicitly convert to boolean since RPC can return various types
    const result = Boolean(data);
    console.log('Returning result:', result);
    
    return result;
  } catch (error) {
    console.error('Unexpected error completing onboarding:', error);
    return false;
  }
}

/**
 * Get user profile data
 * Handles RLS properly with error handling
 */
export async function getUserProfile(userId: string) {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      // Don't log "no rows" errors as they're expected for new users
      if (error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
      }
      return null;
    }

    // Cast to any to prevent downstream type errors
    return data as any;
  } catch (error) {
    console.error('Unexpected error fetching profile:', error);
    return null;
  }
}

/**
 * Update user profile data
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<{
    role: string;
    name: string;
    phone: string;
    state: string;
    district: string;
    pincode: string;
    location: string;
  }>
) {
  if (!supabase) return false;

  try {
    // Add (.. as any) here to bypass the strict type-checking on the chain
    const { error } = await (supabase.from('user_profiles') as any)
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      }) // Remove 'as any' from here
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating user profile:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error updating profile:', error);
    return false;
  }
}

/**
 * Get user location for header display
 */
export async function getUserLocation(userId: string): Promise<string> {
  if (!supabase) return "Set location";

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('district, state')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return "Set location";
    }

    // Cast data to 'any' to bypass the type error
    const anyData = data as any;

    // Ensure we return a string, not an empty object
    const district = typeof anyData.district === 'string' ? anyData.district : '';
    const state = typeof anyData.state === 'string' ? anyData.state : '';
    
    return district || state || "Set location";
  } catch (error) {
    console.error('Error fetching user location:', error);
    return "Set location";
  }
}

/**
 * Debug user profile - helps troubleshoot onboarding issues
 */
export async function debugUserProfile(userId: string) {
  if (!supabase) {
    console.error('Supabase client not available');
    return null;
  }

  try {
    console.log('Debugging profile for user:', userId);
    
    const { data, error } = await supabase.rpc('debug_user_profile', {
      user_uuid: userId
    } as any); // <-- Add 'as any' here

    if (error) {
      console.error('Error debugging user profile:', error);
      return null;
    }

    console.log('Debug profile result:', data);
    return data;
  } catch (error) {
    console.error('Unexpected error debugging profile:', error);
    return null;
  }
}

/**
 * Handle authentication redirects based on user state
 */
export async function handleAuthRedirect(user: User | null): Promise<string> {
  if (!user) {
    return '/login';
  }

  // Check if user has completed onboarding
  const hasCompletedOnboarding = await checkOnboardingStatus(user.id);
  
  if (!hasCompletedOnboarding) {
    return '/onboarding';
  }

  return '/';
}
