"use server";
import connectToDB from "@/config/connectToDB";
import { revalidateTag } from "next/cache";

export const deleteCommentAction = async (id) => {
  try {
    const client = await connectToDB();
    await client.query(
      `
        DELETE FROM comments c
            WHERE c.comment_id = $1
    `,
      [id]
    );
  } catch (err) {
    return err.message;
  }
  revalidateTag("comments")
};
