// src/components/BlogPage.tsx

"use client";

import { useTranslation } from "react-i18next";

import { useBlogsChild } from "./Blogs";
import styles from "./BlogPage.module.css"
import Image from "next/image";
import { BLOG_MAP } from "@/lib/blogs"; // <--- IMPORT THE SINGLE SOURCE OF TRUTH

interface BlogContentProps {
  slug: string;
}

export default function BlogContent({ slug }: BlogContentProps) {
    const { t, ready } = useTranslation();
    const { otherBlog } = useBlogsChild();
    
    // Show loading state while translations are being loaded
    if (!ready) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    // 1. Find the blog's static data from the single source of truth
    const blogData = BLOG_MAP.find((b) => b.slug === slug);

    if (!blogData) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>Blog not found for slug: {slug}</p>
                </div>
            </div>
        );
    }

    // 2. Use the blog's key to get its dynamic translated content
    const blog = {
      title: t(`blogs.${blogData.key}.title`),
      intro: t(`blogs.${blogData.key}.intro`),
      content: t(`blogs.${blogData.key}.content`),
      url: blogData.url,
      slug: blogData.slug
    };

    // 3. The rest of your component renders just like before!
    return (
      <div className="min-h-screen bg-gray-100 w-full">
        <article className="mx-auto p-4">
          {blog.url && (
            <div className="relative w-[90vw] aspect-video lg:mb-16 rounded-lg shadow-lg m-auto overflow-hidden ">
              <Image
                src={blog.url}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="lg:w-full w-full lg:h-[1000px] flex flex-row flex-wrap w-full gap-5 justify-center mt-1 mb-7 overflow-hidden">
            <div className="lg:w-[70%] w-[95%] lg:h-[100%] rounded-2xl text-gray-900 border-white overflow-hidden lg:overflow-y-scroll">
              <h1 className="lg:text-5xl text-xl text-gray-900 font-bold mb-6 ml-[40px] mr-[40px] mt-10">
                {blog.title}
              </h1>
              <div className="lg:text-lg w-[100%] text-[0.9rem] text-gray-800 mb-8 bg-yellow-100 rounded-2xl p-5 flex flex-row items-center gap-3">
                <div className="w-5 min-h-[200px] bg-blue-500 rounded border-blue-500"></div>
                {blog.intro}
              </div>
              <div
                className={styles.blogContainer}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
            {otherBlog}
          </div>
        </article>
      </div>
    );
}