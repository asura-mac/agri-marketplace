# Authentication Protection for Listing Details

## Overview

This feature implements authentication protection for listing detail pages, ensuring that only authenticated users can view listing details. Users who click on listing cards without being authenticated are redirected to the login page and then returned to their intended listing after successful authentication.

## Implementation Details

### 1. Custom Hook: `useAuthProtection`

**Location**: `src/hooks/useAuthProtection.ts`

**Purpose**: Provides reusable authentication logic for components that require user authentication.

**Key Functions**:
- `requireAuth(action, returnTo)`: Executes action if authenticated, otherwise redirects to login with returnTo URL
- `navigateToListing(listingId)`: Specifically handles navigation to listing pages with auth protection
- `isAuthenticated`: Boolean indicating current auth status
- `isLoading`: Boolean indicating if auth check is in progress

### 2. Updated Components

#### ListingCard Component
**Location**: `src/components/ListingCard.tsx`

**Changes**:
- Replaced direct `Link` navigation with auth-protected click handler
- Added loading state during auth checks
- Uses `useAuthProtection` hook for secure navigation

#### Login Page
**Location**: `src/app/(auth)/login/page.tsx`

**Changes**:
- Handles `returnTo` query parameter from URL
- Passes returnTo parameter to OAuth callback
- Redirects authenticated users to intended page or default location

#### Auth Callback Page
**Location**: `src/app/auth/callback/page.tsx`

**Changes**:
- Processes `returnTo` parameter from OAuth redirect
- Handles onboarding flow with return URL preservation
- Uses sessionStorage to maintain returnTo across onboarding

#### Onboarding Page
**Location**: `src/app/onboarding/page.tsx`

**Changes**:
- Checks sessionStorage for returnTo URL after onboarding completion
- Redirects to intended listing page after successful onboarding

## User Flow

### Authenticated User
1. User clicks on listing card
2. Immediate navigation to listing detail page

### Unauthenticated User
1. User clicks on listing card
2. Redirect to login page with `returnTo` parameter: `/login?returnTo=/listings/{id}`
3. User completes Google OAuth
4. System checks onboarding status:
   - **If onboarding complete**: Redirect to listing page
   - **If onboarding incomplete**: Store returnTo in sessionStorage, redirect to onboarding
5. After onboarding completion: Redirect to original listing page

## URL Examples

```
# User clicks listing without auth
/listings/123 → /login?returnTo=%2Flistings%2F123

# OAuth callback with return URL
/auth/callback?returnTo=%2Flistings%2F123

# Final redirect after auth/onboarding
/listings/123
```

## Security Considerations

1. **URL Validation**: returnTo parameters are validated to prevent open redirects
2. **Session Storage**: Used temporarily for onboarding flow, cleared after use
3. **Auth State**: Proper auth state checking prevents unauthorized access
4. **Fallback**: Default redirects ensure users don't get stuck in redirect loops

## Testing the Feature

### Manual Testing Steps

1. **Unauthenticated User Flow**:
   - Log out completely
   - Navigate to home page
   - Click on any listing card
   - Verify redirect to login with returnTo parameter
   - Complete Google OAuth
   - Verify redirect to intended listing

2. **New User Flow**:
   - Create new Google account or use incognito
   - Follow steps above
   - Complete onboarding process
   - Verify final redirect to intended listing

3. **Authenticated User Flow**:
   - Ensure logged in
   - Click on listing card
   - Verify immediate navigation to listing

### Error Scenarios

1. **Invalid returnTo URL**: Should fallback to default redirect
2. **Network errors during auth**: Should show appropriate error messages
3. **Onboarding interruption**: Should preserve returnTo across page refreshes

## Configuration

No additional configuration required. The feature uses existing:
- Supabase authentication setup
- Google OAuth configuration
- Existing onboarding flow

## Dependencies

- `@supabase/supabase-js`: Authentication
- `next/navigation`: Router and URL handling
- Existing auth utilities: `handleAuthRedirect`, `checkOnboardingStatus`

## Future Enhancements

1. **Deep Linking**: Support for complex URLs with query parameters
2. **Breadcrumb Tracking**: Remember user's navigation path
3. **Analytics**: Track conversion rates from listing clicks to authentication
4. **Social Sharing**: Pre-populate sharing with return URLs
