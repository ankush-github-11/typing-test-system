export interface UserTestsData {
  testid: number;
  id: number;
  wpm: number;
  accuracy: number;
  raw_accuracy: number;
  total_chars_typed: number;
  correct_chars: number;
  test_time: number;
  difficulty: "easy" | "medium" | "hard";
};