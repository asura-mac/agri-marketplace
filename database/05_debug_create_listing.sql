-- =====================================================
-- DEBUG FUNCTION FOR CREATE_LISTING ISSUES
-- =====================================================
-- This script adds debugging functions to help identify the create_listing issue

-- Create a simple test function to verify basic functionality
CREATE OR REPLACE FUNCTION public.test_create_listing_simple()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Just return a simple message to test if functions work at all
  RETURN 'Function executed successfully';
EXCEPTION
  WHEN OTHERS THEN
    RETURN 'Error: ' || SQLERRM;
END;
$$;

-- Create a test function that checks table existence and permissions
CREATE OR REPLACE FUNCTION public.test_agricultural_listings_access()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  table_exists BOOLEAN;
  user_authenticated BOOLEAN;
  current_user_id UUID;
BEGIN
  -- Check if user is authenticated
  current_user_id := auth.uid();
  user_authenticated := (current_user_id IS NOT NULL);
  
  -- Check if table exists
  SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'agricultural_listings'
  ) INTO table_exists;
  
  RETURN 'Table exists: ' || table_exists::TEXT || 
         ', User authenticated: ' || user_authenticated::TEXT || 
         ', User ID: ' || COALESCE(current_user_id::TEXT, 'NULL');
EXCEPTION
  WHEN OTHERS THEN
    RETURN 'Error checking access: ' || SQLERRM;
END;
$$;

-- Create a minimal insert test function
CREATE OR REPLACE FUNCTION public.test_insert_listing(
  test_category TEXT DEFAULT 'grains',
  test_product_name TEXT DEFAULT 'Test Product',
  test_description TEXT DEFAULT 'Test Description',
  test_price DECIMAL(10,2) DEFAULT 10.00,
  test_unit TEXT DEFAULT 'kg',
  test_min_order DECIMAL(10,2) DEFAULT 1.00,
  test_location TEXT DEFAULT 'Test Location',
  test_contact_phone TEXT DEFAULT '1234567890'
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_listing_id UUID;
  current_user_id UUID;
BEGIN
  -- Get current user
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RETURN 'Error: User not authenticated';
  END IF;
  
  -- Try to insert
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
    current_user_id,
    test_category,
    test_product_name,
    test_description,
    test_price,
    test_unit,
    test_min_order,
    test_location,
    test_contact_phone,
    '{}',
    'active',
    NOW(),
    NOW()
  ) RETURNING id INTO new_listing_id;
  
  RETURN 'Success: Created listing with ID ' || new_listing_id::TEXT;
EXCEPTION
  WHEN OTHERS THEN
    RETURN 'Error inserting: ' || SQLERRM || ' (Code: ' || SQLSTATE || ')';
END;
$$;

-- Enhanced create_listing function with better error handling
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
  
  -- Try to insert the listing
  BEGIN
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
    ) RETURNING id INTO new_listing_id;
    
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

-- Grant permissions for debug functions
GRANT EXECUTE ON FUNCTION public.test_create_listing_simple() TO authenticated;
GRANT EXECUTE ON FUNCTION public.test_agricultural_listings_access() TO authenticated;
GRANT EXECUTE ON FUNCTION public.test_insert_listing(TEXT, TEXT, TEXT, DECIMAL, TEXT, DECIMAL, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_listing_debug(TEXT, TEXT, TEXT, DECIMAL, TEXT, DECIMAL, TEXT, TEXT, TEXT[]) TO authenticated;

-- Instructions for testing:
/*
To test these functions, run the following in Supabase SQL Editor (after authentication):

1. Test basic function execution:
   SELECT test_create_listing_simple();

2. Test table access and authentication:
   SELECT test_agricultural_listings_access();

3. Test minimal insert:
   SELECT test_insert_listing();

4. Test full debug function:
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

Or from the client side, use:
   supabase.rpc('create_listing_debug', { ... })
*/
