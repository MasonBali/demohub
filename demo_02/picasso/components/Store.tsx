import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface StoreState {
  serverIsReady: boolean;
  setServerIsReady: (serverIsReady: boolean) => void;
}

export const useStore = create<StoreState>()((set) => ({
  serverIsReady: false,
  setServerIsReady: (serverIsReady) => set(() => ({ serverIsReady })),
}));
