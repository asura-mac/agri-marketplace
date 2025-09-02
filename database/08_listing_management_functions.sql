-- =====================================================
-- LISTING MANAGEMENT FUNCTIONS FOR PROFILE PAGE
-- =====================================================
-- Additional functions for managing listings from the profile page

-- Function to safely delete a listing (mark as inactive)
CREATE OR REPLACE FUNCTION public.delete_listing(
  listing_id UUID
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

  -- Update the listing status to inactive (soft delete)
  UPDATE agricultural_listings 
  SET 
    status = 'inactive',
    updated_at = NOW()
  WHERE id = listing_id AND user_id = auth.uid();

  -- Return true if a row was updated
  RETURN FOUND;
END;
$$;

-- Function to update listing status (active/inactive)
CREATE OR REPLACE FUNCTION public.update_listing_status(
  listing_id UUID,
  new_status TEXT
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

  -- Validate status
  IF new_status NOT IN ('active', 'inactive', 'sold') THEN
    RAISE EXCEPTION 'Invalid status. Must be active, inactive, or sold';
  END IF;

  -- Update the listing status
  UPDATE agricultural_listings 
  SET 
    status = new_status,
    updated_at = NOW()
  WHERE id = listing_id AND user_id = auth.uid();

  -- Return true if a row was updated
  RETURN FOUND;
END;
$$;

-- Function to get a single listing for editing (owned by user)
CREATE OR REPLACE FUNCTION public.get_listing_for_edit(
  listing_id UUID
)
RETURNS TABLE (
  id UUID,
  category TEXT,
  product_name TEXT,
  product_description TEXT,
  price_per_unit DECIMAL(10,2),
  unit TEXT,
  minimum_order DECIMAL(10,2),
  state TEXT,
  district TEXT,
  contact_phone TEXT,
  whatsapp_number TEXT,
  images TEXT[],
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validate user is authenticated
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  -- Return the listing if it belongs to the current user
  RETURN QUERY
  SELECT 
    al.id,
    al.category,
    al.product_name,
    al.product_description,
    al.price_per_unit,
    al.unit,
    al.minimum_order,
    al.state,
    al.district,
    al.contact_phone,
    al.whatsapp_number,
    al.images,
    al.status,
    al.created_at,
    al.updated_at
  FROM agricultural_listings al
  WHERE al.id = listing_id AND al.user_id = auth.uid();
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.delete_listing(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_listing_status(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_listing_for_edit(UUID) TO authenticated;

-- Add indexes for better performance on profile queries
CREATE INDEX IF NOT EXISTS idx_agricultural_listings_user_status ON agricultural_listings(user_id, status);
CREATE INDEX IF NOT EXISTS idx_agricultural_listings_user_created ON agricultural_listings(user_id, created_at DESC);
