import express from "express";
import cors from "cors";
import { pool } from "./config/db"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import testsRoutes from "./routes/testsRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import leaderboardRoutes from "./routes/leaderboardRoutes";
import testStartedController from "./controllers/testStartedController";
import testCompletedController from "./controllers/testCompletedController";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://typing-test-system.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/tests", testsRoutes);
app.use("/api/tokens", tokenRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.use("/api/testStarted", testStartedController);
app.use("/api/testCompleted", testCompletedController);

const PORT = process.env.PORT || 5000;

pool.connect()
    .then(() => {
        console.log("PostgreSQL Connected");
        app.listen(PORT, () => {
            console.log(
                `Server running on port ${PORT}`
            );
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });