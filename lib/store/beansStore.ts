import { create } from "zustand";

interface Bean {
  id: number;
  name: string;
  roaster: string;
  origin: string;
  roastDate: string;
  startingWeight: number;
  currentWeight: number;
}

interface BeansStore {
  beans: Bean[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  fetchBeans: () => Promise<void>;
  setPage: (page: number) => void;
}

export const useBeansStore = create<BeansStore>((set, get) => ({
  beans: [],
  currentPage: 1,
  itemsPerPage: 2,
  totalPages: 0,
  isLoading: false,
  error: null,

  fetchBeans: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/beans");
      if (!response.ok) throw new Error("Failed to fetch beans");
      const data = await response.json();
      set({
        beans: data,
        totalPages: Math.ceil(data.length / get().itemsPerPage),
        isLoading: false,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch beans";
      set({ error: errorMessage, isLoading: false });
    }
  },

  setPage: (page: number) => {
    set({ currentPage: page });
  },
}));
