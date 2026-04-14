import { Request, Response } from "express";
import { pool } from "../config/db";
import { TypingData } from "../types/TypingData";

// CREATE entry
export const createTypingData = async (req: Request, res: Response) => {
  try {
    const data: TypingData = req.body;

    const result = await pool.query(
      `INSERT INTO typingdata 
      (seconds, totalwords, correctwords, totalchars, correctchars, difficulty)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        data.seconds,
        data.totalwords,
        data.correctwords,
        data.totalchars,
        data.correctchars,
        data.difficulty,
      ]
    );

    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// GET all data
// export const getTypingData = async (_req: Request, res: Response) => {
//   try {
//     const result = await pool.query(
//       "SELECT * FROM typingdata ORDER BY created_at DESC"
//     );

//     res.json(result.rows);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };
