import { axiosInstance } from "@/lib/axios";
import type {
  PaginationQueryParams,
  PaginationResponse,
} from "@/types/pagination";
import type { Post } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

function useGetPosts(query?: PaginationQueryParams) {
  return useQuery({
    queryKey: ["posts", query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PaginationResponse<Post>>(
        "/posts",
        { params: query },
      );

      return data;
    },
  });
}

export default useGetPosts;
