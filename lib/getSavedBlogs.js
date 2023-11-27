import connectToDB from "@/config/connectToDB";
import { getLikedBlogs } from "@/services/likes";
import { getAllSavedBlogsByUserId } from "@/services/saves";
import { unstable_cache } from "next/cache";

export const getSavedBlogs = unstable_cache(
  async (userId) => {
    try {
      const client = await connectToDB();

      const likedBlogs = await getLikedBlogs(client, userId);

      const allSavedBlogs = await getAllSavedBlogsByUserId(client, userId);

      const likedBlogIds = likedBlogs.rows.map((row) => row.blog_id);

      const saved = allSavedBlogs.rows.map((blog) => {
        const isLikedByCurrentUser = likedBlogIds.includes(blog.blog_id);
        const isSavedByCurrentUser = true;
        return {
          ...blog,
          isLikedByCurrentUser,
          isSavedByCurrentUser,
        };
      });

      await client.end();

      return saved;
    } catch (err) {
      console.log(err);
    }
  },
  [],
  { tags: ["saved", "blogs"] }
);
