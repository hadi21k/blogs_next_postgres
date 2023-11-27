import connectToDB from "@/config/connectToDB";
import { combineBlogs, getBlogsByUserId } from "@/services/blogs";
import { getLikedBlogs } from "@/services/likes";
import { getSavedBlogs } from "@/services/saves";
import { unstable_cache } from "next/cache";

export const getUserBlogs = unstable_cache(
  async (userId) => {
    try {
      const client = await connectToDB();

      const savedBlogs = await getSavedBlogs(client, userId);

      const likedBlogs = await getLikedBlogs(client, userId);

      const blogs = await getBlogsByUserId(client, userId);

      const blogsWithLinks = combineBlogs(blogs, savedBlogs, likedBlogs);

      await client.end();
      return blogsWithLinks;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
  [],
  { tags: ["user-blogs", "blogs"] }
);
