export interface TestsData {
  testid?: number;          // PRIMARY KEY
  id: number;               // user_id (FK to users table)
  wpm: number;
  accuracy: number;         // NUMERIC(5,2)
  raw_accuracy: number;      // NUMERIC(5,2)
  total_chars_typed: number;
  correct_chars: number;
  test_time: number;        // in seconds
  difficulty: "easy" | "medium" | "hard"; // or string if not enum
  created_at?: Date;
}