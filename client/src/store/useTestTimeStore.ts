import { create } from 'zustand';
import { persist } from "zustand/middleware";

interface TestTimeState {
  testTime: number;
  setTestTime: (testTime: number) => void;
}
export const useTestTimeStore = create<TestTimeState>()(
  persist(
    (set) => ({
      testTime: 15,

      setTestTime: (testTime: number) =>
        set({ testTime }),
    }),
    {
      name: "test-time-storage",
    }
  )
);