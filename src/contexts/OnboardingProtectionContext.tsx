'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/providers';

interface OnboardingProtectionContextType {
  isOnboardingRequired: boolean;
  isNavigationBlocked: boolean;
  setNavigationBlocked: (blocked: boolean) => void;
  attemptNavigation: (href: string) => boolean;
}

const OnboardingProtectionContext = createContext<OnboardingProtectionContextType | null>(null);

export function useOnboardingProtection() {
  const context = useContext(OnboardingProtectionContext);
  if (!context) {
    throw new Error('useOnboardingProtection must be used within OnboardingProtectionProvider');
  }
  return context;
}

interface OnboardingProtectionProviderProps {
  children: React.ReactNode;
}

export function OnboardingProtectionProvider({ children }: OnboardingProtectionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, hasCompletedOnboarding } = useAuth();
  const [isNavigationBlocked, setNavigationBlocked] = useState(false);

  // Determine if onboarding is required
  const isOnboardingRequired = !loading && !!user && hasCompletedOnboarding === false;

  // Auto-block navigation when user needs onboarding and is on onboarding page
  useEffect(() => {
    if (isOnboardingRequired && pathname === '/onboarding') {
      setNavigationBlocked(true);
    } else if (isOnboardingRequired && (pathname === '/privacy' || pathname === '/terms')) {
      // Allow viewing privacy/terms pages but don't block navigation from them
      setNavigationBlocked(false);
    } else {
      setNavigationBlocked(false);
    }
  }, [isOnboardingRequired, pathname]);

  // Redirect to onboarding if required and not already there
  useEffect(() => {
    const allowedDuringOnboarding = ['/onboarding', '/privacy', '/terms'];
    
    if (isOnboardingRequired && !allowedDuringOnboarding.includes(pathname)) {
      router.push('/onboarding');
    }
  }, [isOnboardingRequired, pathname, router]);

  // Attempt navigation - returns false if blocked
  const attemptNavigation = (href: string): boolean => {
    // Allow navigation to privacy policy and terms & conditions even when blocked
    const allowedDuringOnboarding = ['/privacy', '/terms'];
    
    if (isNavigationBlocked && !allowedDuringOnboarding.includes(href)) {
      // Show warning to user
      alert('Please complete your profile setup before navigating to other pages.');
      return false;
    }
    
    // Allow navigation
    router.push(href);
    return true;
  };

  // Block browser back/forward buttons and keyboard shortcuts during onboarding
  useEffect(() => {
    if (!isNavigationBlocked) return;

    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      // Push the current state back to prevent navigation
      window.history.pushState(null, '', window.location.href);
      alert('Please complete your profile setup before navigating to other pages.');
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = 'Please complete your profile setup before leaving this page.';
      return 'Please complete your profile setup before leaving this page.';
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Block common navigation keyboard shortcuts
      const blockedCombinations = [
        // Ctrl/Cmd + R (refresh)
        (event.ctrlKey || event.metaKey) && event.key === 'r',
        // Ctrl/Cmd + L (address bar)
        (event.ctrlKey || event.metaKey) && event.key === 'l',
        // Ctrl/Cmd + T (new tab)
        (event.ctrlKey || event.metaKey) && event.key === 't',
        // Ctrl/Cmd + W (close tab)
        (event.ctrlKey || event.metaKey) && event.key === 'w',
        // Alt + Left/Right (browser back/forward)
        event.altKey && (event.key === 'ArrowLeft' || event.key === 'ArrowRight'),
        // F5 (refresh)
        event.key === 'F5',
        // Alt + F4 (close window)
        event.altKey && event.key === 'F4'
      ];

      if (blockedCombinations.some(blocked => blocked)) {
        event.preventDefault();
        alert('Please complete your profile setup before navigating to other pages.');
      }
    };

    // Push initial state to enable blocking
    window.history.pushState(null, '', window.location.href);
    
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isNavigationBlocked]);

  const value: OnboardingProtectionContextType = {
    isOnboardingRequired,
    isNavigationBlocked,
    setNavigationBlocked,
    attemptNavigation
  };

  return (
    <OnboardingProtectionContext.Provider value={value}>
      {children}
    </OnboardingProtectionContext.Provider>
  );
}
