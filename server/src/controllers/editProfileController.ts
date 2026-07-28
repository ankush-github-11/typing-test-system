import { Request, Response } from "express";
import { pool } from "../config/db";
import { EditProfileData } from "../types/EditProfileData";

export const updateProfile = async (
  req: Request<{}, {}, EditProfileData>,
  res: Response
) => {
  try {
    const {
      id,
      name,
      keyboard,
      bio,
      country,
      city,
      organization,
      portfolio_url,
      linkedin_url,
      github_url,
      x_url
    } = req.body;

    const query = `
      UPDATE users
      SET
        name = $2,
        keyboard = $3,
        bio = $4,
        country = $5,
        city = $6,
        organization = $7,
        portfolio_url = $8,
        linkedin_url = $9,
        github_url = $10,
        x_url = $11
      WHERE id = $1
      RETURNING *;
    `;

    const values = [id, name, keyboard, bio, country, city, organization, portfolio_url, linkedin_url, github_url, x_url];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};