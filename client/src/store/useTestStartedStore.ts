import { create } from "zustand";

interface TestStartedState {
  testStarted: boolean;
  setTestStarted: (testStarted: boolean) => void;
}
export const useTestStartedStore = create<TestStartedState>()((set) => ({
  testStarted: false,
  setTestStarted: (testStarted: boolean) => set({ testStarted }),
}));
