'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers';

/**
 * Custom hook for protecting actions that require authentication
 * Redirects to login with returnTo parameter if user is not authenticated
 */
export function useAuthProtection() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const requireAuth = (action: () => void, returnTo?: string) => {
    if (loading) {
      // Still loading, wait before taking action
      return;
    }

    if (!user) {
      // User not authenticated, redirect to login with return URL
      const currentPath = returnTo || window.location.pathname;
      const loginUrl = `/login?returnTo=${encodeURIComponent(currentPath)}`;
      router.push(loginUrl);
      return;
    }

    // User is authenticated, execute the action
    action();
  };

  const navigateToListing = (listingId: string) => {
    requireAuth(() => {
      router.push(`/listings/${listingId}`);
    }, `/listings/${listingId}`);
  };

  return {
    requireAuth,
    navigateToListing,
    isAuthenticated: !!user,
    isLoading: loading
  };
}
