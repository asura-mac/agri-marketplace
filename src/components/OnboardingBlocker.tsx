'use client';

import { useOnboardingProtection } from '@/contexts/OnboardingProtectionContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface OnboardingBlockerProps {
  children: React.ReactNode;
  redirectPath?: string;
  showMessage?: boolean;
}

/**
 * Component that blocks access to pages during onboarding
 * Redirects users who haven't completed onboarding to the onboarding page
 */
export default function OnboardingBlocker({ 
  children, 
  redirectPath = '/onboarding',
  showMessage = true 
}: OnboardingBlockerProps) {
  const { isOnboardingRequired } = useOnboardingProtection();
  const router = useRouter();

  useEffect(() => {
    if (isOnboardingRequired) {
      router.push(redirectPath);
    }
  }, [isOnboardingRequired, redirectPath, router]);

  // Show loading/blocking message while redirecting
  if (isOnboardingRequired) {
    if (!showMessage) {
      return null;
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="text-blue-700 text-lg font-semibold mb-2">
              Profile Setup Required
            </div>
            <p className="text-blue-600 text-sm mb-4">
              Please complete your profile setup before accessing this page.
            </p>
            <div className="text-blue-500 text-sm">
              Redirecting to profile setup...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
