import { ArrowRight, Search, Sparkles, X } from "lucide-react";
import { Link } from "react-router";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { useAuth } from "@/stores/useAuth";

interface HeroSectionsProps {
  search: string;
  onSearchChange: (value: string) => void;
  total: number;
  isPending: boolean;
}

function HeroSections({
  search,
  onSearchChange,
  total,
  isPending,
}: HeroSectionsProps) {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-linear-to-b from-muted/70 via-muted/20 to-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 size-72 rounded-full bg-primary/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <Badge
          variant="outline"
          className="mb-5 h-auto gap-1.5 px-3 py-1 text-xs"
        >
          <Sparkles className="size-3.5" />
          A place for ideas
        </Badge>

        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Stories, ideas &amp; things{" "}
          <span className="text-muted-foreground">worth reading.</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
          Discover thoughtful writing from the community, or share something of
          your own with the world.
        </p>

        <div className="mx-auto mt-8 w-full max-w-xl">
          <InputGroup className="h-12 rounded-xl bg-background shadow-sm">
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>

            <InputGroupInput
              id="post-search"
              aria-label="Search stories"
              placeholder="Search stories by title..."
              autoComplete="off"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-12 text-sm"
            />

            {search && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="icon-sm"
                  aria-label="Clear search"
                  onClick={() => {
                    onSearchChange("");
                    document.getElementById("post-search")?.focus();
                  }}
                >
                  <X className="size-3.5" />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={user ? "/write" : "/login2"}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-10 gap-2 px-5 text-sm",
              )}
            >
              {user ? "Write a story" : "Start writing"}
              <ArrowRight className="size-4" />
            </Link>

            <a
              href="#posts"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-10 px-5 text-sm",
              )}
            >
              Browse stories
            </a>
          </div>

          {!isPending && total > 0 && (
            <p className="mt-6 text-xs text-muted-foreground">
              {total} {total === 1 ? "story" : "stories"} published
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSections;
