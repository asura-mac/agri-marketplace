"use client";
import { supabase } from '@/lib/supabase';
import { handleAuthRedirect } from '@/lib/auth-utils';
import Image from "next/image";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from 'react-i18next';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const returnTo = searchParams.get('returnTo');

  // Check if user is already authenticated
  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) return;
      
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // If user is already authenticated, redirect to returnTo or use auth utility
        if (returnTo) {
          router.push(returnTo);
        } else {
          const redirectPath = await handleAuthRedirect(session.user);
          router.push(redirectPath);
        }
      }
    };

    checkUser();
  }, [router, returnTo]);

  const handleGoogleSignIn = async () => {
    if (!supabase) {
      alert('Authentication not available. Please check your configuration.');
      return;
    }

    try {
      // Build callback URL with returnTo parameter if present
      const callbackUrl = new URL('/auth/callback', window.location.origin);
      if (returnTo) {
        callbackUrl.searchParams.set('returnTo', returnTo);
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl.toString()
        }
      });
      
      if (error) {
        console.error('Error signing in with Google:', error.message);
        alert('Error signing in with Google. Please try again.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Unexpected error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 rounded-lg shadow border border-blue-100">
        <div className="flex items-center justify-center mb-6">
          <Image src="/KM-LOGO-FULL.png" alt="Logo" width={200} height={50} />
        </div>
        <h1 className="text-2xl font-semibold text-center text-blue-700 mb-2">{t("common.welcome")}</h1>
        <p className="text-center text-gray-600 mb-8">{t("common.signInMessage")}</p>
        <button
          onClick={handleGoogleSignIn}
          className="w-full h-11 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          {t("common.signInBtn")}
        </button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 rounded-lg shadow border border-blue-100">
          <div className="flex items-center justify-center mb-6">
            <Image src="/KM-LOGO-FULL.png" alt="Logo" width={200} height={50} />
          </div>
          <div className="text-center">
            <div className="text-blue-700 text-lg mb-2">Loading...</div>
            <div className="text-gray-500">Please wait while we prepare the login page.</div>
          </div>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}


