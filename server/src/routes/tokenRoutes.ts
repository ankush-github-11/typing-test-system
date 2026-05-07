import { Router } from "express";
import { getTokens } from "../controllers/tokenController";

const router = Router();

router.get("/tokens", getTokens);

export default router;