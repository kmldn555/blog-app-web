import { useAuth } from "@/stores/useAuth";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  withCredentials: true,
});

export const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.response.data.message === "Token expired" &&
      !originalRequest.retry
    ) {
      try {
        await refreshInstance.post("/auth/refresh");
        return axiosInstance(originalRequest);
      } catch (error) {
        useAuth.getState().logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
