import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface StoreState {
  serverIsReady: boolean;
  setServerIsReady: (serverIsReady: boolean) => void;
  style: string;
  setStyle: (style: string) => void;
}

export const useStore = create<StoreState>()((set) => ({
  serverIsReady: false,
  setServerIsReady: (serverIsReady) => set(() => ({ serverIsReady })),
  style: "",
  setStyle: (style) => set(() => ({ style })),
}));
