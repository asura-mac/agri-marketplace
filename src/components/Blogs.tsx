"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { BLOG_MAP } from '@/lib/blogs'



export const useBlogsChild = () => {
  const { t } = useTranslation();

  const blogs = BLOG_MAP.map(blog => ({
    id: blog.key, // Use the unique key as the ID
    title: t(`blogs.${blog.key}.title`),
    intro: t(`blogs.${blog.key}.intro`),
    url: blog.url,
    slug: blog.slug
  }));

  const latestBlogData = blogs[blogs.length - 1];

    const LatestBlog = () => {
      return (
        <div className="flex flex-col lg:gap-3 lg:w-[70%] w-[95%]">
          <p className="text-gray-900 text-3xl font-bold">Latest Blog</p>
          <hr className="w-[250px] h-2 bg-blue-500 rounded mt-1 mb-3" />
          <div className="m-0">
            <div className="relative lg:h-[690px] h-[590px] bg-gradient-to-t from-gray-700/70 via-white/20 to-transparent rounded-2xl text-gray-900 border-white overflow-hidden">
              <Link
                href={`/blogs/${latestBlogData.slug}`}
                className="absolute top-3/4 left-1/2 -translate-x-1/2 p-3 bg-blue-600 text-white rounded-lg font-bold text-xl hover:bg-blue-800 z-20"
              >
                Click To Read
              </Link>

              <div className="relative rounded-2xl m-auto lg:w-[60%] w-[90%] h-80 overflow-hidden">
                <Image
                  src={latestBlogData.url}
                  alt={latestBlogData.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <h2 className="text-center font-bold m-auto mt-5">
                {latestBlogData.title}
              </h2>

              <p className="w-[90%] m-auto mt-5">
                {latestBlogData.intro}
              </p>
            </div>
          </div>
        </div>
      );
    } 

    const OtherBlogs = () => {
      return (
        <div className="flex flex-col lg:gap-3 lg:w-[25%] w-[95%] h-[100%]">
          <p className="text-gray-900 text-3xl font-bold">Other Blogs</p>
          <hr className="w-[250px] h-2 bg-blue-500 rounded mt-1 mb-3"/>
            <div className="h-[100%] overflow-y-scroll rounded-2xl flex lg:flex-col lg:gap-6 gap-6 ">
              {blogs.map((blog) => {
                const href = `/blogs/${blog.slug}`;
                return (
                  <Link key={blog.id} href={href} className="no-underline">
                    <div className="min-h-[100%] lg:w-full w-[250px] bg-white rounded-xl border-white flex lg:flex-row flex-col gap-3 items-center hover:shadow-md transition-shadow hover:cursor-pointer">
                      <div className="relative rounded-xl w-[100%] h-[140px] lg:w-[140px] flex-shrink-0 overflow-hidden">
                        <Image
                          src={blog.url}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-gray-700 mr-2 lg:text-[120%]">
                        {blog.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
      );
    }

    return {
      latestBlog: <LatestBlog />, 
      otherBlog: <OtherBlogs />
    }
}
