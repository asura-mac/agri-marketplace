import BlogContent from "@/components/BlogPage";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { BLOG_MAP } from '@/lib/blogs';
import { enBlogTranslations } from '@/lib/blog.translations';

interface BlogsProps {
  // The params prop is a Promise
  params: Promise<{ blog: string }>;
}

export async function generateMetadata({ params }: BlogsProps): Promise<Metadata> {
  const { blog: slug } = await params;

  // 1. Get static data (key and image URL) from our Single Source of Truth
  const blogData = BLOG_MAP.find(b => b.slug === slug);

  if (!blogData) {
    return notFound();
  }

  const { key: blogKey, url: ogImageUrl } = blogData;

  // 2. Get translated content (DEFAULTING TO ENGLISH for metadata)
  const blogContent = (enBlogTranslations as any)[blogKey];

  if (!blogContent) {
    return notFound();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': blogContent.title,
    'description': blogContent.metaDescription,
    'image': ogImageUrl,
    'author': {
      '@type': 'Organization',
      'name': 'Evool Foundation', // From your layout.tsx
      'url': 'https://www.evoolfoundation.org' // From your layout.tsx
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Kisan Near Me',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.kisannearme.com/KM-LOGO-FULLV2.png' // From your layout.tsx
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://www.kisannearme.com/blogs/${slug}`
    }
    // You can also add 'datePublished' here if you add it to lib/blogs.ts
  };

  // 3. Build and return the Metadata object
  return {
    title: blogContent.title,
    description: blogContent.metaDescription, // From Step 1
    keywords: blogContent.keywords,           // From Step 1

    openGraph: {
      title: blogContent.title,
      description: blogContent.metaDescription,
      images: [
        {
          url: ogImageUrl, // From lib/blogs.ts
          width: 1200,
          height: 630,
          alt: blogContent.title,
        },
      ],
      type: 'article',
    },

    twitter: {
      card: 'summary_large_image',
      title: blogContent.title,
      description: blogContent.metaDescription,
      images: [ogImageUrl],
    },
    
    other: {
      'application/ld+json': JSON.stringify(schema),
    },
  };
}

// Make the component async
export default async function BlogPage({ params }: BlogsProps) {
  // Await the promise to get the resolved params
  const { blog } = await params;
  
  if (!blog) return notFound();
  return <BlogContent slug={blog} />;
}