"use server";
import connectToDB from "@/config/connectToDB";
import { insertIntoLikes } from "@/services/likes";
import { revalidateTag } from "next/cache";

export const likeBlogAction = async (blog_id, user_id) => {
  try {
    const client = await connectToDB();

    await insertIntoLikes(client, blog_id, user_id);

    await client.end();
  } catch (err) {
    console.error(err);
    return false;
  }
  revalidateTag("blogs");
  return true;
};
