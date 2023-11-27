"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/SubmitButton";
import { useFormState } from "react-dom";
import { TagsCombo } from "./TagsCombo";

const initialState = {
  message: null,
};

const BlogForm = ({ tags, blogAction, mode, blog }) => {
  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");
  const [tag, setTag] = useState(blog?.tag_name || "");
  const [state, formAction] = useFormState(blogAction, initialState);

  return (
    <div className="px-4 py-6 md:px-6 lg:py-16">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem] mb-4">
        {mode === "create" ? "Create a New Blog Post" : "Edit Blog Post"}
      </h1>
      <form action={blogAction} className="space-y-4">
        <div className="grid w-full gap-1.5">
          <Input type="hidden" name="blog_id" value={blog?.blog_id} />
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter the blog post title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <Input
          type="hidden"
          name="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <TagsCombo tags={tags} value={tag} setValue={setTag} />
        <div className="grid w-full gap-1.5">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            placeholder="Type your blog content here."
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <p aria-live="polite" className="sr-only">
          {state?.message}
        </p>
        <SubmitButton value="Publish" />
      </form>
    </div>
  );
};

export default BlogForm;

// "use client";
// import { useState } from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { SubmitButton } from "@/components/SubmitButton";
// import { useFormState } from "react-dom";
// import { useRouter } from "next/navigation";

// const initialState = {
//   message: null,
// };

// const BlogForm = ({ blogAction, mode, blog }) => {
//   const [title, setTitle] = useState(blog?.title || "");
//   const [content, setContent] = useState(blog?.content || "");
//   const [state, formAction] = useFormState(blogAction, initialState);
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       title,
//       content,
//       blog_id: blog?.blog_id,
//     };
//     const path = mode === "create" ? "/" : `/my-blogs`;
//     await blogAction(data);
//     router.refresh();
//     router.push(path);
//   };

//   return (
//     <div className="px-4 py-6 md:px-6 lg:py-16">
//       <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem] mb-4">
//         {mode === "create" ? "Create a New Blog Post" : "Edit Blog Post"}
//       </h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid w-full gap-1.5">
//           <Label htmlFor="title">Title</Label>
//           <Input
//             id="title"
//             name="title"
//             placeholder="Enter the blog post title"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div className="grid w-full gap-1.5">
//           <Label htmlFor="content">Content</Label>
//           <Textarea
//             id="content"
//             name="content"
//             placeholder="Type your blog content here."
//             rows="10"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//           />
//         </div>
//         <p aria-live="polite" className="sr-only">
//           {state?.message}
//         </p>
//         <SubmitButton value="Publish" />
//       </form>
//     </div>
//   );
// };

// export default BlogForm;
