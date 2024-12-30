import { create } from "zustand";

export const useSearchMarketplace = create<{
  search: string;
  setSearch: (search: string) => void;
}>()((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));
