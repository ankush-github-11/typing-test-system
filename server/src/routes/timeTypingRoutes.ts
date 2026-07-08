import { Router } from "express";
import postTimeTyping from "../controllers/timeTypingController";

const router = Router();

router.post("/", postTimeTyping);

export default router;