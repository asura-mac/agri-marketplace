"use client";

import {useBlogsChild} from "@/components/Blogs";
import Script from "next/script"; // <--- 1. Import Script
import { useTranslation } from "react-i18next"; // <--- 2. Import i18n hooks
import { BLOG_MAP } from "@/lib/blogs"; // <--- 3. Import your blog list

export default function BlogsPage() {
  const { latestBlog, otherBlog } = useBlogsChild();
  const { t } = useTranslation(); // <--- 4. Initialize hook

  // 5. Build the list of blog posts for the schema
  const blogPostSchema = BLOG_MAP.map(blog => {
    const blogKey = blog.key;
    return {
      '@type': 'BlogPosting',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `https://www.kisannearme.com/blogs/${blog.slug}`
      },
      'headline': t(`blogs.${blogKey}.title`), // Get translated title
      'image': blog.url,
      'description': t(`blogs.${blogKey}.intro`), // Use intro as description
      'author': {
        '@type': 'Organization',
        'name': 'Evool Foundation'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Kisan Near Me',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://www.kisannearme.com/KM-LOGO-FULLV2.png'
        }
      }
      // You could add 'datePublished' here too
    };
  });

  // 6. Define the main 'Blog' schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Kisan Near Me Blog',
    'description': 'Articles, guides, and updates on Indian agriculture, digital mandis, and farming technology.',
    'blogPost': blogPostSchema // Add the array of posts
  };

  return (
    <>
      {/* --- 7. ADD THE SCRIPT COMPONENT --- */}
      <Script
        id="blog-list-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      
      {/* This is your existing page content */}
      <div className="min-h-screen bg-gray-100 py-7">
        <div className="lg:w-full w-full lg:h-[790px] flex flex-row flex-wrap w-full gap-5 justify-center">
          {latestBlog}
          {otherBlog}
        </div>
      </div>
    </>
  );
}