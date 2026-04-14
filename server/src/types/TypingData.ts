export interface TypingData {
  tid?: number;
  seconds: number;
  totalwords: number;
  correctwords: number;
  totalchars: number;
  correctchars: number;
  difficulty: string;
  created_at?: Date;
}