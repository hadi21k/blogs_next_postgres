"use server";

import connectToDB from "@/config/connectToDB";
import { v4 as uuidv4 } from "uuid";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const addComments = async (formData) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const content = formData.get("content");
  const blog_id = formData.get("blog_id");
  try {
    const client = await connectToDB();
    if (!content)
      throw new Error("Please fill the required field")

    const comment_id = uuidv4();

    await client.query(
      `
        INSERT INTO comments (comment_id, blog_id, user_id, content)
        VALUES ($1, $2, $3, $4)
    `,
      [comment_id, blog_id, session.user.userId, content]
    );

    await client.end();
  } catch (err) {
    return err.message;
  }
  revalidateTag("comments");
};
