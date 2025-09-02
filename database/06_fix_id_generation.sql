-- =====================================================
-- FIX: ID GENERATION ISSUE IN AGRICULTURAL_LISTINGS
-- =====================================================
-- This script fixes the "null value in column id" issue

-- First, let's check if gen_random_uuid() extension is enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Alternative: Enable pgcrypto extension (which provides gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Update the create_listing function to explicitly generate UUID
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

  -- Generate UUID explicitly
  new_listing_id := gen_random_uuid();

  -- Insert the listing with explicit ID
  INSERT INTO agricultural_listings (
    id,
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
    new_listing_id,
    auth.uid(),
    listing_category,
    listing_product_name,
    listing_description,
    listing_price,
    listing_unit,
    listing_min_order,
    listing_location,
    listing_contact_phone,
    COALESCE(listing_images, '{}'),
    'active',
    NOW(),
    NOW()
  );

  RAISE LOG 'Created listing % for user %', new_listing_id, auth.uid();
  
  RETURN new_listing_id;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error creating listing for user %: % %', auth.uid(), SQLERRM, SQLSTATE;
    RAISE;
END;
$$;

-- Update the debug function as well
CREATE OR REPLACE FUNCTION public.create_listing_debug(
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
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_listing_id UUID;
  current_user_id UUID;
  error_details TEXT;
BEGIN
  -- Log function call
  RAISE LOG 'create_listing_debug called with params: %, %, %, %, %, %, %, %, %', 
    listing_category, listing_product_name, listing_description, 
    listing_price, listing_unit, listing_min_order, 
    listing_location, listing_contact_phone, listing_images;
  
  -- Validate user is authenticated
  current_user_id := auth.uid();
  IF current_user_id IS NULL THEN
    RETURN 'ERROR: Authentication required - auth.uid() returned NULL';
  END IF;
  
  -- Validate required parameters
  IF listing_category IS NULL OR listing_category = '' THEN
    RETURN 'ERROR: listing_category is required';
  END IF;
  
  IF listing_product_name IS NULL OR listing_product_name = '' THEN
    RETURN 'ERROR: listing_product_name is required';
  END IF;
  
  IF listing_description IS NULL OR listing_description = '' THEN
    RETURN 'ERROR: listing_description is required';
  END IF;
  
  IF listing_price IS NULL OR listing_price <= 0 THEN
    RETURN 'ERROR: listing_price must be greater than 0';
  END IF;
  
  IF listing_unit IS NULL OR listing_unit = '' THEN
    RETURN 'ERROR: listing_unit is required';
  END IF;
  
  IF listing_min_order IS NULL OR listing_min_order <= 0 THEN
    RETURN 'ERROR: listing_min_order must be greater than 0';
  END IF;
  
  IF listing_location IS NULL OR listing_location = '' THEN
    RETURN 'ERROR: listing_location is required';
  END IF;
  
  IF listing_contact_phone IS NULL OR listing_contact_phone = '' THEN
    RETURN 'ERROR: listing_contact_phone is required';
  END IF;
  
  -- Validate unit
  IF listing_unit NOT IN ('kg', 'quintal', 'ton') THEN
    RETURN 'ERROR: listing_unit must be one of: kg, quintal, ton. Got: ' || listing_unit;
  END IF;
  
  -- Try to generate UUID
  BEGIN
    new_listing_id := gen_random_uuid();
    IF new_listing_id IS NULL THEN
      RETURN 'ERROR: Failed to generate UUID - gen_random_uuid() returned NULL';
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      RETURN 'ERROR: UUID generation failed - ' || SQLERRM;
  END;
  
  -- Try to insert the listing
  BEGIN
    INSERT INTO agricultural_listings (
      id,
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
      new_listing_id,
      current_user_id,
      listing_category,
      listing_product_name,
      listing_description,
      listing_price,
      listing_unit,
      listing_min_order,
      listing_location,
      listing_contact_phone,
      COALESCE(listing_images, '{}'),
      'active',
      NOW(),
      NOW()
    );
    
    RAISE LOG 'Successfully created listing % for user %', new_listing_id, current_user_id;
    
    RETURN 'SUCCESS: ' || new_listing_id::TEXT;
    
  EXCEPTION
    WHEN OTHERS THEN
      error_details := 'Insert failed - SQLSTATE: ' || SQLSTATE || ', SQLERRM: ' || SQLERRM;
      RAISE LOG 'Error in create_listing_debug: %', error_details;
      RETURN 'ERROR: ' || error_details;
  END;
  
END;
$$;

-- Test UUID generation function
CREATE OR REPLACE FUNCTION public.test_uuid_generation()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  test_uuid UUID;
BEGIN
  test_uuid := gen_random_uuid();
  IF test_uuid IS NULL THEN
    RETURN 'ERROR: gen_random_uuid() returned NULL';
  ELSE
    RETURN 'SUCCESS: Generated UUID ' || test_uuid::TEXT;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RETURN 'ERROR: UUID generation failed - ' || SQLERRM;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.create_listing(TEXT, TEXT, TEXT, DECIMAL, TEXT, DECIMAL, TEXT, TEXT, TEXT[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_listing_debug(TEXT, TEXT, TEXT, DECIMAL, TEXT, DECIMAL, TEXT, TEXT, TEXT[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.test_uuid_generation() TO authenticated;

-- Test commands to run:
/*
SELECT test_uuid_generation();
SELECT create_listing_debug(
  'grains', 
  'Test Wheat', 
  'High quality wheat for sale', 
  25.50, 
  'kg', 
  10.00, 
  'Mumbai, Maharashtra', 
  '9876543210', 
  ARRAY['http://example.com/image1.jpg']
);
*/
