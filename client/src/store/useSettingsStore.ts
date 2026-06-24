import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CursorType = "default" | "line" | "block" | "underline";
export type CursorSmoothness = "low" | "medium" | "high";
export type QuickRestart = "esc" | "tab" | "alt";
export type StrictMode = "off" | "on" | "max";
export type ErrorBehaviour = "free" | "nobackspace" | "terminate";

interface SettingsState {
  // Cursor
  cursorType: CursorType;
  cursorSmoothness: CursorSmoothness;
  // Typing Behaviour
  quickRestart: QuickRestart;
  errorBehaviour: ErrorBehaviour;
  strictMode: StrictMode;
  // Live Stats
  showLiveWpm: boolean;
  showLiveAccuracy: boolean;
  showLiveBurst: boolean;

  // Actions
  setCursorType: (type: CursorType) => void;
  setCursorSmoothness: (smoothness: CursorSmoothness) => void;

  setQuickRestart: (key: QuickRestart) => void;
  setErrorBehaviour: (behaviour: ErrorBehaviour) => void;
  setStrictMode: (mode: StrictMode) => void;

  setShowLiveWpm: () => void;
  setShowLiveAccuracy: () => void;
  setShowLiveBurst: () => void;

  resetSettings: () => void;
}

const defaultSettings = {
  cursorType: "default" as CursorType,
  cursorSmoothness: "medium" as CursorSmoothness,

  quickRestart: "esc" as QuickRestart,
  errorBehaviour: "free" as ErrorBehaviour,
  strictMode: "off" as StrictMode,

  showLiveWpm: true,
  showLiveAccuracy: true,
  showLiveBurst: true,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setCursorType: (type) =>
        set({ cursorType: type }),

      setCursorSmoothness: (smoothness) =>
        set({
          cursorSmoothness: smoothness,
        }),

      setQuickRestart: (key) =>
        set({
          quickRestart: key,
        }),

      setErrorBehaviour: (behaviour) =>
        set({
          errorBehaviour: behaviour,
        }),

      setStrictMode: (mode) =>
        set({ strictMode: mode }),

      setShowLiveWpm: () =>
        set((state) => ({
          showLiveWpm: !state.showLiveWpm,
        })),

      setShowLiveAccuracy: () =>
        set((state) => ({
          showLiveAccuracy: !state.showLiveAccuracy,
        })),

      setShowLiveBurst: () =>
        set((state) => ({
          showLiveBurst: !state.showLiveBurst,
        })),

      resetSettings: () =>
        set(defaultSettings),
    }),
    {
      name: "typing-settings",
    }
  )
);