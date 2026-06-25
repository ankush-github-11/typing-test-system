import { create } from "zustand";

interface TestRestartState {
  restartKey: number;
  restart: () => void;
}

export const useTestRestartStore = create<TestRestartState>((set) => ({
  restartKey: 0,
  restart: () =>
    set((state) => ({
      restartKey: state.restartKey + 1,
    })),
}));