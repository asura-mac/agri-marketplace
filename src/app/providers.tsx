"use client";
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { checkOnboardingStatus } from '@/lib/auth-utils';
import { SearchProvider } from '@/contexts/SearchContext';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  hasCompletedOnboarding: boolean | null;
  refreshOnboardingStatus: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

  const refreshOnboardingStatus = useCallback(async () => {
    if (!user) {
      setHasCompletedOnboarding(null);
      return;
    }

    const status = await checkOnboardingStatus(user.id);
    setHasCompletedOnboarding(status);
  }, [user]);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Clear onboarding status when user changes
      if (session?.user) {
        // Small delay to ensure profile is created by trigger
        setTimeout(() => {
          checkOnboardingStatus(session.user.id).then(setHasCompletedOnboarding);
        }, 1000);
      } else {
        setHasCompletedOnboarding(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check onboarding status when user becomes available
  useEffect(() => {
    if (user && hasCompletedOnboarding === null) {
      refreshOnboardingStatus();
    }
  }, [user, hasCompletedOnboarding, refreshOnboardingStatus]);

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      setHasCompletedOnboarding(null);
    }
  };

  const value = {
    user,
    session,
    loading,
    hasCompletedOnboarding,
    refreshOnboardingStatus,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      <SearchProvider>
        {children}
      </SearchProvider>
    </AuthContext.Provider>
  );
}


