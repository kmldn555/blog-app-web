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
import useForgotPassword from "@/hooks/api/auth/useForgotPassword";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/schema/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

function ForgotPassword() {
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useForgotPassword();

  async function onSubmit(data: ForgotPasswordSchema) {
    mutate(data);
  }

return (
  <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
    <h1 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
      Forgot Password Page
    </h1>

    <Card className="w-full max-w-md border-slate-200 bg-white shadow-md">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold text-slate-900">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed text-slate-500">
          Enter your email address and we will send you a link to reset your
          password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="form-forgot-password"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-2">
                  <FieldLabel
                    htmlFor="form-email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email
                  </FieldLabel>

                  <Input
                    {...field}
                    id="form-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your email"
                    autoComplete="off"
                    className="h-10 border-slate-300 focus-visible:ring-2"
                  />

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
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="flex-1"
          >
            Reset
          </Button>

          <Button
            type="submit"
            form="form-forgot-password"
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

export default ForgotPassword;
