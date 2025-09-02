-- =====================================================
-- DEBUG AND FIX ONBOARDING FUNCTION
-- =====================================================
-- This script debugs and fixes the complete_onboarding function

-- First, let's check if the user_profiles table has all required columns
DO $$
DECLARE
    missing_columns TEXT[] := ARRAY[]::TEXT[];
    col_name TEXT;
BEGIN
    -- Check for required columns
    FOR col_name IN SELECT unnest(ARRAY['user_id', 'role', 'phone', 'state', 'district', 'pincode', 'location', 'onboarding_completed', 'email', 'created_at', 'updated_at'])
    LOOP
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'user_profiles' 
            AND column_name = col_name
        ) THEN
            missing_columns := array_append(missing_columns, col_name);
        END IF;
    END LOOP;
    
    IF array_length(missing_columns, 1) > 0 THEN
        RAISE NOTICE 'Missing columns in user_profiles table: %', array_to_string(missing_columns, ', ');
    ELSE
        RAISE NOTICE 'All required columns exist in user_profiles table';
    END IF;
END $$;

-- =====================================================
-- IMPROVED COMPLETE ONBOARDING FUNCTION WITH DEBUG
-- =====================================================
CREATE OR REPLACE FUNCTION public.complete_onboarding(
  user_uuid UUID,
  user_role TEXT,
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
  RAISE LOG 'complete_onboarding called for user: %', user_uuid;
  
  -- Check if profile exists
  SELECT EXISTS(SELECT 1 FROM user_profiles WHERE user_id = user_uuid) INTO profile_exists;
  
  IF NOT profile_exists THEN
    RAISE LOG 'No profile found for user %, creating one', user_uuid;
    
    -- Insert profile if it doesn't exist (fallback)
    INSERT INTO user_profiles (
      user_id,
      role,
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
-- ENHANCED TRIGGER FUNCTION WITH BETTER ERROR HANDLING
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log trigger execution
  RAISE LOG 'handle_new_user trigger called for user: %', NEW.id;
  
  -- Insert new user profile
  INSERT INTO public.user_profiles (
    user_id,
    email,
    onboarding_completed,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    FALSE,
    NOW(),
    NOW()
  );
  
  RAISE LOG 'Created profile for user: %', NEW.id;
  RETURN NEW;
  
EXCEPTION
  WHEN unique_violation THEN
    -- Profile already exists, do nothing
    RAISE LOG 'Profile already exists for user: %', NEW.id;
    RETURN NEW;
  WHEN OTHERS THEN
    -- Log error but don't fail the auth process
    RAISE LOG 'Error creating user profile for user %: % %', NEW.id, SQLERRM, SQLSTATE;
    RETURN NEW;
END;
$$;

-- =====================================================
-- FUNCTION TO DEBUG USER PROFILES
-- =====================================================
CREATE OR REPLACE FUNCTION public.debug_user_profile(user_uuid UUID)
RETURNS TABLE(
  profile_exists BOOLEAN,
  user_id UUID,
  email TEXT,
  role TEXT,
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
  
  -- If no rows found, return a row indicating profile doesn't exist
  IF NOT FOUND THEN
    RETURN QUERY SELECT 
      FALSE as profile_exists,
      user_uuid,
      NULL::TEXT as email,
      NULL::TEXT as role,
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

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.complete_onboarding(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.debug_user_profile(UUID) TO authenticated;

-- =====================================================
-- TEST THE FUNCTION (RUN THIS TO DEBUG)
-- =====================================================
-- You can test with a real user ID from your auth.users table
-- SELECT public.debug_user_profile('your-user-id-here');
-- SELECT public.complete_onboarding('your-user-id-here', 'farmer', '1234567890', 'State', 'District', '123456', 'Location');
