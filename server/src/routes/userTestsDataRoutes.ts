import { Router } from "express";
import {
  getTestsByUserId
} from "../controllers/userTestsDataController";

const router = Router();

router.get("/:id", getTestsByUserId);

export default router;