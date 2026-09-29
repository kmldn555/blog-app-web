import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterSchema } from "@/schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

function RegisterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, formState } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const handleregister = async (values: RegisterSchema) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/register", {
        nama: values.nama,
        email: values.email,
        password: values.password,
      });

      alert("Register Success !!!");

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Register Failed !!!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleregister)}>
      <div className="w-100 mx-auto mt-20 border border-black p-8 space-y-4">
        <h1>Register Page</h1>

        <Label>Name</Label>
        <Input type="text" {...register("nama")} />
        {formState.errors.nama && (
          <p className="text-red-500 text-sm">
            {formState.errors.nama.message}
          </p>
        )}

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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default RegisterPage;
