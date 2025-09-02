# Debug Onboarding Function Issues

## 🚨 Problem
Users get "Error saving profile. Please try again." when completing onboarding, even though all required columns exist in the user_profiles table.

## 🔍 Debugging Steps

### Step 1: Apply the Debug Database Functions
1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `database/02_debug_onboarding_function.sql`
3. Click **Run** to execute the script

This will:
- Check if all required columns exist
- Replace the function with better error handling
- Add logging for debugging
- Create a debug function to inspect user profiles

### Step 2: Check Database Logs
1. In Supabase Dashboard → Logs → Database
2. Look for log messages starting with:
   - `complete_onboarding called for user:`
   - `No profile found for user`
   - `Updating existing profile for user`
   - `Error in complete_onboarding for user`

### Step 3: Test the Function Directly
Run this in Supabase SQL Editor to test the function:

```sql
-- Replace 'your-user-id' with an actual user ID from auth.users
SELECT public.debug_user_profile('your-user-id-here');

-- Test the complete_onboarding function directly
SELECT public.complete_onboarding(
  'your-user-id-here'::UUID,
  'farmer',
  '1234567890',
  'Test State',
  'Test District',
  '123456',
  'Test Location'
);
```

### Step 4: Check Browser Console
The updated code includes extensive logging. Look for:
- `Starting onboarding submission for user:`
- `Attempting to complete onboarding for user:`
- `Database error completing onboarding:`
- `Onboarding completion result:`

### Step 5: Common Issues and Solutions

#### Issue 1: Profile Doesn't Exist
**Symptoms:** Log shows "No profile found for user"
**Solution:** The trigger might not be working. Check:
```sql
-- Verify trigger exists
SELECT * FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Check if profiles are being created for new users
SELECT user_id, email, created_at 
FROM user_profiles 
ORDER BY created_at DESC 
LIMIT 10;
```

#### Issue 2: RLS Policy Issues
**Symptoms:** Function returns false even with SECURITY DEFINER
**Solution:** Check RLS policies:
```sql
-- Check current policies
SELECT * FROM pg_policies WHERE tablename = 'user_profiles';

-- Temporarily disable RLS for testing (re-enable after!)
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
-- Test the function
-- ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
```

#### Issue 3: Column Type Mismatches
**Symptoms:** SQL errors in logs about data types
**Solution:** Check column definitions:
```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'user_profiles'
ORDER BY ordinal_position;
```

#### Issue 4: Function Permission Issues
**Symptoms:** "permission denied for function" errors
**Solution:** Re-grant permissions:
```sql
GRANT EXECUTE ON FUNCTION public.complete_onboarding(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.debug_user_profile(UUID) TO authenticated;
```

### Step 6: Manual Profile Creation (Fallback)
If the function continues to fail, you can create a fallback method that directly inserts/updates the profile:

```sql
-- Create a simple fallback function
CREATE OR REPLACE FUNCTION public.fallback_complete_onboarding(
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
AS $$
BEGIN
  INSERT INTO user_profiles (
    user_id, role, phone, state, district, pincode, location, 
    onboarding_completed, updated_at
  ) VALUES (
    user_uuid, user_role, user_phone, user_state, user_district, 
    user_pincode, user_location, TRUE, NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    role = EXCLUDED.role,
    phone = EXCLUDED.phone,
    state = EXCLUDED.state,
    district = EXCLUDED.district,
    pincode = EXCLUDED.pincode,
    location = EXCLUDED.location,
    onboarding_completed = TRUE,
    updated_at = NOW();
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Fallback error: % %', SQLERRM, SQLSTATE;
    RETURN FALSE;
END;
$$;

GRANT EXECUTE ON FUNCTION public.fallback_complete_onboarding(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated;
```

## 🔧 Quick Fixes to Try

### 1. Check User Profile Table Structure
```sql
\d user_profiles
```

### 2. Verify User Exists in Auth
```sql
SELECT id, email, created_at 
FROM auth.users 
WHERE id = 'your-user-id-here';
```

### 3. Check for Duplicate Profiles
```sql
SELECT user_id, COUNT(*) 
FROM user_profiles 
GROUP BY user_id 
HAVING COUNT(*) > 1;
```

### 4. Test RPC Call Directly
In browser console (after logging in):
```javascript
// Get current user
const { data: { user } } = await supabase.auth.getUser();
console.log('Current user:', user);

// Test debug function
const { data, error } = await supabase.rpc('debug_user_profile', {
  user_uuid: user.id
});
console.log('Debug result:', data, error);

// Test complete onboarding
const result = await supabase.rpc('complete_onboarding', {
  user_uuid: user.id,
  user_role: 'farmer',
  user_phone: '1234567890',
  user_state: 'Test State',
  user_district: 'Test District',
  user_pincode: '123456',
  user_location: 'Test Location'
});
console.log('Onboarding result:', result);
```

## 📊 Expected Results After Fix

1. **Database logs** should show successful function execution
2. **Browser console** should show detailed step-by-step execution
3. **Profile debugging** should show the profile exists and is updated
4. **Function should return `true`** indicating success
5. **User should be redirected** to home page after completion

## 🚨 If All Else Fails

If the database function approach continues to fail, we can implement a direct table update approach in the application code as a last resort. Let me know if you need this fallback implementation.

Run through these steps and let me know what you find in the logs!
