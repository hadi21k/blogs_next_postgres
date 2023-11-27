import { Suspense } from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "./Navbar";
import getBlogs from "@/lib/getBlogs";
import dynamic from "next/dynamic";

const Blogs = dynamic(() => import("./Blogs"), {
  loading: () => <LoadingSkeleton />,
});

const Main = async () => {
  const session = await getServerSession(authOptions);

  const blogs = await getBlogs(session?.user.userId);

  return (
    <main>
      <Navbar session={session} />
      <Suspense fallback={<LoadingSkeleton />}>
        <Blogs blogs={blogs} session={session} />
      </Suspense>
    </main>
  );
};

export default Main;
