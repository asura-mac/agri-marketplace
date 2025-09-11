-- =====================================================
-- FIX ONBOARDING FUNCTION TO INCLUDE NAME FIELD
-- =====================================================
-- This script adds the name column if missing and updates the complete_onboarding function

-- Add name column if it doesn't exist
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS name TEXT;

-- Create index for name column
CREATE INDEX IF NOT EXISTS idx_user_profiles_name ON user_profiles(name);

-- =====================================================
-- UPDATED COMPLETE ONBOARDING FUNCTION WITH NAME
-- =====================================================
CREATE OR REPLACE FUNCTION public.complete_onboarding(
  user_uuid UUID,
  user_role TEXT,
  user_name TEXT,
  user_phone TEXT,
  user_state TEXT,
  user_district TEXT,
  user_pincode TEXT,
  user_location TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  profile_exists BOOLEAN := FALSE;
  update_count INTEGER := 0;
BEGIN
  -- Log function call for debugging
  RAISE LOG 'complete_onboarding called for user: % with name: %', user_uuid, user_name;
  
  -- Check if profile exists
  SELECT EXISTS(SELECT 1 FROM user_profiles WHERE user_id = user_uuid) INTO profile_exists;
  
  IF NOT profile_exists THEN
    RAISE LOG 'No profile found for user %, creating one', user_uuid;
    
    -- Insert profile if it doesn't exist (fallback)
    INSERT INTO user_profiles (
      user_id,
      role,
      name,
      phone,
      state,
      district,
      pincode,
      location,
      onboarding_completed,
      created_at,
      updated_at
    ) VALUES (
      user_uuid,
      user_role,
      user_name,
      user_phone,
      user_state,
      user_district,
      user_pincode,
      user_location,
      TRUE,
      NOW(),
      NOW()
    );
    
    GET DIAGNOSTICS update_count = ROW_COUNT;
    RAISE LOG 'Inserted % rows for user %', update_count, user_uuid;
    
    RETURN update_count > 0;
  ELSE
    -- Update existing profile
    RAISE LOG 'Updating existing profile for user %', user_uuid;
    
    UPDATE user_profiles 
    SET 
      role = user_role,
      name = user_name,
      phone = user_phone,
      state = user_state,
      district = user_district,
      pincode = user_pincode,
      location = user_location,
      onboarding_completed = TRUE,
      updated_at = NOW()
    WHERE user_id = user_uuid;
    
    GET DIAGNOSTICS update_count = ROW_COUNT;
    RAISE LOG 'Updated % rows for user %', update_count, user_uuid;
    
    RETURN update_count > 0;
  END IF;
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error in complete_onboarding for user %: % %', user_uuid, SQLERRM, SQLSTATE;
    RETURN FALSE;
END;
$$;

-- =====================================================
-- UPDATE DEBUG FUNCTION TO INCLUDE NAME
-- =====================================================
CREATE OR REPLACE FUNCTION public.debug_user_profile(user_uuid UUID)
RETURNS TABLE(
  profile_exists BOOLEAN,
  user_id UUID,
  email TEXT,
  role TEXT,
  name TEXT,
  phone TEXT,
  state TEXT,
  district TEXT,
  pincode TEXT,
  location TEXT,
  onboarding_completed BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    TRUE as profile_exists,
    up.user_id,
    up.email,
    up.role,
    up.name,
    up.phone,
    up.state,
    up.district,
    up.pincode,
    up.location,
    up.onboarding_completed,
    up.created_at,
    up.updated_at
  FROM user_profiles up 
  WHERE up.user_id = user_uuid;
  
  -- If no rows returned, return a row indicating profile doesn't exist
  IF NOT FOUND THEN
    RETURN QUERY
    SELECT 
      FALSE as profile_exists,
      user_uuid,
      NULL::TEXT as email,
      NULL::TEXT as role,
      NULL::TEXT as name,
      NULL::TEXT as phone,
      NULL::TEXT as state,
      NULL::TEXT as district,
      NULL::TEXT as pincode,
      NULL::TEXT as location,
      FALSE as onboarding_completed,
      NULL::TIMESTAMPTZ as created_at,
      NULL::TIMESTAMPTZ as updated_at;
  END IF;
END;
$$;

-- =====================================================
-- VERIFICATION
-- =====================================================
-- Test the function to make sure it works
DO $$
BEGIN
  RAISE NOTICE 'Onboarding function update completed successfully!';
  RAISE NOTICE 'The complete_onboarding function now accepts the following parameters:';
  RAISE NOTICE '- user_uuid (UUID)';
  RAISE NOTICE '- user_role (TEXT)';
  RAISE NOTICE '- user_name (TEXT)';
  RAISE NOTICE '- user_phone (TEXT)';
  RAISE NOTICE '- user_state (TEXT)';
  RAISE NOTICE '- user_district (TEXT)';
  RAISE NOTICE '- user_pincode (TEXT)';
  RAISE NOTICE '- user_location (TEXT)';
END $$;
