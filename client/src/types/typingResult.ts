import type { DifficultyType } from "./typingTokenData";

export type TypingResult = {
  testTime: number;
  wpm: number;
  rawAccuracy: number;
  typedText: string;
  wrongCharsTyped: number;
  testTotalCharsTyped: number;
  avgWpmPerSecondArr: number[];
  burstPerSecondArr: number[];
  rawWpmPerSecondArr: number[];
  wrongCharsPerSecondArr: number[];
  difficulty: DifficultyType;
};