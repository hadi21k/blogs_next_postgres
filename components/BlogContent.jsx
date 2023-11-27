"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Comments from "./Comments";

const BlogContent = ({ blog, comments }) => {
  return (
    <div className="py-6 min-h-[calc(100vh-80px)] lg:py-16">
      <div className="container mx-auto">
        <article className="prose prose-zinc mx-auto space-y-4 dark:prose-invert text-white">
          <div className="space-y-2 not-prose">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
              {blog.title}
            </h1>
            <p className="bg-[#0082F6] p-1.5 font-medium w-fit text-xs rounded-xl">
              Category: {blog.tag_name}
            </p>
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage alt="User avatar" src={blog.profile_picture} />
                <AvatarFallback>{blog.profile_picture}</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 text-xs">
                <div className="font-medium">{blog.name}</div>
                <div className="text-zinc-500 dark:text-zinc-400">
                  {blog.email}
                </div>
              </div>
            </div>
          </div>
          <p>{blog.content}</p>
          <Comments
            comments={comments}
            blog_id={blog.blog_id}
            user_id={blog.user_id}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogContent;
