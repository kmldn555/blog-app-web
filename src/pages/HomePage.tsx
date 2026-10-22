import GlobalPagination from "@/components/GlobalPagination";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetPosts from "@/hooks/api/post/useGetPosts";
import { useAuth } from "@/stores/useAuth";
import { parseAsInteger, useQueryState } from "nuqs";
import { Link } from "react-router";
import { useDebounceValue } from "usehooks-ts";

function HomePage() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debouncedSearch] = useDebounceValue(search, 700);

  const { user, logout } = useAuth();

  const { data: blogs, isPending } = useGetPosts({
    page,
    search: debouncedSearch,
  });

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

      <div className="max-w-2xl flex mx-auto my-8">
        <Input
          placeholder="search.."
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          value={search}
        />
      </div>

      {isPending ? (
        <div className="flex justify-center items-center h-100">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-16">
          {blogs?.data.map((blog) => {
            return (
              <Link key={blog.slug} to={`/blogs/${blog.slug}`}>
                <div className="border border-black p-8">
                  <p className="text-lg font-bold">{blog.title}</p>
                  <p>{blog.description}</p>
                  <p>{blog.user.nama}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {!!blogs?.meta && (
        <GlobalPagination
          currentPage={blogs.meta.page}
          totalPage={Math.ceil(blogs.meta.total / blogs.meta.take)}
          onChangePage={(p) => setPage(p)}
        />
      )}
    </div>
  );
}

export default HomePage;
