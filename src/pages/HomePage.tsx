import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";

import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@/stores/useAuth";
import type { Blog } from "@/types/blog";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user, logout } = useAuth();

  const getBlogs = async () => {
    try {
      const { data } = await axiosInstance.get<Blog[]>("/data/Blogs");
      setBlogs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center h-24">
        {user ? (
          <div className="flex items-center gap-4">
            <h1>Welcome, {user.name}</h1>
            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
            <Link to="/write">
              <Button>Create Blog</Button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/login2">
              <Button>Login Here</Button>
            </Link>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-100">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-16">
          {blogs.map((blog) => {
            return (
              <Link key={blog.objectId} to={`/blogs/${blog.objectId}`}>
                <div className="border border-black p-8">
                  <p className="text-lg font-bold">{blog.title}</p>
                  <p>{blog.description}</p>
                  <p>{blog.author}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HomePage;
