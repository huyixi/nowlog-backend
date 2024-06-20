import { Router } from "express";
import { getAllMemos, createMemo } from "../controllers/memoController";

const router = Router();

router.get("/memos", getAllMemos);
router.post("/memos", createMemo);

export default router;
