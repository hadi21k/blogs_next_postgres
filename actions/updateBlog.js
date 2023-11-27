"use server";
import connectToDB from "@/config/connectToDB";
import { updateBlogById } from "@/services/blogs";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const updateBlog = async (formData) => {
  const title = formData.get("title");
  const content = formData.get("content");
  const blog_id = formData.get("blog_id");
  const tag = capitalizeFirstLetter(formData.get("tag")).toString();

  try {
    const client = await connectToDB();

    if (!title || !content) {
      return;
    }

    await updateBlogById(client, blog_id, title,tag, content);

    await client.end();
  } catch (error) {
    console.log(error.message);
    return { message: error.message };
  }

  revalidateTag("blogs");
  revalidateTag("blog");
  redirect("/my-blogs");
};
