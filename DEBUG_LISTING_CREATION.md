# Debug Guide: Listing Creation Issues

## Problem Description
Images upload successfully to Supabase Storage but the listing entry fails to save in the `agricultural_listings` table, showing 'Error creating listing. Please try again.'

## Investigation Steps Implemented

### 1. Enhanced Logging
Added detailed console logging to track the entire flow:
- Form data preparation
- RPC parameter conversion
- Database function calls
- Response handling

### 2. Debug Functions Created
Created comprehensive debug functions in `database/05_debug_create_listing.sql`:

#### Test Functions:
- `test_create_listing_simple()` - Basic function execution test
- `test_agricultural_listings_access()` - Table access and authentication test
- `test_insert_listing()` - Minimal insert test
- `create_listing_debug()` - Enhanced version with detailed error reporting

### 3. Client-Side Debug Tools
Added debug functionality to the application:
- Debug test button on the listing form (🐛 Debug Test)
- Enhanced error logging in `listings-utils.ts`
- Authentication and database connectivity tests

## How to Debug the Issue

### Step 1: Apply Database Debug Functions
1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `database/05_debug_create_listing.sql`
3. Run the script to create debug functions

### Step 2: Test Basic Functionality
Run these SQL commands in Supabase SQL Editor (while authenticated):

```sql
-- Test 1: Basic function execution
SELECT test_create_listing_simple();

-- Test 2: Table access and authentication
SELECT test_agricultural_listings_access();

-- Test 3: Minimal insert test
SELECT test_insert_listing();

-- Test 4: Full debug test
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
```

### Step 3: Use Client-Side Debug Tools
1. Go to any sell category page (e.g., `/sell/grains`)
2. Click the "🐛 Debug Test" button
3. Check browser console for test results

### Step 4: Try Creating a Listing with Debug Mode
1. Fill out the listing form
2. Submit the form
3. Check browser console for detailed error information

## Common Issues and Solutions

### Issue 1: Authentication Problems
**Symptoms:** Debug test shows `User authenticated: false` or `User ID: NULL`

**Solutions:**
- Ensure user is logged in
- Check if session is valid
- Verify Supabase client configuration

### Issue 2: Table/Function Not Found
**Symptoms:** Error messages about missing table or function

**Solutions:**
- Run `database/03_agricultural_listings_setup.sql` 
- Run `database/05_debug_create_listing.sql`
- Check if functions have proper permissions

### Issue 3: RLS (Row Level Security) Issues
**Symptoms:** Insert errors even with valid authentication

**Solutions:**
- Check RLS policies on `agricultural_listings` table
- Verify `SECURITY DEFINER` is set on functions
- Ensure `auth.uid()` returns correct user ID

### Issue 4: Parameter Type Mismatches
**Symptoms:** Function parameter errors

**Solutions:**
- Check if decimal values are properly formatted
- Verify array parameters are correctly passed
- Ensure all required fields are provided

### Issue 5: Storage vs Database Disconnect
**Symptoms:** Images upload but database insert fails

**Solutions:**
- Check if image upload and database insert are properly sequenced
- Verify image URLs are correctly formatted
- Ensure transaction rollback on failure

## Debug Output Interpretation

### Success Indicators:
- `test_create_listing_simple()` returns: "Function executed successfully"
- `test_agricultural_listings_access()` returns: "Table exists: true, User authenticated: true, User ID: [uuid]"
- `create_listing_debug()` returns: "SUCCESS: [uuid]"

### Failure Indicators:
- Authentication errors: "User not authenticated"
- Table access errors: "Table exists: false"
- Validation errors: "ERROR: [field] is required"
- Insert errors: "Insert failed - SQLSTATE: [code]"

## Temporary Workarounds

### If Database Functions Fail:
1. Use the debug function (`create_listing_debug`) instead of the original
2. Check the returned error message for specific issues
3. Apply targeted fixes based on error details

### If Authentication Issues:
1. Verify Supabase configuration
2. Check environment variables
3. Test with a fresh login session

## Cleanup After Resolution

Once the issue is resolved, remember to:
1. Remove the debug test button from the UI
2. Switch back from `create_listing_debug` to `create_listing`
3. Remove excessive console logging
4. Remove debug SQL functions if not needed

## Files Modified for Debugging

1. `database/05_debug_create_listing.sql` - Debug functions
2. `src/lib/listings-utils.ts` - Enhanced logging and debug function calls
3. `src/lib/supabase.ts` - Authentication and connectivity tests
4. `src/app/sell/[category]/page.tsx` - Debug test button and enhanced error messages

## SOLUTION FOUND: Multiple Issues Fixed

**Problems Identified:**
1. `null value in column "id" of relation "agricultural_listings" violates not-null constraint`
2. Database schema mismatch - using `location` vs separate `state`/`district` fields
3. Missing `whatsapp_number` field in database functions
4. Incorrect function parameters being passed

**Root Causes:** 
1. The `gen_random_uuid()` function was not working properly
2. Client code was sending `state`/`district` but database expected `location`
3. Database functions were outdated

**Solution Steps:**
1. **FIRST:** Apply `database/06_fix_id_generation.sql` (UUID generation fix)
2. **SECOND:** Apply `database/07_update_listing_location_to_state_district.sql` (Schema update)
3. These will:
   - Enable required UUID extensions (`uuid-ossp` and `pgcrypto`)
   - Update table to have `state`, `district`, and `whatsapp_number` columns
   - Update all database functions to use new schema
   - Migrate existing data from `location` to `state`/`district`

**Test the Fix:**
```sql
-- Test UUID generation
SELECT test_uuid_generation();

-- Test listing creation with new schema
SELECT create_listing_debug(
  'grains', 'Test Wheat', 'High quality wheat', 
  25.50, 'kg', 10.00, 'Maharashtra', 'Mumbai', 
  '9876543210', '9876543210',
  ARRAY['http://example.com/image1.jpg']
);
```

## Next Steps

1. **IMMEDIATE:** Apply `database/06_fix_id_generation.sql` to fix the UUID issue
2. Test the debug functions using the SQL Editor
3. Use the client-side debug button to test connectivity
4. Try creating a listing and examine the detailed console output
5. Once working, remove debug functions and revert to clean production code

The enhanced logging and debug functions should provide clear insight into exactly where and why the listing creation is failing.
