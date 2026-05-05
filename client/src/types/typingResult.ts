export type TypingResult = {
  wpm: number;
  rawAccuracy: number;
  typedText: string;
  wrongCharsTyped: number;
  totalCharsTyped: number;
  avgWpmPerSecondArr: number[];
  burstPerSecondArr: number[];
  rawWpmPerSecondArr: number[];
};