"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";
import { completeOnboarding, debugUserProfile } from "@/lib/auth-utils";
import { detectUserLocation, extractIndianState, formatAddressShort } from "@/lib/location-utils";
import { INDIAN_STATES_AND_UTS } from "@/lib/constants";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading, hasCompletedOnboarding, refreshOnboardingStatus } = useAuth();
  const [form, setForm] = useState({
    role: "farmer",
    phone: "",
    state: "",
    district: "",
    pincode: "",
    location: "",
  });
  const [detecting, setDetecting] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [detectedLocation, setDetectedLocation] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);

  // Redirect if not authenticated or already completed onboarding
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (!loading && user && hasCompletedOnboarding === true) {
      router.push('/');
    }
  }, [user, loading, hasCompletedOnboarding, router]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    
    // Clear detected location feedback when user manually edits location
    if (name === 'location' && detectedLocation) {
      setDetectedLocation(null);
      setLocationError(null);
    }
  }

  async function detectLocation() {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    setDetecting(true);
    setLocationError(null);
    setDetectedLocation(null);

    try {
      console.log('Starting location detection...');
      const result = await detectUserLocation();
      
      console.log('Location detection successful:', result);
      
      // Set the detected location for display
      setDetectedLocation(result.formatted);
      
      // Auto-fill form fields if data is available
      const updates: Partial<typeof form> = {
        location: formatAddressShort(result)
      };
      
      // Auto-fill state if detected and matches Indian states
      if (result.state) {
        const indianState = extractIndianState(result);
        if (indianState && (INDIAN_STATES_AND_UTS as readonly string[]).includes(indianState)) {
          updates.state = indianState;
        }
      }
      
      // Auto-fill district if available
      if (result.district) {
        updates.district = result.district;
      }
      
      // Auto-fill pincode if available
      if (result.pincode) {
        updates.pincode = result.pincode;
      }
      
      setForm((f) => ({ ...f, ...updates }));
      
    } catch (error) {
      console.error('Location detection failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to detect location';
      setLocationError(errorMessage);
    } finally {
      setDetecting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    // Validate terms agreement
    setTermsError(null);
    if (!agreedToTerms) {
      setTermsError("You must agree to the Terms and Conditions and Privacy Policy to continue.");
      return;
    }

    setSubmitting(true);
    try {
      console.log('Starting onboarding submission for user:', user.id);
      
      // Debug user profile first
      await debugUserProfile(user.id);
      
      // Use the auth utility to complete onboarding
      const success = await completeOnboarding(user.id, {
        role: form.role,
        phone: form.phone,
        state: form.state,
        district: form.district,
        pincode: form.pincode,
        location: form.location,
      });

      console.log('Onboarding completion success:', success);

      if (!success) {
        console.error('Onboarding failed - function returned false');
        alert('Error saving profile. Please check the console for details and try again.');
        return;
      }

      // Refresh onboarding status in context
      console.log('Refreshing onboarding status...');
      await refreshOnboardingStatus();
      
      // Debug profile after completion
      await debugUserProfile(user.id);
      
      // Check for returnTo in sessionStorage
      const returnTo = typeof window !== 'undefined' ? sessionStorage.getItem('returnTo') : null;
      
      if (returnTo) {
        // Clear returnTo from sessionStorage
        sessionStorage.removeItem('returnTo');
        console.log('Redirecting to returnTo:', returnTo);
        router.push(returnTo);
      } else {
        // Redirect to home
        console.log('Redirecting to home...');
        router.push("/");
      }
    } catch (error) {
      console.error('Unexpected error during onboarding:', error);
      alert('Error saving profile. Please check the console for details and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-blue-700">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white p-6 rounded-lg shadow border border-blue-100">
        <h1 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4 text-center">Tell us about you</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">You are</label>
            <select name="role" value={form.role} onChange={handleChange} className="w-full h-11 border rounded-md px-3 text-black">
              <option value="farmer">Farmer</option>
              <option value="trader">Trader</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Contact number</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full h-11 border rounded-md px-3 text-black" placeholder="10-digit phone" required />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">State/UT</label>
            <select name="state" value={form.state} onChange={handleChange} className="w-full h-11 border rounded-md px-3 text-black" required>
              <option value="" disabled>Select state</option>
              {INDIAN_STATES_AND_UTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">District</label>
            <input name="district" value={form.district} onChange={handleChange} className="w-full h-11 border rounded-md px-3 text-black" required />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Pincode</label>
            <input name="pincode" value={form.pincode} onChange={handleChange} className="w-full h-11 border rounded-md px-3 text-black" required />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Location</label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input 
                  name="location" 
                  value={form.location} 
                  onChange={handleChange} 
                  className="flex-1 h-11 border rounded-md px-3 text-black" 
                  placeholder="Enter your location or detect automatically" 
                />
                <button 
                  type="button" 
                  onClick={detectLocation} 
                  disabled={detecting}
                  className="px-4 h-11 rounded-md border text-blue-700 border-blue-300 hover:bg-blue-50 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed font-medium whitespace-nowrap"
                >
                  {detecting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Detecting...
                    </span>
                  ) : (
                    "📍 Detect"
                  )}
                </button>
              </div>
              
              {/* Show detected location */}
              {detectedLocation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✅</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-green-800">Location detected successfully!</div>
                      <div className="text-sm text-green-700 mt-1">{detectedLocation}</div>
                      <div className="text-xs text-green-600 mt-1">
                        Form fields have been auto-filled. You can edit them if needed.
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Show error */}
              {locationError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">❌</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-red-800">Location detection failed</div>
                      <div className="text-sm text-red-700 mt-1">{locationError}</div>
                      <div className="text-xs text-red-600 mt-1">
                        Please enter your location manually or try again.
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Help text */}
              {!detecting && !detectedLocation && !locationError && (
                <div className="text-xs text-gray-500">
                  Click &ldquo;📍 Detect&rdquo; to automatically fill your location, or enter it manually.
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Terms and Conditions Agreement */}
        <div className="mt-6">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms-agreement"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
                if (e.target.checked) {
                  setTermsError(null);
                }
              }}
              className={`mt-1 h-4 w-4 text-blue-600 border-2 rounded focus:ring-blue-500 focus:ring-2 ${
                termsError ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <label htmlFor="terms-agreement" className="text-sm text-gray-700 leading-relaxed">
              I agree to the{' '}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline font-medium"
              >
                Terms and Conditions
              </a>
              {' '}and{' '}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline font-medium"
              >
                Privacy Policy
              </a>
              . I understand that by creating an account, I am accepting these terms and the collection and use of my data as described in the Privacy Policy.
            </label>
          </div>
          
          {/* Terms Error */}
          {termsError && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5 text-sm">⚠️</span>
                <div className="text-sm text-red-700">{termsError}</div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button 
            type="submit" 
            disabled={submitting || !agreedToTerms}
            className={`w-full h-11 rounded-md font-medium text-white transition-colors ${
              agreedToTerms && !submitting
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {submitting ? "Saving..." : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}


