"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Comment from "./Comment";
import { addComments } from "@/actions/addComments";
import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton";

const initialState = {
  message: null,
};

export default function Comments({ comments, blog_id }) {
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(addComments, initialState);
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Comments</h2>
        <p className="text-white font-semibold text-sm">
          Share your thoughts below.
        </p>
      </div>
      <div className="space-y-4">
        <form action={addComments} className="space-y-2">
          <Input
            type="hidden"
            name="blog_id"
            placeholder="Add your comment"
            value={blog_id}
          />
          <Input
            name="content"
            placeholder="Add your comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p aria-live="polite" className="sr-only">
            {state?.message}
          </p>
          <SubmitButton value="Comment!" varinat="outline" />
        </form>
      </div>
      {open ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Comment
              key={comment.comment_id}
              comment={comment}
              short={false}
              open={open}
              setOpen={setOpen}
            />
          ))}
        </div>
      ) : comments.length >= 1 ? (
        <Comment
          comment={comments[0]}
          short={true}
          open={open}
          setOpen={setOpen}
        />
      ) : null}
    </div>
  );
}
