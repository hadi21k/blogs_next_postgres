import connectToDB from "@/config/connectToDB";
import { getAllComments } from "@/services/comments";
import { unstable_cache as cache } from "next/cache";

export const getComments = cache(
  async (blog_id) => {
    try {
      const client = await connectToDB();

      const { rows } = await getAllComments(client, blog_id);

      await client.end();

      return rows;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },
  [],
  { tags: ["comments"] }
);
