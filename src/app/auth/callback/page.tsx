"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { handleAuthRedirect } from "@/lib/auth-utils";

export default function AuthCallbackPage() {
  const router = useRouter();

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

        // Use the auth utility to determine redirect
        const redirectPath = await handleAuthRedirect(session?.user || null);
        router.push(redirectPath);
        
      } catch (error) {
        console.error('Unexpected error:', error);
        router.push('/login');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="text-blue-700 text-lg mb-2">Completing sign in...</div>
        <div className="text-gray-500">Please wait while we redirect you.</div>
      </div>
    </div>
  );
}
