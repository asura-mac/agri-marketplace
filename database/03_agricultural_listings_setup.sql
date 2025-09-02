-- =====================================================
-- AGRICULTURAL LISTINGS TABLE SETUP
-- =====================================================
-- This script creates the agricultural listings table and associated policies

-- Create the agricultural_listings table
CREATE TABLE IF NOT EXISTS agricultural_listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_description TEXT NOT NULL,
  price_per_unit DECIMAL(10,2) NOT NULL,
  unit TEXT NOT NULL CHECK (unit IN ('kg', 'quintal', 'ton')),
  minimum_order DECIMAL(10,2) NOT NULL,
  location TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_agricultural_listings_user_id ON agricultural_listings(user_id);
CREATE INDEX IF NOT EXISTS idx_agricultural_listings_category ON agricultural_listings(category);
CREATE INDEX IF NOT EXISTS idx_agricultural_listings_status ON agricultural_listings(status);
CREATE INDEX IF NOT EXISTS idx_agricultural_listings_created_at ON agricultural_listings(created_at DESC);

-- Enable RLS on the table
ALTER TABLE agricultural_listings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES FOR AGRICULTURAL LISTINGS
-- =====================================================

-- Policy for users to view all active listings
CREATE POLICY "Anyone can view active listings" ON agricultural_listings
  FOR SELECT USING (status = 'active');

-- Policy for users to view their own listings (all statuses)
CREATE POLICY "Users can view own listings" ON agricultural_listings
  FOR SELECT USING (auth.uid() = user_id);

-- Policy for users to insert their own listings
CREATE POLICY "Users can insert own listings" ON agricultural_listings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own listings
CREATE POLICY "Users can update own listings" ON agricultural_listings
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy for users to delete their own listings
CREATE POLICY "Users can delete own listings" ON agricultural_listings
  FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- STORAGE BUCKET FOR LISTING IMAGES
-- =====================================================

-- Create storage bucket for listing images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('listing-images', 'listing-images', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- STORAGE POLICIES
-- =====================================================

-- Policy for authenticated users to upload images
CREATE POLICY "Authenticated users can upload listing images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'listing-images' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Policy for anyone to view listing images
CREATE POLICY "Anyone can view listing images" ON storage.objects
  FOR SELECT USING (bucket_id = 'listing-images');

-- Policy for users to update their own images
CREATE POLICY "Users can update own listing images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'listing-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy for users to delete their own images
CREATE POLICY "Users can delete own listing images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'listing-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- =====================================================
-- UTILITY FUNCTIONS FOR LISTINGS
-- =====================================================

-- Function to create a new listing
CREATE OR REPLACE FUNCTION public.create_listing(
  listing_category TEXT,
  listing_product_name TEXT,
  listing_description TEXT,
  listing_price DECIMAL(10,2),
  listing_unit TEXT,
  listing_min_order DECIMAL(10,2),
  listing_location TEXT,
  listing_contact_phone TEXT,
  listing_images TEXT[] DEFAULT '{}'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_listing_id UUID;
BEGIN
  -- Validate user is authenticated
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  -- Insert the listing
  INSERT INTO agricultural_listings (
    user_id,
    category,
    product_name,
    product_description,
    price_per_unit,
    unit,
    minimum_order,
    location,
    contact_phone,
    images,
    status,
    created_at,
    updated_at
  ) VALUES (
    auth.uid(),
    listing_category,
    listing_product_name,
    listing_description,
    listing_price,
    listing_unit,
    listing_min_order,
    listing_location,
    listing_contact_phone,
    listing_images,
    'active',
    NOW(),
    NOW()
  ) RETURNING id INTO new_listing_id;

  RAISE LOG 'Created listing % for user %', new_listing_id, auth.uid();
  
  RETURN new_listing_id;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error creating listing for user %: % %', auth.uid(), SQLERRM, SQLSTATE;
    RAISE;
END;
$$;

-- Function to update a listing
CREATE OR REPLACE FUNCTION public.update_listing(
  listing_id UUID,
  listing_product_name TEXT DEFAULT NULL,
  listing_description TEXT DEFAULT NULL,
  listing_price DECIMAL(10,2) DEFAULT NULL,
  listing_unit TEXT DEFAULT NULL,
  listing_min_order DECIMAL(10,2) DEFAULT NULL,
  listing_location TEXT DEFAULT NULL,
  listing_contact_phone TEXT DEFAULT NULL,
  listing_images TEXT[] DEFAULT NULL,
  listing_status TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validate user is authenticated and owns the listing
  IF NOT EXISTS (
    SELECT 1 FROM agricultural_listings 
    WHERE id = listing_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Listing not found or access denied';
  END IF;

  -- Update the listing with only provided values
  UPDATE agricultural_listings 
  SET 
    product_name = COALESCE(listing_product_name, product_name),
    product_description = COALESCE(listing_description, product_description),
    price_per_unit = COALESCE(listing_price, price_per_unit),
    unit = COALESCE(listing_unit, unit),
    minimum_order = COALESCE(listing_min_order, minimum_order),
    location = COALESCE(listing_location, location),
    contact_phone = COALESCE(listing_contact_phone, contact_phone),
    images = COALESCE(listing_images, images),
    status = COALESCE(listing_status, status),
    updated_at = NOW()
  WHERE id = listing_id;

  RAISE LOG 'Updated listing % by user %', listing_id, auth.uid();
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error updating listing % by user %: % %', listing_id, auth.uid(), SQLERRM, SQLSTATE;
    RETURN FALSE;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.create_listing(TEXT, TEXT, TEXT, DECIMAL, TEXT, DECIMAL, TEXT, TEXT, TEXT[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_listing(UUID, TEXT, TEXT, DECIMAL, TEXT, DECIMAL, TEXT, TEXT, TEXT[], TEXT) TO authenticated;
