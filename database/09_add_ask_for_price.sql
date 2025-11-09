-- Add ask_for_price column to agricultural_listings table
ALTER TABLE agricultural_listings
ADD COLUMN ask_for_price BOOLEAN NOT NULL DEFAULT FALSE;

-- Update the create_listing_debug function
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
  listing_images TEXT[] DEFAULT '{}',
  listing_ask_for_price BOOLEAN DEFAULT FALSE
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
  RAISE LOG 'create_listing_debug called with params: %, %, %, %, %, %, %, %, %, %, %, %', 
    listing_category, listing_product_name, listing_description, 
    listing_price, listing_unit, listing_min_order, 
    listing_state, listing_district, listing_contact_phone, listing_whatsapp_number, listing_images,
    listing_ask_for_price;
  
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
  
  -- Only validate price if ask_for_price is false
  IF NOT listing_ask_for_price THEN
    IF listing_price IS NULL OR listing_price <= 0 THEN
      RETURN 'ERROR: listing_price must be greater than 0 when ask_for_price is false';
    END IF;
  END IF;
  
  IF listing_unit IS NULL OR listing_unit = '' THEN
    RETURN 'ERROR: listing_unit is required';
  END IF;
  
  -- Only validate minimum order if ask_for_price is false
  IF NOT listing_ask_for_price THEN
    IF listing_min_order IS NULL OR listing_min_order <= 0 THEN
      RETURN 'ERROR: listing_min_order must be greater than 0 when ask_for_price is false';
    END IF;
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
      ask_for_price,
      created_at,
      updated_at
    ) VALUES (
      new_listing_id,
      current_user_id,
      listing_category,
      listing_product_name,
      listing_description,
      CASE WHEN listing_ask_for_price THEN NULL ELSE listing_price END,
      listing_unit,
      CASE WHEN listing_ask_for_price THEN NULL ELSE listing_min_order END,
      listing_state,
      listing_district,
      listing_contact_phone,
      listing_whatsapp_number,
      COALESCE(listing_images, '{}'),
      'active',
      listing_ask_for_price,
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
  listing_ask_for_price BOOLEAN DEFAULT NULL
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id UUID;
  error_details TEXT;
BEGIN
  -- Get current user ID
  current_user_id := auth.uid();
  IF current_user_id IS NULL THEN
    RETURN 'ERROR: Authentication required';
  END IF;

  -- Attempt to update the listing
  BEGIN
    UPDATE agricultural_listings
    SET
      category = COALESCE(listing_category, category),
      product_name = COALESCE(listing_product_name, product_name),
      product_description = COALESCE(listing_description, product_description),
      price_per_unit = CASE 
        WHEN listing_ask_for_price = TRUE THEN NULL 
        WHEN listing_price IS NOT NULL THEN listing_price 
        ELSE price_per_unit 
      END,
      unit = COALESCE(listing_unit, unit),
      minimum_order = CASE 
        WHEN listing_ask_for_price = TRUE THEN NULL 
        WHEN listing_min_order IS NOT NULL THEN listing_min_order 
        ELSE minimum_order 
      END,
      state = COALESCE(listing_state, state),
      district = COALESCE(listing_district, district),
      contact_phone = COALESCE(listing_contact_phone, contact_phone),
      whatsapp_number = COALESCE(listing_whatsapp_number, whatsapp_number),
      images = COALESCE(listing_images, images),
      ask_for_price = COALESCE(listing_ask_for_price, ask_for_price),
      updated_at = NOW()
    WHERE id = listing_id AND user_id = current_user_id;

    IF FOUND THEN
      RETURN 'SUCCESS: Listing updated';
    ELSE
      RETURN 'ERROR: Listing not found or not owned by current user';
    END IF;

  EXCEPTION
    WHEN OTHERS THEN
      error_details := 'Update failed - ' || SQLERRM;
      RAISE LOG 'Error in update_listing: %', error_details;
      RETURN 'ERROR: ' || error_details;
  END;
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.create_listing_debug(TEXT, TEXT, TEXT, DECIMAL, TEXT, DECIMAL, TEXT, TEXT, TEXT, TEXT, TEXT[], BOOLEAN) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_listing(UUID, TEXT, TEXT, TEXT, DECIMAL, TEXT, DECIMAL, TEXT, TEXT, TEXT, TEXT, TEXT[], BOOLEAN) TO authenticated;