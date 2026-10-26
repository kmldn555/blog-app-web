import { LogOut, PenLine } from "lucide-react";
import { Link } from "react-router";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/stores/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <PenLine className="size-4" />
          </span>
          <span className="text-base font-semibold tracking-tight">Blog</span>
        </Link>

        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden max-w-40 truncate text-sm text-muted-foreground sm:block">
                Welcome,{" "}
                <span className="font-medium text-foreground">
                  {user.name}
                </span>
              </span>

              <Link
                to="/write"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "h-8 gap-1.5 px-3",
                )}
              >
                <PenLine className="size-3.5" />
                Create post
              </Link>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3"
                onClick={logout}
              >
                <LogOut className="size-3.5" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login2"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "h-8 px-3",
                )}
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className={cn(buttonVariants({ size: "sm" }), "h-8 px-3")}
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
