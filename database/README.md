# Database Setup Instructions

## Overview
This directory contains SQL scripts to fix the Supabase authentication and RLS issues.

## Prerequisites
- Access to your Supabase project's SQL Editor
- Admin privileges on the database

## Installation Steps

### Step 1: Run the Database Setup
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `01_user_profiles_setup.sql`
4. Click **Run** to execute the script
5. Copy and paste the contents of `03_agricultural_listings_setup.sql`
6. Click **Run** to execute the listings script
7. (Optional) If you have existing listings, run `04_add_contact_phone_migration.sql` to add contact phone field

### Step 2: Verify the Setup
After running the script, verify:

```sql
-- Check if trigger exists
SELECT * FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Check if functions exist
SELECT routine_name FROM information_schema.routines 
WHERE routine_name IN ('handle_new_user', 'get_user_onboarding_status', 'complete_onboarding');

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'user_profiles';
```

### Step 3: Test the Setup
1. Create a test user account through your app
2. Check that a profile was automatically created:
```sql
SELECT * FROM user_profiles WHERE email = 'test@example.com';
```

## What This Setup Does

### 1. Automatic Profile Creation
- **Trigger**: Automatically creates user profiles when users sign up
- **Security**: Uses SECURITY DEFINER to bypass RLS during creation
- **Duplicate Prevention**: Handles unique violations gracefully

### 2. Optimized RLS Policies
- **View Policy**: Users can only see their own profiles
- **Update Policy**: Users can only update their own profiles
- **No Insert Policy**: Profiles are created automatically by trigger

### 3. Utility Functions
- **get_user_onboarding_status()**: Check if user completed onboarding
- **complete_onboarding()**: Mark onboarding as complete with profile data

### 4. Data Cleanup
- **Removes Duplicates**: One-time cleanup of existing duplicate profiles
- **Preserves Latest**: Keeps the most recent profile for each user

## Troubleshooting

### If Profiles Are Still Not Created
1. Check if the trigger is active:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
```

2. Check function permissions:
```sql
SELECT * FROM information_schema.routine_privileges 
WHERE routine_name = 'handle_new_user';
```

### If RLS Issues Persist
1. Verify RLS is enabled:
```sql
SELECT relname, relrowsecurity FROM pg_class WHERE relname = 'user_profiles';
```

2. Check policy coverage:
```sql
SELECT * FROM pg_policies WHERE tablename = 'user_profiles';
```

## Security Notes
- Functions use `SECURITY DEFINER` to bypass RLS only when necessary
- All user-facing operations still respect RLS policies
- Functions include proper error handling and logging
