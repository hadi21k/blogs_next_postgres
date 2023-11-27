import { Suspense } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BlogContent from "@/components/BlogContent";
import Navbar from "@/components/Navbar";
import { getBlog } from "@/lib/getBlog";
import { getServerSession } from "next-auth";
import { getComments } from "@/lib/getComments";

const page = async ({ params }) => {
  const sessionData = getServerSession(authOptions);
  const blogData = getBlog(params.blog_id);
  const commentsData = getComments(params.blog_id);

  const [session, blog, comments] = await Promise.all([
    sessionData,
    blogData,
    commentsData,
  ]);

  return (
    <main className="bg-neutral-900">
      <Navbar session={session} />
      <Suspense fallback={<LoadingSkeleton />}>
        <BlogContent blog={blog} comments={comments} />
      </Suspense>
    </main>
  );
};

export default page;
