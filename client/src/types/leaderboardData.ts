export interface LeaderboardData {
    id: number;               
    email: string;
    testid: number;
    wpm: number;
    accuracy: number;         
    test_time: number;        
    difficulty: "easy" | "medium" | "hard";
    created_at: Date;
}