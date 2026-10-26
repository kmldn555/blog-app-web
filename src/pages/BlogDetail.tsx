import type { ReactNode } from "react";
import { Link, useParams } from "react-router";

import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Markdown from "@/components/Markdown";
import Navbar from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/button";
import useGetPostsBySlug from "@/hooks/api/post/useGetPostBySlug";
import { cn } from "@/lib/utils";

function BlogDetailLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        {children}
      </main>

      <Footer />
    </div>
  );
}

function BlogDetail() {
  const params = useParams();

  const { data: blog, isPending } = useGetPostsBySlug(params.slug);

  if (isPending) {
    return (
      <BlogDetailLayout>
        <div className="flex h-80 flex-col items-center justify-center gap-3 text-muted-foreground">
          <Loading />
          <p className="text-sm">Loading story...</p>
        </div>
      </BlogDetailLayout>
    );
  }

  if (!blog) {
    return (
      <BlogDetailLayout>
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-20 text-center">
          <h1 className="text-xl font-semibold">Blog not found</h1>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            The story you&rsquo;re looking for doesn&rsquo;t exist or may have
            been removed.
          </p>

          <Link
            to="/"
            className={cn(
              buttonVariants({ size: "sm" }),
              "mt-5 h-9 px-4 text-sm",
            )}
          >
            Back to homepage
          </Link>
        </div>
      </BlogDetailLayout>
    );
  }

  return (
    <BlogDetailLayout>
      <article className="w-full">
        <Link
          to="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; Back to homepage
        </Link>

        <div className="mt-6 overflow-hidden rounded-xl border bg-muted">
          <img
            src={blog.thumbnail || ""}
            alt={blog.title}
            className="aspect-video w-full object-cover"
          />
        </div>

        <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
          {blog.title}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {blog.category} &middot; {blog.user.nama}
        </p>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {blog.description}
        </p>

        <div className="mt-8 border-t pt-8">
          <Markdown content={blog.content} />
        </div>
      </article>
    </BlogDetailLayout>
  );
}

export default BlogDetail;
