import { Router } from "express";
import postTestCompleted from "../controllers/testCompletedController";

const router = Router();

router.post("/", postTestCompleted);

export default router;