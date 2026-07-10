import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TestTimeLeftState {
  testTimeLeft: number;
  setTestTimeLeft: (
    value: number | ((prev: number) => number)
  ) => void;
}

export const useTestTimeLeftStore = create<TestTimeLeftState>()(
  persist(
    (set) => ({
      testTimeLeft: 15,

      setTestTimeLeft: (value) =>
        set((state) => ({
          testTimeLeft:
            typeof value === "function"
              ? value(state.testTimeLeft)
              : value,
        })),
    }),
    {
      name: "test-time-left-storage",
    }
  )
);