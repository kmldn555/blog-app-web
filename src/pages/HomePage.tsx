import { parseAsInteger, parseAsStringLiteral, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";

import Footer from "@/components/Footer";
import BlogList from "@/components/HomePage/BlogList";
import HeroSections from "@/components/HomePage/HeroSections";
import Navbar from "@/components/Navbar";
import useGetPosts from "@/hooks/api/post/useGetPosts";

function HomePage() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [sortOrder, setSortOrder] = useQueryState(
    "sortOrder",
    parseAsStringLiteral(["asc", "desc"] as const).withDefault("desc"),
  );
  const [debouncedSearch] = useDebounceValue(search, 700);

  const { data: blogs, isPending, isError, refetch } = useGetPosts({
    page,
    take: 9,
    search: debouncedSearch,
    sortBy: "createdAt",
    sortOrder,
  });

  const posts = blogs?.data ?? [];
  const total = blogs?.meta.total ?? 0;
  const totalPage = blogs?.meta
    ? Math.ceil(blogs.meta.total / blogs.meta.take)
    : 0;

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const handleSortChange = (value: "asc" | "desc") => {
    setPage(1);
    setSortOrder(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroSections
        search={search}
        onSearchChange={handleSearchChange}
        total={total}
        isPending={isPending}
      />

      <BlogList
        posts={posts}
        total={total}
        totalPage={totalPage}
        page={page}
        search={search}
        sortOrder={sortOrder}
        isPending={isPending}
        isError={isError}
        onSearchClear={() => handleSearchChange("")}
        onSortChange={handleSortChange}
        onPageChange={setPage}
        onRetry={() => refetch()}
      />

      <Footer />
    </div>
  );
}

export default HomePage;
