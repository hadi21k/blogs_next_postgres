"use server";
import connectToDB from "@/config/connectToDB";
import { deleteLike } from "@/services/likes";
import { revalidateTag } from "next/cache";

export const unLikeBlogAction = async (blog_id, user_id) => {
  try {
    const client = await connectToDB();

    await deleteLike(client, blog_id, user_id);

    await client.end();
  } catch (err) {
    console.error(err);
    return false;
  }
  revalidateTag("blogs");
  return true;
};
