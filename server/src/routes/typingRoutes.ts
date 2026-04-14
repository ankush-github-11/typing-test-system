import { Router } from "express";
import {
  createTypingData,
//   getTypingData,
} from "../controllers/typingController";

const router = Router();

router.post("/", createTypingData);
// router.get("/", getTypingData);

export default router;