"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { handleAuthRedirect } from "@/lib/auth-utils";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (!supabase) {
        router.push('/login');
        return;
      }

      try {
        // Get the current session after OAuth redirect
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth error:', error);
          router.push('/login');
          return;
        }

        // Wait a moment for the database trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Check for returnTo parameter
        const returnTo = searchParams.get('returnTo');
        
        if (returnTo) {
          // Check if user completed onboarding before redirecting to returnTo
          const { checkOnboardingStatus } = await import('@/lib/auth-utils');
          const hasCompletedOnboarding = await checkOnboardingStatus(session?.user?.id || '');
          
          if (!hasCompletedOnboarding) {
            // Store returnTo in sessionStorage for after onboarding
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('returnTo', returnTo);
            }
            router.push('/onboarding');
          } else {
            // User has completed onboarding, redirect to intended page
            router.push(returnTo);
          }
        } else {
          // No returnTo parameter, use default auth redirect
          const redirectPath = await handleAuthRedirect(session?.user || null);
          router.push(redirectPath);
        }
        
      } catch (error) {
        console.error('Unexpected error:', error);
        router.push('/login');
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="text-blue-700 text-lg mb-2">Completing sign in...</div>
        <div className="text-gray-500">Please wait while we redirect you.</div>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-blue-700 text-lg mb-2">Loading...</div>
          <div className="text-gray-500">Please wait while we process your authentication.</div>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
