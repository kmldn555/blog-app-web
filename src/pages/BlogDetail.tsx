import { Button } from "@/components/ui/button";
import useGetPostsBySlug from "@/hooks/api/post/useGetPostBySlug";
import { Link, useParams } from "react-router";

function BlogDetail() {
  const params = useParams();

  const {data: blog, isPending} = useGetPostsBySlug(params.slug)

  if (isPending) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <p>Blog Not Found</p>

        <Link to="/">
          <Button>Go to Homepage</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <img
        src={blog.thumbnail || ""}
        alt="thumbnail blog"
        className="h-100 w-full object-cover"
      />
      <h1 className="text-3xl font-bold">Blog Detail - {blog.title}</h1>

      <p>
        {blog.category} - {blog.user.nama}
      </p>

      <p>{blog.description}</p>

      <p>{blog.content}</p>
    </div>
  );
}

export default BlogDetail;
