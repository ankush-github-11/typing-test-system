import { Router } from "express";
import postTestStarted from "../controllers/testStartedController";

const router = Router();

router.post("/", postTestStarted);

export default router;