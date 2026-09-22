import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import type { Blog } from "@/types/blog";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function BlogDetail() {
  const params = useParams();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBlog = async () => {
    try {
      const { data } = await axiosInstance.get<Blog>(
        `/data/Blogs/${params.objectId}`,
      );
      setBlog(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  if (isLoading) {
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
        {blog.category} - {blog.author}
      </p>

      <p>{blog.description}</p>

      <p>{blog.content}</p>
    </div>
  );
}

export default BlogDetail;