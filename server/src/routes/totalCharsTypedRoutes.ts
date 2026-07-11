import { Router } from "express";
import postTotalCharsTyped from "../controllers/totalCharsTypedController";

const router = Router();

router.post("/", postTotalCharsTyped);

export default router;