import {
  CalendarDays,
  CircleAlert,
  FileSearch,
  FileText,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import GlobalPagination from "@/components/GlobalPagination";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/stores/useAuth";
import type { Post } from "@/types/post";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? "" : dateFormatter.format(date);
}

function PostCard({ post }: { post: Post }) {
  const [imageFailed, setImageFailed] = useState(false);

  const showImage = Boolean(post.thumbnail) && !imageFailed;
  const authorName = post.user?.nama?.trim() || "Anonymous";
  const authorInitial = authorName.charAt(0).toUpperCase();

  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card
        className="h-full overflow-hidden transition-all duration-300 [--card-spacing:--spacing(5)] group-hover:-translate-y-1 group-hover:shadow-xl group-hover:ring-foreground/20"
        style={{ paddingBlock: 0, gap: 0 }}
      >
        <div className="relative aspect-video overflow-hidden bg-muted">
          {showImage ? (
            <img
              src={post.thumbnail}
              alt={post.title}
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-linear-to-br from-muted via-secondary to-muted">
              <FileText className="size-10 text-muted-foreground/40" />
            </div>
          )}

          {post.category && (
            <Badge
              variant="secondary"
              className="absolute left-3 top-3 bg-background/85 text-foreground shadow-sm backdrop-blur"
            >
              {post.category}
            </Badge>
          )}
        </div>

        <CardContent className="flex flex-1 flex-col gap-3 py-5">
          <CardTitle className="line-clamp-2 text-base font-semibold leading-snug tracking-tight">
            {post.title}
          </CardTitle>

          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {post.description}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 border-t pt-3 text-xs text-muted-foreground">
            <div className="flex min-w-0 items-center gap-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[0.625rem] font-semibold text-secondary-foreground">
                {authorInitial}
              </span>
              <span className="truncate font-medium text-foreground">
                {authorName}
              </span>
            </div>

            <span className="flex shrink-0 items-center gap-1">
              <CalendarDays className="size-3.5" />
              {formatDate(post.createdAt)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function PostCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="aspect-video animate-pulse bg-muted" />

      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-full animate-pulse rounded bg-muted" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />

        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-2">
            <div className="size-6 animate-pulse rounded-full bg-muted" />
            <div className="h-3 w-20 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-3 w-16 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

interface BlogListProps {
  posts: Post[];
  total: number;
  totalPage: number;
  page: number;
  search: string;
  sortOrder: "asc" | "desc";
  isPending: boolean;
  isError: boolean;
  onSearchClear: () => void;
  onSortChange: (value: "asc" | "desc") => void;
  onPageChange: (page: number) => void;
  onRetry: () => void;
}

function BlogList({
  posts,
  total,
  totalPage,
  page,
  search,
  sortOrder,
  isPending,
  isError,
  onSearchClear,
  onSortChange,
  onPageChange,
  onRetry,
}: BlogListProps) {
  const { user } = useAuth();

  return (
    <main
      id="posts"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            The latest
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Latest posts
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {search ? (
              <>
                Results for{" "}
                <span className="font-medium text-foreground">
                  &ldquo;{search}&rdquo;
                </span>
              </>
            ) : (
              "Fresh ideas from the community."
            )}
            {!isPending && total > 0 && (
              <span>
                {" "}
                &middot; {total} {total === 1 ? "story" : "stories"}
              </span>
            )}
          </p>
        </div>

        <div
          role="group"
          aria-label="Sort posts"
          className="inline-flex w-fit items-center rounded-lg border bg-card p-0.5"
        >
          <button
            type="button"
            aria-pressed={sortOrder === "desc"}
            onClick={() => onSortChange("desc")}
            className={cn(
              "h-7 rounded-md px-3 text-xs font-medium transition-colors",
              sortOrder === "desc"
                ? "bg-secondary text-secondary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Newest
          </button>

          <button
            type="button"
            aria-pressed={sortOrder === "asc"}
            onClick={() => onSortChange("asc")}
            className={cn(
              "h-7 rounded-md px-3 text-xs font-medium transition-colors",
              sortOrder === "asc"
                ? "bg-secondary text-secondary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Oldest
          </button>
        </div>
      </div>

      {isPending ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-20 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <CircleAlert className="size-6" />
          </span>
          <h3 className="mt-4 text-base font-semibold">
            We couldn&rsquo;t load the stories
          </h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Something went wrong while fetching posts. Please try again.
          </p>
          <Button
            variant="outline"
            className="mt-5 h-9 gap-1.5 px-4 text-sm"
            onClick={onRetry}
          >
            <RefreshCw className="size-3.5" />
            Try again
          </Button>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-20 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <FileSearch className="size-6" />
          </span>
          <h3 className="mt-4 text-base font-semibold">No stories found</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {search ? (
              <>
                Nothing matches &ldquo;{search}&rdquo;. Try a different search.
              </>
            ) : (
              "No stories have been published yet. Be the first to share one."
            )}
          </p>

          {search ? (
            <Button
              variant="outline"
              className="mt-5 h-9 px-4 text-sm"
              onClick={onSearchClear}
            >
              Clear search
            </Button>
          ) : (
            <Link
              to={user ? "/write" : "/login2"}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "mt-5 h-9 px-4 text-sm",
              )}
            >
              {user ? "Write the first story" : "Sign in to write"}
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {!isPending && !isError && totalPage > 1 && (
        <div className="mt-12 flex justify-center">
          <GlobalPagination
            currentPage={page}
            totalPage={totalPage}
            onChangePage={(nextPage) => {
              onPageChange(nextPage);
              document
                .getElementById("posts")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
      )}
    </main>
  );
}

export default BlogList;
