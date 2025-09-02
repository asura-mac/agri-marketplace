-- =====================================================
-- USER PROFILES AUTOMATIC CREATION SETUP
-- =====================================================
-- This script sets up automatic user profile creation 
-- when new users sign up via Supabase Auth

-- First, update the user_profiles table structure
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

-- =====================================================
-- SECURITY DEFINER FUNCTION TO CREATE USER PROFILES
-- =====================================================
-- This function bypasses RLS to ensure profile creation works
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
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
  
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Profile already exists, do nothing
    RETURN NEW;
  WHEN OTHERS THEN
    -- Log error but don't fail the auth process
    RAISE LOG 'Error creating user profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- =====================================================
-- TRIGGER TO AUTO-CREATE PROFILES
-- =====================================================
-- This trigger fires when a new user is created in auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- OPTIMIZED RLS POLICIES
-- =====================================================
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

-- Create optimized RLS policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Note: We don't need INSERT policy since profiles are created by trigger
-- The trigger function uses SECURITY DEFINER to bypass RLS

-- =====================================================
-- UTILITY FUNCTION FOR CHECKING ONBOARDING STATUS
-- =====================================================
CREATE OR REPLACE FUNCTION public.get_user_onboarding_status(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  onboarding_status BOOLEAN;
BEGIN
  SELECT onboarding_completed 
  INTO onboarding_status
  FROM user_profiles 
  WHERE user_id = user_uuid;
  
  -- Return FALSE if no profile found (shouldn't happen with trigger)
  RETURN COALESCE(onboarding_status, FALSE);
END;
$$;

-- =====================================================
-- FUNCTION TO COMPLETE ONBOARDING
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
BEGIN
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
  
  -- Return TRUE if update was successful
  RETURN FOUND;
END;
$$;

-- =====================================================
-- GRANT NECESSARY PERMISSIONS
-- =====================================================
-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_onboarding_status(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.complete_onboarding(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated;

-- =====================================================
-- CLEAN UP EXISTING DUPLICATE PROFILES (ONE-TIME)
-- =====================================================
-- This will remove duplicate profiles keeping only the latest one
WITH duplicates AS (
  SELECT user_id, 
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) as rn
  FROM user_profiles
)
DELETE FROM user_profiles 
WHERE (user_id, created_at) IN (
  SELECT up.user_id, up.created_at 
  FROM user_profiles up
  JOIN duplicates d ON up.user_id = d.user_id 
  WHERE d.rn > 1
);
