-- =====================================================
-- MIGRATION: ADD CONTACT PHONE TO AGRICULTURAL LISTINGS
-- =====================================================
-- This script adds the contact_phone field to existing agricultural_listings tables

-- Add the contact_phone column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'agricultural_listings' 
        AND column_name = 'contact_phone'
    ) THEN
        ALTER TABLE agricultural_listings 
        ADD COLUMN contact_phone TEXT;
        
        -- For existing records without contact_phone, we can set a default or require update
        -- Option 1: Set to empty string (will require users to update their listings)
        UPDATE agricultural_listings 
        SET contact_phone = '' 
        WHERE contact_phone IS NULL;
        
        -- Option 2: Try to get contact from user profile if available
        -- UPDATE agricultural_listings 
        -- SET contact_phone = COALESCE(
        --     (SELECT phone FROM user_profiles WHERE user_id = agricultural_listings.user_id), 
        --     ''
        -- ) 
        -- WHERE contact_phone IS NULL;
        
        -- Make the field NOT NULL after setting defaults
        ALTER TABLE agricultural_listings 
        ALTER COLUMN contact_phone SET NOT NULL;
        
        RAISE NOTICE 'Added contact_phone column to agricultural_listings table';
    ELSE
        RAISE NOTICE 'contact_phone column already exists in agricultural_listings table';
    END IF;
END $$;

-- Update the create_listing function to include contact_phone (if not already updated)
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

-- Update the update_listing function to include contact_phone (if not already updated)
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

-- Update function permissions
GRANT EXECUTE ON FUNCTION public.create_listing(TEXT, TEXT, TEXT, DECIMAL, TEXT, DECIMAL, TEXT, TEXT, TEXT[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_listing(UUID, TEXT, TEXT, DECIMAL, TEXT, DECIMAL, TEXT, TEXT, TEXT[], TEXT) TO authenticated;

RAISE NOTICE 'Migration completed: contact_phone field added to agricultural_listings';
