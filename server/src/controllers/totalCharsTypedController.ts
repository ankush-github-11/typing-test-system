import { Request, Response } from "express";
import { pool } from "../config/db";
import { TotalCharsTypedData } from "../types/TotalCharsTypedData";
const postTotalCharsTyped = async (req: Request, res: Response) => {
  try {
    const { id, total_chars_typed } = req.body as TotalCharsTypedData;
    const query = `
      UPDATE users
      SET total_chars_typed = total_chars_typed + $1
      WHERE id = $2;
    `;

    await pool.query(query, [total_chars_typed, id]);

    return res.status(200).json({
      success: true,
      message: "Total characters typed count updated successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default postTotalCharsTyped;