import { create } from "zustand";
import { produce } from "immer";

interface Store {
  currentCategory: any;
  setCurrentCategory: (category: any) => void;
}

export const useStore = create<Store>((set) => ({
  currentCategory: null,
  setCurrentCategory: (category) => set({ currentCategory: category }),
}));

export default useStore;
