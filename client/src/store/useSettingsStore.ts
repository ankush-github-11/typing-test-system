import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CursorType = "default" | "block" | "underline";
export type CursorSmoothness = "off" | "low" | "medium" | "high";
export type QuickRestart = "tab" | "esc" | "alt";
export type StrictMode = "off" | "on" | "max";
export type ErrorBehaviour = "free" | "nobackspace";
export type ShowLiveWpm = "off" | "on";
export type ShowLiveAccuracy = "off" | "on";
export type ShowLiveBurst = "off" | "on";

interface SettingsState {
  // Cursor
  cursorType: CursorType;
  cursorSmoothness: CursorSmoothness;
  // Typing Behaviour
  quickRestart: QuickRestart;
  errorBehaviour: ErrorBehaviour;
  strictMode: StrictMode;
  // Live Stats
  showLiveWpm: ShowLiveWpm;
  showLiveAccuracy: ShowLiveAccuracy;
  showLiveBurst: ShowLiveBurst;

  // Actions
  setCursorType: (type: CursorType) => void;
  setCursorSmoothness: (smoothness: CursorSmoothness) => void;

  setQuickRestart: (key: QuickRestart) => void;
  setErrorBehaviour: (behaviour: ErrorBehaviour) => void;
  setStrictMode: (mode: StrictMode) => void;

  setShowLiveWpm: (option: ShowLiveWpm) => void;
  setShowLiveAccuracy: (option: ShowLiveAccuracy) => void;
  setShowLiveBurst: (option: ShowLiveBurst) => void;

  resetSettings: () => void;
}

const defaultSettings = {
  cursorType: "default" as CursorType,
  cursorSmoothness: "medium" as CursorSmoothness,

  quickRestart: "esc" as QuickRestart,
  errorBehaviour: "free" as ErrorBehaviour,
  strictMode: "off" as StrictMode,

  showLiveWpm: "off" as ShowLiveWpm,
  showLiveAccuracy: "off" as ShowLiveAccuracy,
  showLiveBurst: "off" as ShowLiveBurst,
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

      setShowLiveWpm: (option) =>
        set({ showLiveWpm: option }),

      setShowLiveAccuracy: (option) =>
        set({ showLiveAccuracy: option }),

      setShowLiveBurst: (option) =>
        set({ showLiveBurst: option }),

      resetSettings: () =>
        set(defaultSettings),
    }),
    {
      name: "typing-settings",
    }
  )
);