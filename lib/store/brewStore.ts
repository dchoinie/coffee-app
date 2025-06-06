import { create } from "zustand";

export type Brew = {
  id: number;
  userId: number;
  beanId: number;
  method: string;
  date: string;
  dose: number;
  yield: number;
  grindSize: string;
  brewTime: number;
  preinfusionTime?: number;
  bloomTime?: number;
  leverPressure?: number;
  temperature: number;
  notes?: string;
  rating: number;
  equipment?: {
    id: string;
    type: string;
    brand: string;
    model: string;
  }[];
};

interface BrewState {
  brews: Brew[];
  latestBrew: Brew | null;
  isLoading: boolean;
  error: string | null;
  fetchBrews: () => Promise<void>;
  fetchLatestBrew: () => Promise<void>;
}

export const useBrewStore = create<BrewState>((set) => ({
  brews: [],
  latestBrew: null,
  isLoading: false,
  error: null,

  fetchBrews: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/brews");
      if (!response.ok) throw new Error("Failed to fetch brews");
      const data = await response.json();
      set({ brews: data, isLoading: false });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch brews";
      set({ error: errorMessage, isLoading: false });
    }
  },

  fetchLatestBrew: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/brews/latest");
      if (!response.ok) throw new Error("Failed to fetch latest brew");
      const data = await response.json();
      set({ latestBrew: data, isLoading: false });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch latest brew";
      set({ error: errorMessage, isLoading: false });
    }
  },
}));
