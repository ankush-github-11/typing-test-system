export type TokenType =
  | "word"
  | "number"
  | "punctuation"

export type DifficultyType =
  | "easy"
  | "medium"
  | "hard"

export interface TypingTokenData {
  tid: number;
  token_type: TokenType;
  token_string: string;
  difficulty: DifficultyType;
}