"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/app/providers";
import { getUserProfile, updateUserProfile } from "@/lib/auth-utils";
import { useRouter } from "next/navigation";

type UserProfile = {
  role: string;
  phone: string;
  state: string;
  district: string;
  pincode: string;
  location: string;
};

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (!user) return;

    const profileData = await getUserProfile(user.id);
    
    if (profileData) {
      const formattedProfile: UserProfile = {
        role: String(profileData.role || ''),
        phone: String(profileData.phone || ''),
        state: String(profileData.state || ''),
        district: String(profileData.district || ''),
        pincode: String(profileData.pincode || ''),
        location: String(profileData.location || ''),
      };
      setProfile(formattedProfile);
      setEditForm(formattedProfile);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchProfile();
    }
  }, [user, loading, router, fetchProfile]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm(profile);
  };

  const handleSave = async () => {
    if (!user || !editForm) return;

    setSaving(true);
    try {
      const success = await updateUserProfile(user.id, editForm);

      if (!success) {
        alert('Error updating profile. Please try again.');
        return;
      }

      setProfile(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-blue-700">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-blue-700">Profile</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>

        {profile ? (
          <div className="bg-white rounded-lg border border-blue-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-blue-900">Personal Information</h2>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Role</label>
                  <select
                    value={editForm?.role || ''}
                    onChange={(e) => setEditForm(prev => prev ? { ...prev, role: e.target.value } : null)}
                    className="w-full h-11 border rounded-md px-3"
                  >
                    <option value="farmer">Farmer</option>
                    <option value="trader">Trader</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={editForm?.phone || ''}
                    onChange={(e) => setEditForm(prev => prev ? { ...prev, phone: e.target.value } : null)}
                    className="w-full h-11 border rounded-md px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">State</label>
                  <input
                    value={editForm?.state || ''}
                    onChange={(e) => setEditForm(prev => prev ? { ...prev, state: e.target.value } : null)}
                    className="w-full h-11 border rounded-md px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">District</label>
                  <input
                    value={editForm?.district || ''}
                    onChange={(e) => setEditForm(prev => prev ? { ...prev, district: e.target.value } : null)}
                    className="w-full h-11 border rounded-md px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Pincode</label>
                  <input
                    value={editForm?.pincode || ''}
                    onChange={(e) => setEditForm(prev => prev ? { ...prev, pincode: e.target.value } : null)}
                    className="w-full h-11 border rounded-md px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Location</label>
                  <input
                    value={editForm?.location || ''}
                    onChange={(e) => setEditForm(prev => prev ? { ...prev, location: e.target.value } : null)}
                    className="w-full h-11 border rounded-md px-3"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Role</label>
                    <p className="text-blue-900 font-medium">{profile.role}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Phone</label>
                    <p className="text-blue-900">{profile.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">State</label>
                    <p className="text-blue-900">{profile.state}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">District</label>
                    <p className="text-blue-900">{profile.district}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Pincode</label>
                    <p className="text-blue-900">{profile.pincode}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Location</label>
                    <p className="text-blue-900">{profile.location}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No profile information found. Please complete onboarding first.
          </div>
        )}
      </div>
    </div>
  );
}


