import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', 
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.kisannearme.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.evoolfoundation.org',
        port: '',
        pathname: '/**',
      },
    ],
    // Fallback domains for older Next.js versions or edge cases
    domains: [
      'sjsnwoxodggzqamckfzo.supabase.co', // Your specific Supabase project hostname
    ],
    // Optional: Add image optimization settings
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
