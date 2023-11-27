"use client";
import { deleteCommentAction } from "@/actions/deleteCommentAction";
import { TrashIcon } from "@radix-ui/react-icons";

const Comment = ({ comment, short, open, setOpen }) => {
  const deleteComment = async (id) => {
    await deleteCommentAction(id);
  };
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="font-semibold">{comment.name}</div>
          <div className="text-zinc-500 text-xs dark:text-zinc-400">
            {new Date(comment.date).toUTCString()}
          </div>
        </div>
        <TrashIcon
          onClick={() => deleteComment(comment.comment_id)}
          className="w-6 h-6 cursor-pointer text-red-500"
        />
      </div>
      <div>{comment.content}</div>
      {short && (
        <p
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-sm border-t py-2 font-semibold"
        >
          Show all comments
        </p>
      )}
    </div>
  );
};

export default Comment;
