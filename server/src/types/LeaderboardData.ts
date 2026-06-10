export interface LeaderboardData {
    id: number;               
    name: string;
    wpm: number;
    accuracy: number;         
    test_time: number;        
    difficulty: "easy" | "medium" | "hard";
    created_at: Date;
}