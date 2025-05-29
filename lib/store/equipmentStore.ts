import { create } from "zustand";

export type Equipment = {
  id: string;
  type: string;
  brand: string;
  model: string;
};

interface EquipmentState {
  equipment: Equipment[];
  isLoading: boolean;
  error: string | null;
  fetchEquipment: () => Promise<void>;
  addEquipment: (equipment: Omit<Equipment, "id">) => Promise<void>;
  updateEquipment: (id: string, equipment: Partial<Equipment>) => Promise<void>;
  deleteEquipment: (id: string) => Promise<void>;
}

export const useEquipmentStore = create<EquipmentState>((set) => ({
  equipment: [],
  isLoading: false,
  error: null,

  fetchEquipment: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement API call to fetch equipment
      const response = await fetch("/api/equipment");
      const data = await response.json();
      set({ equipment: data, isLoading: false });
    } catch {
      set({ error: "Failed to fetch equipment", isLoading: false });
    }
  },

  addEquipment: async (equipment) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement API call to add equipment
      const response = await fetch("/api/equipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipment),
      });
      const data = await response.json();
      set((state) => ({
        equipment: [...state.equipment, data],
        isLoading: false,
      }));
    } catch {
      set({ error: "Failed to add equipment", isLoading: false });
    }
  },

  updateEquipment: async (id, equipment) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement API call to update equipment
      const response = await fetch(`/api/equipment/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipment),
      });
      const data = await response.json();
      set((state) => ({
        equipment: state.equipment.map((e) =>
          e.id === id ? { ...e, ...data } : e
        ),
        isLoading: false,
      }));
    } catch {
      set({ error: "Failed to update equipment", isLoading: false });
    }
  },

  deleteEquipment: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement API call to delete equipment
      await fetch(`/api/equipment/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        equipment: state.equipment.filter((e) => e.id !== id),
        isLoading: false,
      }));
    } catch {
      set({ error: "Failed to delete equipment", isLoading: false });
    }
  },
}));
