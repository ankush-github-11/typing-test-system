import { Request, Response } from "express";
import { pool } from "../config/db"; // Adjust the path to your database connection

export const getTestsByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT *
      FROM tests_time
      WHERE id = $1
      ORDER BY testid DESC;
    `;

    const { rows } = await pool.query(query, [id]);

    const formattedRows = rows.map((row) => ({
      ...row,
      wpm: Math.round(Number(row.wpm)),
      accuracy: Math.round(Number(row.accuracy)),
      raw_accuracy: Math.round(Number(row.raw_accuracy)),
    }));

    res.status(200).json({
      success: true,
      data: formattedRows,
    });
  } catch (error) {
    console.error("Error fetching tests:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
