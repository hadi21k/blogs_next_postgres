import { Button } from "@/components/ui/button";
import Blog from "./Blog";
import Link from "next/link";

const Blogs = ({ blogs, session }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-neutral-900">
      <div className="container mx-auto">
        {session && (
          <div className="flex justify-end items-center mb-4">
            <Link href="/create-blog">
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                variant="outline"
              >
                Create Blog
              </Button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Blog key={blog.blog_id} blog={blog} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
