import { axiosInstance } from "@/lib/axios";
import type { CreateBlogSchema } from "@/schema/createBlog";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function useCreatePost() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: CreateBlogSchema) => {
      const formData = new FormData();

      formData.append("title", payload.title);
      formData.append("description", payload.description);
      formData.append("category", payload.category);
      formData.append("content", payload.content);
      formData.append("thumbnail", payload.thumbnail);

      await axiosInstance.post("/posts", formData);
    },
    onSuccess: () => {
      toast.success("Create post success");
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Create post failed!");
    },
  });
}

export default useCreatePost;
