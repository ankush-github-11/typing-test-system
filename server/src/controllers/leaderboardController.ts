import { Request, Response } from "express";
import {pool} from "../config/db";
import { LeaderboardData } from "../types/LeaderboardData";

export const getLeaderboardData = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const query = `
            SELECT
                u.id,
                u.name,
                t.wpm,
                t.accuracy,
                t.test_time,
                t.difficulty,
                t.created_at
            FROM users u
            INNER JOIN tests_time t
                ON u.id = t.id
            ORDER BY
                t.wpm DESC,
                t.accuracy DESC,
                t.created_at DESC;
        `;

        const { rows } = await pool.query<LeaderboardData>(query);

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows,
        });
    }
    catch (error) {
        console.error("Error fetching leaderboard:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch leaderboard",
        });
    }
};