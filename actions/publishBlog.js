"use server";
import { v4 as uuidv4 } from "uuid";
import readingTime from "reading-time";
import connectToDB from "@/config/connectToDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { insertIntoBlogs } from "@/services/blogs";
import { revalidateTag } from "next/cache";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const publishBlog = async (formData) => {
  const session = await getServerSession(authOptions);
  const title = formData.get("title");
  const content = formData.get("content");
  const tag = capitalizeFirstLetter(formData.get("tag")).toString();

  try {
    if (!title || !content) {
      return;
    }
    const client = await connectToDB();

    const blogId = uuidv4();
    const { minutes } = readingTime(content);

    await insertIntoBlogs(
      client,
      blogId,
      session.user.userId,
      title,
      content,
      tag,
      Math.ceil(minutes)
    );

    await client.end();
  } catch (error) {
    console.log(error);
    return { message: "Error publishing blog." };
  }
  revalidateTag("blogs");
  redirect("/");
};
