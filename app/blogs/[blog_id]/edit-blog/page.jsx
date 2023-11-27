import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import BlogForm from "@/components/BlogForm";
import { updateBlog } from "@/actions/updateBlog";
import { getBlog } from "@/lib/getBlog";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import getTags from "@/lib/getTags";

export default async function EditBlog({ params }) {
  const sessionData = getServerSession(authOptions);
  const blogData = getBlog(params.blog_id);
  const tagsData = getTags();

  const session = await sessionData;
  if (!session) {
    redirect("/");
  }
  const blog = await blogData;
  const tags = await tagsData;

  return (
    <>
      <Navbar session={session} />
      <Suspense fallback={<LoadingSkeleton />}>
        <BlogForm blogAction={updateBlog} mode="edit" blog={blog} tags={tags} />
      </Suspense>
    </>
  );
}
