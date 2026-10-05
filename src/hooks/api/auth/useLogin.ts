import { useAuth } from "@/stores/useAuth";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";

function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values: LoginSchema) => {
      const { data } = await axiosInstance.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      return data;
    },
    onSuccess: (data) => {
      login({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        profilePic: data.user.profilePic,
        accessToken: data.accessToken,
      });

      alert("Login Success!");

      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(error.response?.data.message || "Login Failed!");
    },
  });
}
export default useLogin;