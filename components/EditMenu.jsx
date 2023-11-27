import { deleteBlog } from "@/actions/deleteBlog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { timeSinceLastUpdate } from "@/services/time";

const EditMenu = ({ blog, pathname }) => {
  console.log(blog)
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsVerticalIcon className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/blogs/${blog.blog_id}/edit-blog`}>
          <DropdownMenuItem className="flex space-x-6">
            <h1>Edit Blog</h1>
            {pathname === "/my-blogs" && (
              <p className="text-xs font-bold">
                Last Updated {timeSinceLastUpdate(blog)}
              </p>
            )}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={async () => {
            await deleteBlog(blog.blog_id);
            router.refresh();
          }}
        >
          Delete Blog
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditMenu;
