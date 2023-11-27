"use server";
import connectToDB from "@/config/connectToDB";
import { deleteBlogById } from "@/services/blogs";
import { revalidateTag } from "next/cache";

export const deleteBlog = async (blog_id) => {
  try {
    const client = await connectToDB();

    await deleteBlogById(client, blog_id);
  } catch (err) {
    console.log(err);
  }
  revalidateTag("user-blogs")
  revalidateTag("blogs")
};
