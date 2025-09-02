"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";
import { completeOnboarding, debugUserProfile } from "@/lib/auth-utils";

const indianStatesAndUTs = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
];

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
  const [submitting, setSubmitting] = useState(false);

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
  }

  async function detectLocation() {
    if (!navigator.geolocation) return;
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm((f) => ({ ...f, location: `${latitude},${longitude}` }));
        setDetecting(false);
      },
      () => setDetecting(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

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
      
      // Redirect to home
      console.log('Redirecting to home...');
      router.push("/");
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
            <select name="role" value={form.role} onChange={handleChange} className="w-full h-11 border rounded-md px-3">
              <option value="farmer">Farmer</option>
              <option value="trader">Trader</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Contact number</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full h-11 border rounded-md px-3" placeholder="10-digit phone" required />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">State/UT</label>
            <select name="state" value={form.state} onChange={handleChange} className="w-full h-11 border rounded-md px-3" required>
              <option value="" disabled>Select state</option>
              {indianStatesAndUTs.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">District</label>
            <input name="district" value={form.district} onChange={handleChange} className="w-full h-11 border rounded-md px-3" required />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Pincode</label>
            <input name="pincode" value={form.pincode} onChange={handleChange} className="w-full h-11 border rounded-md px-3" required />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Detected location</label>
            <div className="flex gap-2">
              <input name="location" value={form.location} onChange={handleChange} className="flex-1 h-11 border rounded-md px-3" placeholder="lat,long or address" />
              <button type="button" onClick={detectLocation} className="px-3 h-11 rounded-md border text-blue-700 border-blue-300 hover:bg-blue-50">
                {detecting ? "Detecting..." : "Detect"}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button 
            type="submit" 
            disabled={submitting}
            className="w-full h-11 rounded-md bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium"
          >
            {submitting ? "Saving..." : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}


