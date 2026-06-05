import { create } from "zustand";

interface TypingAreaFocusedState {
  focused: boolean;
  setFocused: (focused: boolean) => void;
}
export const useTypingAreaFocusedStore = create<TypingAreaFocusedState>()((set) => ({
  focused: true,
  setFocused: (focused: boolean) => set({ focused }),
}));
