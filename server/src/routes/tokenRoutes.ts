import { Router } from "express";
import { getTokens } from "../controllers/tokenController";

const router = Router();

router.post("/", getTokens);

export default router;