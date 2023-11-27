"use client";
import { likeBlogAction } from "@/actions/likeBlog";
import { saveBlogAction } from "@/actions/saveBlog";
import { unLikeBlogAction } from "@/actions/unLikeBlog";
import { unsaveBlogAction } from "@/actions/unsaveBlog";
import { Button } from "@/components/ui/button";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import EditMenu from "./EditMenu";

export default function Blog({ blog, session }) {
  const router = useRouter();
  const pathname = usePathname();

  const saveBlog = async () => {
    await saveBlogAction(blog.blog_id, session.user.userId);
    router.refresh();
  };

  const unSaveBlog = async () => {
    await unsaveBlogAction(blog.blog_id, session.user.userId);
    router.refresh();
  };

  const likeBlog = async () => {
    await likeBlogAction(blog.blog_id, session.user.userId);
    router.refresh();
  };

  const unLikeBlog = async () => {
    await unLikeBlogAction(blog.blog_id, session.user.userId);
    router.refresh();
  };

  return (
    <div className="bg-white space-y-2 dark:bg-gray-700 shadow-lg rounded-lg px-5 py-6 text-black dark:text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={blog.profile_picture}
            alt={blog.name}
            className="w-5 h-5 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{blog?.name}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-xs">
            <p>
              {new Date(blog.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          {pathname === "/my-blogs" && (
            <EditMenu blog={blog} pathname={pathname} />
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          <Link href={`/blogs/${blog.blog_id}`}>{blog.title}</Link>
        </h2>
        <p className="text-sm">{blog.read_time} min</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {blog.isLikedByCurrentUser ? (
            <HeartFilledIcon
              className="text-red-500 cursor-pointer hover:text-red-700 w-6 h-6"
              onClick={unLikeBlog}
            />
          ) : (
            <HeartIcon
              onClick={likeBlog}
              className="text-neutral-500 cursor-pointer hover:text-red-700 w-6 h-6"
            />
          )}
          <span className="text-sm font-medium">{blog.likes} Likes</span>
        </div>
        {blog.isSavedByCurrentUser ? (
          <Button
            className="text-blue-500 cursor-pointer hover:text-blue-700"
            variant="ghost"
            onClick={unSaveBlog}
          >
            <BookmarkFilledIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button
            className="text-blue-500 cursor-pointer hover:text-blue-700"
            variant="ghost"
            onClick={saveBlog}
          >
            <BookmarkIcon className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}
