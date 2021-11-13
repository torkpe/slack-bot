import { Router } from "express";
import { addInteraction, getInteractions } from "./controller";

const router = Router();

router.post("/", addInteraction);
router.get("/", getInteractions);

export default router;
