import { Request, Response } from "express";
import { pool } from "../config/db";
import { TimeTypingData } from "../types/TimeTypingData";
const postTimeTyping = async (req: Request, res: Response) => {
  try {
    const { id, time_typing } = req.body as TimeTypingData;
    const query = `
      UPDATE users
      SET time_typing = time_typing + $1
      WHERE id = $2;
    `;

    await pool.query(query, [time_typing, id]);

    return res.status(200).json({
      success: true,
      message: "Time typing count updated successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default postTimeTyping;