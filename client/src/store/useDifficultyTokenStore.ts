import { create } from 'zustand';
import { persist } from "zustand/middleware";
import type { DifficultyType } from '../types/typingTokenData';
// import { persist } from "zustand/middleware";
interface TokenState {
  difficulty: DifficultyType;
  setDifficulty: (difficulty: DifficultyType) => void;
}
export const useDifficultyTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      difficulty: "easy",

      setDifficulty: (difficulty : DifficultyType) =>
        set({ difficulty }),
    }),
    {
      name: "difficulty-storage",
    }
  )
);