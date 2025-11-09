"use client";

import {useBlogsChild} from "@/components/Blogs";

export default function BlogsPage() {
  const {latestBlog, otherBlog} = useBlogsChild();
  return (
    <div className="min-h-screen bg-gray-100 py-7">
        <div className="lg:w-full w-full lg:h-[790px] flex flex-row flex-wrap w-full gap-5 justify-center">
            {latestBlog}
            {otherBlog}
        </div>
    </div>
  )
}