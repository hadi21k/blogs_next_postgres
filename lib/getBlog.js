import connectToDB from "@/config/connectToDB";
import { getBlogById } from "@/services/blogs";
import { unstable_cache } from "next/cache";

export const getBlog = unstable_cache(
  async (blog_id) => {
    try {
      const client = await connectToDB();

      const { rows } = await getBlogById(client, blog_id);

      await client.end();

      return rows[0];
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  [],
  { tags: ["blog"] }
);
