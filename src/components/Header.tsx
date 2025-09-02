"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/providers";
import { useState, useEffect, useCallback } from "react";
import { getUserLocation } from "@/lib/auth-utils";

export default function Header() {
  const { user, loading } = useAuth();
  const [locationLabel, setLocationLabel] = useState<string>("Set location");

  const fetchUserLocation = useCallback(async () => {
    if (!user) return;

    const location = await getUserLocation(user.id);
    setLocationLabel(location);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserLocation();
    } else {
      // Reset location label when user logs out
      setLocationLabel("Set location");
    }
  }, [user, fetchUserLocation]);

  return (
    <header className="w-full bg-white border-b">
      {/* Mobile */}
      <div className="md:hidden px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/next.svg" alt="Logo" width={90} height={24} />
        </div>
        <div className="flex items-center gap-2">
          <Link href="/sell" className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md">
            Sell
          </Link>
          <div className="text-sm text-blue-700 font-medium truncate max-w-[80px]">
            {locationLabel}
          </div>
        </div>
      </div>
      <div className="md:hidden px-4 pb-3">
        <input placeholder="Search products..." className="w-full h-10 rounded-md border px-3" />
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-4 px-6 py-4">
        <div className="mr-auto flex items-center gap-4">
          <Image src="/next.svg" alt="Logo" width={110} height={28} />
          <div className="text-blue-700 font-medium">{locationLabel}</div>
        </div>
        <div className="flex-1 max-w-xl">
          <input placeholder="Search products..." className="w-full h-10 rounded-md border px-3" />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/sell" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
            Sell
          </Link>
          <div className="ml-auto">
            {!loading && user ? (
              <Link href="/profile" className="text-blue-700 font-medium">Profile</Link>
            ) : (
              <Link href="/login" className="text-blue-700 font-medium">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}


