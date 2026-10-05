import { axiosInstance } from "@/lib/axios";
import type { Post } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

function useGetPostsBySlug(slug?: string) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Post>(`/posts/${slug}`);
      return data;
    },
  });
}

export default useGetPostsBySlug;
