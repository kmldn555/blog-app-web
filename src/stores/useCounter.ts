import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  count: number;
  inc: () => void;
  dec: () => void;
};

// Without Persist
// export const useCounter = create<Store>()((set) => ({
//   count: 1,
//   inc: () => set((state) => ({ count: state.count + 1 })),
//   dec: () => set((state) => ({ count: state.count - 1 })),
// }));

export const useCounter = create<Store>()(
  persist(
    (set) => ({
      count: 1,
      inc: () => set((state) => ({ count: state.count + 1 })),
      dec: () => set((state) => ({ count: state.count - 1 })),
    }),
    { name: "counter" },
  ),
);
