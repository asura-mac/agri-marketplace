# Image Configuration Guide

## Next.js Image Component with Supabase Storage

This document explains how to configure Next.js to work with Supabase Storage images.

## The Problem

When using Next.js `Image` component with external images (like Supabase Storage), you'll encounter this error:

```
Error: Invalid src prop on next/image, hostname not configured
Hostname: [your-project].supabase.co
```

## The Solution

### 1. Configure next.config.ts

The `next.config.ts` file has been configured to allow Supabase Storage images:

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    domains: [
      'sjsnwoxodggzqamckfzo.supabase.co', // Your specific project
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
};
```

### 2. Configuration Explanation

- **remotePatterns**: Modern approach that works with any Supabase subdomain
- **domains**: Fallback for older Next.js versions or specific hostnames
- **formats**: Enables modern image formats for better performance
- **minimumCacheTTL**: Caches images for 60 seconds

### 3. Dynamic Hostname Detection

The `getSupabaseStorageHostname()` function in `src/lib/supabase.ts` can help detect your project's hostname dynamically.

## Important Notes

### After Configuration Changes

1. **Restart Development Server**: Next.js requires a restart after changing `next.config.ts`
2. **Clear Cache**: Sometimes you may need to clear the `.next` cache
3. **Verify Build**: Run `npm run build` to ensure configuration is valid

### Multiple Environments

If you have different Supabase projects for development/production:

```typescript
// You can add multiple domains
domains: [
  'dev-project.supabase.co',
  'prod-project.supabase.co',
]
```

### Security Considerations

- The current configuration allows all `*.supabase.co` domains
- This is safe because it only allows the `/storage/v1/object/public/**` path
- Private storage buckets are not affected

## Troubleshooting

### Still Getting Hostname Errors?

1. **Check Your Supabase URL**: 
   ```bash
   echo $NEXT_PUBLIC_SUPABASE_URL
   ```

2. **Verify Configuration**:
   - Ensure `next.config.ts` is in the project root
   - Restart the development server
   - Check console for configuration errors

3. **Test Image URLs**:
   ```javascript
   // Valid Supabase Storage URL format:
   https://[project].supabase.co/storage/v1/object/public/[bucket]/[file]
   ```

### Alternative: Using Regular img Tags

If you encounter persistent issues, you can use regular `<img>` tags instead of Next.js `Image`:

```tsx
// Instead of:
<Image src={imageUrl} alt="Product" width={200} height={200} />

// Use:
<img src={imageUrl} alt="Product" className="w-full h-full object-cover" />
```

However, this loses the benefits of Next.js image optimization.

## Testing

To test if the configuration works:

1. Upload an image through the ImageUpload component
2. Check that it displays without errors
3. Inspect the network tab to see optimized image requests

## Additional Resources

- [Next.js Image Configuration Docs](https://nextjs.org/docs/api-reference/next/image#domains)
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
