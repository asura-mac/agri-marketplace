'use client';

import { createClient } from '@supabase/supabase-js'

let supabase: ReturnType<typeof createClient> | null = null;

if (typeof window !== 'undefined') {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables');
  } else {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
}

/**
 * Get the Supabase storage hostname from the URL
 * This helps with dynamic hostname configuration
 */
export function getSupabaseStorageHostname(): string | null {
  if (typeof window === 'undefined') return null;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return null;
  
  try {
    const url = new URL(supabaseUrl);
    return url.hostname;
  } catch (error) {
    console.error('Invalid Supabase URL:', error);
    return null;
  }
}

/**
 * Test basic authentication and database access
 */
export async function testAuthAndDatabase(): Promise<void> {
  if (!supabase) {
    console.error('Supabase client not available');
    return;
  }

  try {
    // Test authentication
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    console.log('Auth test:', { 
      hasSession: !!session, 
      userId: session?.user?.id,
      authError 
    });

    // Test basic RPC functionality
    const { data: testData, error: testError } = await supabase.rpc('test_create_listing_simple');
    console.log('Basic RPC test:', { testData, testError });

    // Test table access
    const { data: accessData, error: accessError } = await supabase.rpc('test_agricultural_listings_access');
    console.log('Table access test:', { accessData, accessError });

    // Test UUID generation
    const { data: uuidData, error: uuidError } = await supabase.rpc('test_uuid_generation');
    console.log('UUID generation test:', { uuidData, uuidError });

  } catch (error) {
    console.error('Test function error:', error);
  }
}

export type UserProfileRow = {
  id: string;
  user_uuid: string;
  name?: string;
  phone?: string;
  state?: string;
  district?: string;
  pincode?: string;
  location?: string;
  role?: string;
  updated_at?: string;
};

export { supabase };
