import { create } from "zustand";

interface TestTotalCharsTypedState {
  testTotalCharsTyped: number;
  setTestTotalCharsTyped: (
    value: number | ((prev: number) => number)
  ) => void;
}

export const useTestTotalCharsTypedStore = create<TestTotalCharsTypedState>(
  (set) => ({
    testTotalCharsTyped: 0,

    setTestTotalCharsTyped: (value) =>
      set((state) => ({
        testTotalCharsTyped:
          typeof value === "function"
            ? value(state.testTotalCharsTyped)
            : value,
      })),
  })
);