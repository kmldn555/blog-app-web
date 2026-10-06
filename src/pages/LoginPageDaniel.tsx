import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "@/hooks/api/auth/useLogin";
import { loginSchema, type LoginSchema } from "@/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function LoginPageDaniel() {
  const { register, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useLogin();

  const handleLogin = async (values: LoginSchema) => {
    mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="w-100 mx-auto mt-20 border border-black p-8 space-y-4">
        <h1>LoginPage</h1>

        <Label>Email</Label>
        <Input type="email" {...register("email")} />
        {formState.errors.email && (
          <p className="text-red-500 text-sm">
            {formState.errors.email.message}
          </p>
        )}

        <Label>Password</Label>
        <Input type="password" {...register("password")} />
        {formState.errors.password && (
          <p className="text-red-500 text-sm">
            {formState.errors.password.message}
          </p>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default LoginPageDaniel;
