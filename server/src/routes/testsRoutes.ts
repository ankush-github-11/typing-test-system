import { Router } from "express";
import {
  createTypingData,
  getTypingData,
} from "../controllers/testsController";

const router = Router();

router.post("/", createTypingData);
router.get("/", getTypingData);

export default router;