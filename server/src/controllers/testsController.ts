import { Request, Response } from "express";
import { pool } from "../config/db";
import { TestsData } from "../types/TestsData";

// CREATE entry
export const createTypingData = async (req: Request, res: Response) => {
  try {
    const data: TestsData = req.body;

    const result = await pool.query(
      `INSERT INTO tests_time 
        (id, wpm, accuracy, raw_accuracy, total_chars_typed, correct_chars, test_time, difficulty)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        data.id,
        data.wpm,
        data.accuracy,
        data.raw_accuracy,
        data.total_chars_typed,
        data.correct_chars,
        data.test_time,
        data.difficulty,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// GET all data
export const getTypingData = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM tests_time ORDER BY created_at DESC`
    );
    res.status(200).json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};