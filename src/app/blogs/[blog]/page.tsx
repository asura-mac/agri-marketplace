import BlogContent from "@/components/BlogPage";
import { notFound } from "next/navigation";

interface BlogsProps {
  // The params prop is a Promise
  params: Promise<{ blog: string }>;
}

// Make the component async
export default async function BlogPage({ params }: BlogsProps) {
  // Await the promise to get the resolved params
  const { blog } = await params;
  
  if (!blog) return notFound();
  return <BlogContent slug={blog} />;
}