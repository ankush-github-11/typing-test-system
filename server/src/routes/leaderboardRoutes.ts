import { Router } from "express";
import {
  getLeaderboardData,
} from "../controllers/leaderboardController";

const router = Router();

router.post("/", getLeaderboardData);

export default router;