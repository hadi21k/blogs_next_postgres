import connectToDB from "@/config/connectToDB";
import { combineBlogs, getAllBlogs } from "@/services/blogs";
import { getSavedBlogs } from "@/services/saves";
import { getLikedBlogs } from "@/services/likes";
import { unstable_cache } from "next/cache";

const getBlogs = unstable_cache(
  async (userId) => {
    try {
      const client = await connectToDB();

      const savedBlogs = await getSavedBlogs(client, userId);

      const likedBlogs = await getLikedBlogs(client, userId);

      const blogs = await getAllBlogs(client);

      const blogsWithLikes = combineBlogs(blogs, savedBlogs, likedBlogs);

      await client.end();
      return blogsWithLikes;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  [],
  { tags: ["blogs"] }
);

export default getBlogs;
