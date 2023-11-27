import { Suspense } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getUserBlogs } from "@/lib/getUserBlogs";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const Blogs = dynamic(() => import("@/components/Blogs"), {
  loading: () => <LoadingSkeleton />,
  ssr: false,
});

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const blogs = await getUserBlogs(session.user.userId);

  return (
    <main>
      <Navbar session={session} />
      <Suspense fallback={<LoadingSkeleton />}>
        <Blogs blogs={blogs} session={session} />
      </Suspense>
    </main>
  );
};

export default page;
