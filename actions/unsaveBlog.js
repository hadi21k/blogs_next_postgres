"use server";

import connectToDB from "@/config/connectToDB";
import { deleteSave } from "@/services/saves";
import { revalidateTag } from "next/cache";

export const unsaveBlogAction = async (blog_id, user_id) => {
  try {
    const client = await connectToDB();

    await deleteSave(client, blog_id, user_id);

    await client.end();
  } catch (error) {
    await client.end();
    return false;
  }
  revalidateTag("blogs");
  return true;
};
