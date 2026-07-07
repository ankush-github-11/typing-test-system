import { Request, Response } from "express";
import { pool } from "../config/db";
import { TestCompletedData } from "../types/TestCompletedData";
const postTestCompleted = async (req: Request, res: Response) => {
  try {
    const { id } = req.body as TestCompletedData;

    const query = `
      UPDATE users
      SET test_completed = test_completed + 1
      WHERE id = $1;
    `;

    await pool.query(query, [id]);

    return res.status(200).json({
      success: true,
      message: "Test completed count updated successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default postTestCompleted;