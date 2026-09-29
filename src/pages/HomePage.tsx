import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";

import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@/stores/useAuth";
import type { Blog } from "@/types/blog";
import type { PaginationResponse } from "@/types/pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function HomePage() {
  const [blogs, setBlogs] = useState<PaginationResponse<Blog> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const { user, logout } = useAuth();

  const getBlogs = async () => {
    try {
      const { data } = await axiosInstance.get<PaginationResponse<Blog>>(
        "/posts",
        {
          params: { page: page, take: 3 },
        },
      );
      setBlogs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrev = () => {
    const currentPage = blogs?.meta.page || 1;
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    const currentPage = blogs?.meta.page || 1;
    const total = blogs?.meta.total || 0;
    const take = blogs?.meta.take || 0;
    const totalPage = Math.ceil(total / take);

    if (currentPage < totalPage) {
      setPage(currentPage + 1);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [page]);

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
          {blogs?.data.map((blog) => {
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
      <Pagination>
        <PaginationContent>
          <PaginationItem onClick={handlePrev}>
            <PaginationPrevious />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink>{blogs?.meta.page || 1}</PaginationLink>
          </PaginationItem>

          <PaginationItem onClick={handleNext}>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default HomePage;
