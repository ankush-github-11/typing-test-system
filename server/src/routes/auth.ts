import express, { Request, Response } from "express";
import { pool } from "../config/db";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { protect } from "../middlewares/auth";

const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? ("none" as const) : ("lax" as const),
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

const generateToken = (id: number): string => {
  const jwtSecret: Secret = process.env.JWT_SECRET as Secret;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }
  const options: SignOptions = {
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN || "2592000"),
  };
  return jwt.sign({ id }, jwtSecret, options);
};

// Signup route
router.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword],
    );
    const token = generateToken(newUser.rows[0].id);
    res.cookie("token", token, cookieOptions);
    const { password: _, ...safeUser } = newUser.rows[0];
    res.status(201).json({ user: safeUser });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user.rows[0].id);
    res.cookie("token", token, cookieOptions);
    const { password: _, ...safeUser } = user.rows[0];
    res.status(200).json({ user: safeUser });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Me
router.get("/me", protect, async (req: Request, res: Response) => {
  return res.json(req.user);
});

// Logout route
router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;