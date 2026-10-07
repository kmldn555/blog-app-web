import { axiosInstance } from "@/lib/axios";
import type { RegisterSchema } from "@/schema/register";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner"

function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values: RegisterSchema) => {
      await axiosInstance.post("/auth/register", {
        nama: values.nama,
        email: values.email,
        password: values.password,
      });
    },
    onSuccess: () => {
      toast.success("Register Success!");
      navigate("/login2");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Register Failed!");
    },
  });
}

export default useRegister;