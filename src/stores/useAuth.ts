import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserAuth {
  id: number;
  name: string;
  email: string;
  role: string;
  profilePic: string | null;
}

type Store = {
  user: UserAuth | null;
  login: (user: UserAuth) => void;
  logout: () => void;
};

export const useAuth = create<Store>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: async () => {
        await axiosInstance.post("/auth/logout");
        set({ user: null });
      },
    }),
    { name: "auth" },
  ),
);
