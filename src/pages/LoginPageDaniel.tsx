import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LoaderCircle,
  PenLine,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import ButtonLoginGoogle from "@/components/ButtonLoginGoogle";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useLogin from "@/hooks/api/auth/useLogin";
import { loginSchema, type LoginSchema } from "@/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";

function LoginPageDaniel() {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useLogin();

  const handleLogin = (values: LoginSchema) => {
    mutate(values);
  };

  const { errors } = formState;

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between xl:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-primary-foreground/5 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-primary-foreground/5 blur-3xl"
        />

        <Link
          to="/"
          className="relative flex w-fit items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/40"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground text-primary">
            <PenLine className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Blog</span>
        </Link>

        <div className="relative max-w-md">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/60">
            Welcome back
          </p>

          <h1 className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            Good writing starts with a good idea.
          </h1>

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Sign in to keep reading, writing, and sharing stories with a
            community of curious minds.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-primary-foreground/80">
            {[
              "Read stories from the community",
              "Publish and share your own writing",
              "Pick up right where you left off",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10">
                  <Check className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-primary-foreground/50">
          &copy; {new Date().getFullYear()} Blog. Crafted for curious minds.
        </p>
      </aside>

      <div className="flex min-h-screen flex-col px-4 py-6 sm:px-6 lg:min-h-0 lg:px-10 lg:py-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <PenLine className="size-4" />
            </span>
            <span className="text-base font-semibold tracking-tight">Blog</span>
          </Link>

          <p className="ml-auto text-sm text-muted-foreground">
            New here?{" "}
            <Link
              to="/register"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to your account to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)}>
              <FieldGroup className="gap-5">
                <div className="[&>button]:h-10 [&>button]:w-full [&>button]:text-sm">
                  <ButtonLoginGoogle />
                </div>

                <FieldSeparator>or continue with email</FieldSeparator>

                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="email" className="text-sm">
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className="h-10 px-3 text-sm md:text-sm"
                    {...register("email")}
                  />
                  {errors.email && <FieldError errors={[errors.email]} />}
                </Field>

                <Field data-invalid={!!errors.password}>
                  <div className="flex items-center justify-between gap-3">
                    <FieldLabel htmlFor="password" className="text-sm">
                      Password
                    </FieldLabel>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      aria-invalid={!!errors.password}
                      className="h-10 px-3 pr-10 text-sm md:text-sm"
                      {...register("password")}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <FieldError errors={[errors.password]} />
                  )}
                </Field>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="h-10 w-full gap-2 text-sm"
                >
                  {isPending ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </FieldGroup>
            </form>

            <p className="mt-8 text-center text-xs text-muted-foreground lg:hidden">
              &copy; {new Date().getFullYear()} Blog. Crafted for curious minds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPageDaniel;
