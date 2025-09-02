-- =====================================================
-- UPDATE LISTING LOCATION TO STATE/DISTRICT STRUCTURE
-- =====================================================
-- This script updates the agricultural_listings table and functions
-- to use separate state and district fields instead of location

-- First, add the new columns to the table if they don't exist
ALTER TABLE agricultural_listings 
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS district TEXT,
ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;

-- Update existing records to extract state/district from location if possible
-- This is a one-time migration - you can customize this based on your data format
UPDATE agricultural_listings 
SET 
  state = CASE 
    WHEN location LIKE '%,%' THEN TRIM(SPLIT_PART(location, ',', -1))
    ELSE location
  END,
  district = CASE 
    WHEN location LIKE '%,%' THEN TRIM(SPLIT_PART(location, ',', 1))
    ELSE location
  END,
  whatsapp_number = contact_phone
WHERE state IS NULL OR district IS NULL OR whatsapp_number IS NULL;

-- Make the new columns NOT NULL after setting default values
ALTER TABLE agricultural_listings 
ALTER COLUMN state SET NOT NULL,
ALTER COLUMN district SET NOT NULL,
ALTER COLUMN whatsapp_number SET NOT NULL;

-- We can keep the old location column for backward compatibility for now
-- Or drop it after confirming everything works:
-- ALTER TABLE agricultural_listings DROP COLUMN IF EXISTS location;

-- Update the create_listing function to use state and district
CREATE OR REPLACE FUNCTION public.create_listing(
  listing_category TEXT,
  listing_product_name TEXT,
  listing_description TEXT,
  listing_price DECIMAL(10,2),
  listing_unit TEXT,
  listing_min_order DECIMAL(10,2),
  listing_state TEXT,
  listing_district TEXT,
  listing_contact_phone TEXT,
  listing_whatsapp_number TEXT,
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
    state,
    district,
    contact_phone,
    whatsapp_number,
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
    listing_state,
    listing_district,
    listing_contact_phone,
    listing_whatsapp_number,
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
  listing_state TEXT,
  listing_district TEXT,
  listing_contact_phone TEXT,
  listing_whatsapp_number TEXT,
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
  RAISE LOG 'create_listing_debug called with params: %, %, %, %, %, %, %, %, %, %, %', 
    listing_category, listing_product_name, listing_description, 
    listing_price, listing_unit, listing_min_order, 
    listing_state, listing_district, listing_contact_phone, listing_whatsapp_number, listing_images;
  
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
  
  IF listing_state IS NULL OR listing_state = '' THEN
    RETURN 'ERROR: listing_state is required';
  END IF;
  
  IF listing_district IS NULL OR listing_district = '' THEN
    RETURN 'ERROR: listing_district is required';
  END IF;
  
  IF listing_contact_phone IS NULL OR listing_contact_phone = '' THEN
    RETURN 'ERROR: listing_contact_phone is required';
  END IF;
  
  IF listing_whatsapp_number IS NULL OR listing_whatsapp_number = '' THEN
    RETURN 'ERROR: listing_whatsapp_number is required';
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
      state,
      district,
      contact_phone,
      whatsapp_number,
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
      listing_state,
      listing_district,
      listing_contact_phone,
      listing_whatsapp_number,
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

-- Update the update_listing function as well
CREATE OR REPLACE FUNCTION public.update_listing(
  listing_id UUID,
  listing_category TEXT DEFAULT NULL,
  listing_product_name TEXT DEFAULT NULL,
  listing_description TEXT DEFAULT NULL,
  listing_price DECIMAL(10,2) DEFAULT NULL,
  listing_unit TEXT DEFAULT NULL,
  listing_min_order DECIMAL(10,2) DEFAULT NULL,
  listing_state TEXT DEFAULT NULL,
  listing_district TEXT DEFAULT NULL,
  listing_contact_phone TEXT DEFAULT NULL,
  listing_whatsapp_number TEXT DEFAULT NULL,
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
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  -- Update the listing
  UPDATE agricultural_listings 
  SET 
    category = COALESCE(listing_category, category),
    product_name = COALESCE(listing_product_name, product_name),
    product_description = COALESCE(listing_description, product_description),
    price_per_unit = COALESCE(listing_price, price_per_unit),
    unit = COALESCE(listing_unit, unit),
    minimum_order = COALESCE(listing_min_order, minimum_order),
    state = COALESCE(listing_state, state),
    district = COALESCE(listing_district, district),
    contact_phone = COALESCE(listing_contact_phone, contact_phone),
    whatsapp_number = COALESCE(listing_whatsapp_number, whatsapp_number),
    images = COALESCE(listing_images, images),
    status = COALESCE(listing_status, status),
    updated_at = NOW()
  WHERE id = listing_id AND user_id = auth.uid();

  -- Return true if a row was updated
  RETURN FOUND;
END;
$$;

-- Grant permissions for the updated functions
GRANT EXECUTE ON FUNCTION public.create_listing(TEXT, TEXT, TEXT, DECIMAL, TEXT, DECIMAL, TEXT, TEXT, TEXT, TEXT, TEXT[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_listing_debug(TEXT, TEXT, TEXT, DECIMAL, TEXT, DECIMAL, TEXT, TEXT, TEXT, TEXT, TEXT[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_listing(UUID, TEXT, TEXT, TEXT, DECIMAL, TEXT, DECIMAL, TEXT, TEXT, TEXT, TEXT, TEXT[], TEXT) TO authenticated;

-- Test the new functions (optional, you can run these manually)
/*
-- Test UUID generation
SELECT test_uuid_generation();

-- Test listing creation with new structure
SELECT create_listing_debug(
  'grains', 
  'Test Wheat', 
  'High quality wheat for sale', 
  25.50, 
  'kg', 
  10.00, 
  'Maharashtra',
  'Mumbai',
  '9876543210',
  '9876543210',
  ARRAY['http://example.com/image1.jpg']
);
*/
