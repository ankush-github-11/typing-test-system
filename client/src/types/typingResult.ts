export type TypingResult = {
  wpm: number;
  rawAccuracy: number;
  typedText: string;
  wrongChars: number;
  avgWpmPerSecondArr: number[];
  burstPerSecondArr: number[];
};