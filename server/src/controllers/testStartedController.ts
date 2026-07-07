import { Request, Response } from "express";
import { pool } from "../config/db";
import { TestStartedData } from "../types/TestStartedData";
const postTestStarted = async (req: Request, res: Response) => {
  try {
    const { id } = req.body as TestStartedData;

    const query = `
      UPDATE users
      SET test_started = test_started + 1
      WHERE id = $1;
    `;

    await pool.query(query, [id]);

    return res.status(200).json({
      success: true,
      message: "Test started count updated successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default postTestStarted;