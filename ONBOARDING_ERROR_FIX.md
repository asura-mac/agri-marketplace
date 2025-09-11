# Fix for Onboarding Error: "Error saving profile"

## 🚨 Problem Description

Users were encountering the error "Error saving profile. Please check the console for details and try again." when completing the onboarding process. Console logs showed:

```
Object { role: "buyer", name: "Test Account", phone: "7002080457", state: "Assam", district: "Tezpur", pincode: "784028", location: "Tezpur, Assam" }
Onboarding completion result: false
Onboarding completion success: false
```

## 🔍 Root Cause Analysis

The issue was caused by a parameter mismatch between the JavaScript code and the database function:

1. **JavaScript Code**: Was trying to pass `user_name` parameter to the `complete_onboarding` function
2. **Database Function**: The original `complete_onboarding` function only accepted these parameters:
   - `user_uuid`
   - `user_role`
   - `user_phone`
   - `user_state`
   - `user_district`
   - `user_pincode`
   - `user_location`

3. **Missing Parameter**: The function was missing the `user_name` parameter, causing it to fail silently and return `false`.

## ✅ Solution Implemented

### 1. Updated Database Function

**File**: `database/05_fix_onboarding_function.sql`

**Changes Made**:
- Added `name` column to `user_profiles` table if it doesn't exist
- Updated `complete_onboarding` function to accept `user_name` parameter
- Enhanced logging for better debugging
- Improved error handling with EXCEPTION blocks
- Updated the `debug_user_profile` function to include name field

**New Function Signature**:
```sql
CREATE OR REPLACE FUNCTION public.complete_onboarding(
  user_uuid UUID,
  user_role TEXT,
  user_name TEXT,        -- ← ADDED THIS PARAMETER
  user_phone TEXT,
  user_state TEXT,
  user_district TEXT,
  user_pincode TEXT,
  user_location TEXT
)
```

### 2. Verified JavaScript Code

**File**: `src/lib/auth-utils.ts`

**Confirmed Parameters**:
```typescript
const { data, error } = await supabase.rpc('complete_onboarding', {
  user_uuid: userId,
  user_role: profileData.role,
  user_name: profileData.name,  // ← This now matches the database function
  user_phone: profileData.phone,
  user_state: profileData.state,
  user_district: profileData.district,
  user_pincode: profileData.pincode,
  user_location: profileData.location
});
```

## 🛠️ Installation Steps

### Step 1: Apply Database Fix

1. Go to your **Supabase Dashboard**
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `database/05_fix_onboarding_function.sql`
4. Click **Run** to execute the script

This will:
- ✅ Add the `name` column to `user_profiles` table (if missing)
- ✅ Update the `complete_onboarding` function with proper parameters
- ✅ Add enhanced logging for debugging
- ✅ Update the debug function to include name field

### Step 2: Verify the Fix

After running the SQL script, you should see these success messages:
```
NOTICE: Onboarding function update completed successfully!
NOTICE: The complete_onboarding function now accepts the following parameters:
NOTICE: - user_uuid (UUID)
NOTICE: - user_role (TEXT)
NOTICE: - user_name (TEXT)
NOTICE: - user_phone (TEXT)
NOTICE: - user_state (TEXT)
NOTICE: - user_district (TEXT)
NOTICE: - user_pincode (TEXT)
NOTICE: - user_location (TEXT)
```

### Step 3: Test the Fix

1. Create a new test user account
2. Complete the onboarding process
3. Verify that the profile is saved successfully
4. Check that no error messages appear

## 🔧 Technical Details

### Database Schema Updates

```sql
-- Added column (if it doesn't exist)
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS name TEXT;

-- Added index for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_name ON user_profiles(name);
```

### Function Logic Improvements

1. **Better Error Handling**: Added EXCEPTION blocks to catch and log errors
2. **Enhanced Logging**: Added detailed RAISE LOG statements for debugging
3. **Profile Creation Fallback**: Function can create profiles if they don't exist
4. **Return Value Clarity**: Clear boolean return based on actual operation success

### Enhanced Debugging

The updated `debug_user_profile` function now returns:
- `profile_exists`: Boolean indicating if profile exists
- `name`: User's name field
- All other profile fields for comprehensive debugging

## 🧪 Testing Commands

You can test the fix directly in Supabase SQL Editor:

```sql
-- Test the function with sample data
SELECT public.complete_onboarding(
  'your-user-id-here'::UUID,
  'farmer',
  'Test User Name',
  '1234567890',
  'Test State',
  'Test District',
  '123456',
  'Test Location'
);

-- Debug a specific user profile
SELECT * FROM public.debug_user_profile('your-user-id-here'::UUID);
```

## ✅ Expected Results After Fix

### Before Fix:
- ❌ Error: "Error saving profile. Please check the console for details and try again."
- ❌ Console shows: `Onboarding completion result: false`
- ❌ User profile not saved to database
- ❌ User stuck on onboarding page

### After Fix:
- ✅ Onboarding completes successfully
- ✅ User profile saved with all fields including name
- ✅ Console shows: `Onboarding completion result: true`
- ✅ User redirected to appropriate page after onboarding
- ✅ No error messages

## 🔒 Security Notes

- The function uses `SECURITY DEFINER` to ensure proper permissions
- RLS policies remain intact and functional
- All user input is properly parameterized to prevent SQL injection
- Function only updates the calling user's own profile (auth.uid() validation)

## 📊 Monitoring

After implementing the fix, monitor:

1. **Supabase Logs**: Check Database logs for `complete_onboarding called for user:` messages
2. **Application Logs**: Verify `Onboarding completion result: true` in browser console
3. **Database Records**: Confirm user profiles are being created with all fields populated
4. **User Flow**: Ensure users can complete onboarding and access the application

The fix ensures that the onboarding process works reliably for all new users!
