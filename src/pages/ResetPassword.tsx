import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "@/schema/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { EyeClosedIcon, EyeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import useResetPassword from "@/hooks/api/auth/useResetPassword";
import { useSearchParams } from "react-router";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const { mutate, isPending } = useResetPassword(token!);

  async function onSubmit(data: ResetPasswordSchema) {
    mutate(data);
  }

  return (
    <div>
      <div>Reset Password Page</div>
      <Card className="w-full max-w-md border-slate-200 bg-white shadow-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-semibold text-slate-900">
            Reset Password
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed text-slate-500">
            Enter your email address and we will send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="form-reset-password"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FieldGroup>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-2"
                  >
                    <FieldLabel
                      htmlFor="form-password"
                      className="text-sm font-medium text-slate-700"
                    >
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="form-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Your password"
                        autoComplete="off"
                        type={showPassword ? "text" : "password"}
                        className="h-10 border-slate-300 focus-visible:ring-2"
                      />

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <HugeiconsIcon
                          icon={showPassword ? EyeClosedIcon : EyeIcon}
                          size={24}
                          color="currentColor"
                          strokeWidth={1.5}
                        />
                      </Button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-2"
                  >
                    <FieldLabel
                      htmlFor="form-confirm-password"
                      className="text-sm font-medium text-slate-700"
                    >
                      Confirm Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="form-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Your confirm password"
                        autoComplete="off"
                        type={showPassword ? "text" : "password"}
                        className="h-10 border-slate-300 focus-visible:ring-2"
                      />

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <HugeiconsIcon
                          icon={showPassword ? EyeClosedIcon : EyeIcon}
                          size={24}
                          color="currentColor"
                          strokeWidth={1.5}
                        />
                      </Button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Field orientation="horizontal" className="w-full gap-3">
            <Button
              type="submit"
              form="form-reset-password"
              disabled={isPending}
              className="flex-1"
            >
              {isPending ? "Loading" : "Submit"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ResetPassword;
