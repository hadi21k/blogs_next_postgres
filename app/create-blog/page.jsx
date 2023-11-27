import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import BlogForm from "@/components/BlogForm";
import { publishBlog } from "@/actions/publishBlog";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import getTags from "@/lib/getTags";

export default async function CreateBlog() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const tags = await getTags();
  return (
    <>
      <Navbar session={session} />
      <Suspense fallback={<LoadingSkeleton />}>
        <BlogForm tags={tags} blogAction={publishBlog} mode="create" />
      </Suspense>
    </>
  );
}
