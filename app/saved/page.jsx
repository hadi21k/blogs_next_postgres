import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar";
import { getSavedBlogs } from "@/lib/getSavedBlogs";
import { redirect } from "next/navigation";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import dynamic from "next/dynamic";

const Blogs = dynamic(() => import("@/components/Blogs"), {
  loading: () => <LoadingSkeleton />,
  ssr: false,
});

const Saved = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const blogs = await getSavedBlogs(session.user.userId);
  return (
    <main>
      <Navbar session={session} />
      <Suspense fallback={<LoadingSkeleton />}>
        <Blogs blogs={blogs} session={session} />
      </Suspense>
    </main>
  );
};

export default Saved;
