import { Router } from "express";
import { hello } from "./controller";

const router = Router();

router.post("/", hello);

export default router;
