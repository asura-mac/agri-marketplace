"use client";
import { supabase } from '@/lib/supabase';
import { handleAuthRedirect } from '@/lib/auth-utils';
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // Check if user is already authenticated
  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) return;
      
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Use auth utility to determine redirect
        const redirectPath = await handleAuthRedirect(session.user);
        router.push(redirectPath);
      }
    };

    checkUser();
  }, [router]);

  const handleGoogleSignIn = async () => {
    if (!supabase) {
      alert('Authentication not available. Please check your configuration.');
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
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
        <h1 className="text-2xl font-semibold text-center text-blue-700 mb-2">Welcome</h1>
        <p className="text-center text-gray-600 mb-8">Sign in with Google to continue</p>
        <button
          onClick={handleGoogleSignIn}
          className="w-full h-11 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}


