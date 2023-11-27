"use server";

import connectToDB from "@/config/connectToDB";
import { insertIntoSave } from "@/services/saves";
import { revalidateTag } from "next/cache";

export const saveBlogAction = async (blog_id, user_id) => {
  try {
    const client = await connectToDB();

    await insertIntoSave(client, blog_id, user_id);

    await client.end();
  } catch (error) {
    await client.end();
    return false;
  }
  revalidateTag("blogs");
  return true;
};
