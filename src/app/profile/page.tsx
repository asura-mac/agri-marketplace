"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/app/providers";
import { useTranslation } from 'react-i18next';
import { getUserProfile, updateUserProfile } from "@/lib/auth-utils";
import { fetchUserListings, updateListingStatus, deleteListing, type Listing } from "@/lib/listings-utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ProfileData {
  role?: string;
  name?: string;
  phone?: string;
  state?: string;
}

type UserProfile = {
  role: string;
  name: string;
  phone: string;
  state: string;
  district: string;
  pincode: string;
  location: string;
};


// Category colors for listing cards
const categoryColors: Record<string, string> = {
  grains: "bg-yellow-100 text-yellow-800",
  pulses: "bg-green-100 text-green-800",
  fruits: "bg-red-100 text-red-800",
  vegetables: "bg-green-100 text-green-800",
  oilseeds: "bg-orange-100 text-orange-800",
  spices: "bg-red-100 text-red-800",
  flowers: "bg-pink-100 text-pink-800",
  tea: "bg-green-100 text-green-800",
  nuts: "bg-amber-100 text-amber-800",
  dairy: "bg-blue-100 text-blue-800",
  fish: "bg-cyan-100 text-cyan-800",
  fertilisers: "bg-purple-100 text-purple-800",
  equipments: "bg-gray-100 text-gray-800",
  seeds: "bg-lime-100 text-lime-800"
};

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [loadingListings, setLoadingListings] = useState(true);
  const { t } = useTranslation();

  const fetchProfile = useCallback(async () => {
    if (!user) return;

    interface ProfileData {
      role?: string;
      name?: string;
      phone?: string;
      state?: string;
      district?: string;
      pincode?: string;
      location?: string;
    }

    const result = await getUserProfile(user.id);
    if (!result) return;

    const profileData: ProfileData = result;
    
    if (profileData) {
      const formattedProfile: UserProfile = {
        role: String(profileData.role || ''),
        name: String(profileData.name || ''),
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

  const fetchUserListingsData = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoadingListings(true);
      const userListings = await fetchUserListings(user.id);
      setListings(userListings);
    } catch (error) {
      console.error('Error fetching user listings:', error);
    } finally {
      setLoadingListings(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchProfile();
      fetchUserListingsData();
    }
  }, [user, loading, router, fetchProfile, fetchUserListingsData]);

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
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusToggle = async (listingId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      const success = await updateListingStatus(listingId, newStatus as 'active' | 'inactive');
      if (success) {
        setListings(prev => prev.map(listing => 
          listing.id === listingId 
            ? { ...listing, status: newStatus as 'active' | 'sold' | 'inactive' }
            : listing
        ));
      } else {
        alert('Failed to update listing status');
      }
    } catch (error) {
      console.error('Error updating listing status:', error);
      alert('Error updating listing status');
    }
  };

  const handleDelete = async (listingId: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      const success = await deleteListing(listingId);
      if (success) {
        setListings(prev => prev.filter(listing => listing.id !== listingId));
      } else {
        alert('Failed to delete listing');
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
      alert('Error deleting listing');
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-blue-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Personal Information */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Personal Information
            </h2>

            {!isEditing ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Role</span>
                  <span className="text-gray-900 font-semibold capitalize">
                    {profile?.role || "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Name</span>
                  <span className="text-gray-900 font-semibold">
                    {profile?.name || "Not specified"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">State</span>
                  <span className="text-gray-900 font-semibold">
                    {profile?.state || "Not specified"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">District</span>
                  <span className="text-gray-900 font-semibold">
                    {profile?.district || "Not specified"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Pincode</span>
                  <span className="text-gray-900 font-semibold">
                    {profile?.pincode || "Not specified"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Phone</span>
                  <span className="text-gray-900 font-semibold">
                    {profile?.phone || "Not specified"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">Location</span>
                  <span className="text-gray-900 font-semibold">
                    {profile?.location || "Not specified"}
                  </span>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={editForm?.role || ""}
                    onChange={(e) =>
                      setEditForm((prev) =>
                        prev ? { ...prev, role: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  >
                    <option value="">Select role</option>
                    <option value="farmer">Farmer</option>
                    <option value="trader">Trader</option>
                    <option value="buyer">Buyer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm?.name || ""}
                    onChange={(e) =>
                      setEditForm((prev) =>
                        prev ? { ...prev, name: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={editForm?.state || ""}
                    onChange={(e) =>
                      setEditForm((prev) =>
                        prev ? { ...prev, state: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter your state"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District
                  </label>
                  <input
                    type="text"
                    value={editForm?.district || ""}
                    onChange={(e) =>
                      setEditForm((prev) =>
                        prev ? { ...prev, district: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter your district"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={editForm?.pincode || ""}
                    onChange={(e) =>
                      setEditForm((prev) =>
                        prev ? { ...prev, pincode: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter your pincode"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editForm?.phone || ""}
                    onChange={(e) =>
                      setEditForm((prev) =>
                        prev ? { ...prev, phone: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editForm?.location || ""}
                    onChange={(e) =>
                      setEditForm((prev) =>
                        prev ? { ...prev, location: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter your location"
                  />
                </div>

                <div className="flex gap-3 pt-6">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Your Listings */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Listings
              </h2>
              <Link
                href="/sell"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Add New
              </Link>
            </div>

            {loadingListings ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-100 rounded-lg h-32"
                  ></div>
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">No listings found</div>
                <Link
                  href="/sell"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Create Your First Listing
                </Link>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {listings.map((listing) => (
                  <div
                    key={listing.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                          {listing.images.length > 0 ? (
                            <Image
                              src={listing.images[0]}
                              alt={listing.product_name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <span className="text-gray-400 text-xs">
                                No image
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Name</span>
                            <span className="font-medium text-right truncate ml-2 text-black font-medium">
                              {listing.product_name}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Price Per Unit
                            </span>
                            <span className="font-medium text-black font-medium">
                              ₹ {listing.price_per_unit}/
                              {listing.unit.toUpperCase()}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">Category Tag</span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                categoryColors[listing.category] ||
                                "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {t(`categories.${listing.category}`, { defaultValue: listing.category }).toUpperCase()}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Minimum Order Qty.
                            </span>
                            <span className="font-medium text-black font-medium">
                              {listing.minimum_order}
                              {listing.unit}
                            </span>
                          </div>

                          <div className="flex justify-between md:col-span-2">
                            <span className="text-gray-600">State</span>
                            <span className="font-medium text-black font-medium">
                              {listing.state || "Not specified"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <button
                        onClick={() =>
                          handleStatusToggle(listing.id, listing.status)
                        }
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          listing.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                      >
                        {listing.status === "active" ? "Active" : "Inactive"}
                      </button>

                      <Link
                        href={`/sell/${listing.category}?edit=${listing.id}`}
                        className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <PencilIcon className="w-3 h-3" />
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <TrashIcon className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="mt-8 text-center">
          <button
            onClick={signOut}
            className="px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}