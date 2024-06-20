import { Request, Response } from "express";
import { openDb } from "../config/db";

export const getAllMemos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const db = await openDb();
  const memos = await db.all("SELECT * FROM memos");
  res.json(memos);
};

export const createMemo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { content } = req.body;
  if (!content) {
    res.status(400).send({ error: "Content is required" });
    return;
  }
  const db = await openDb();
  const result = await db.run(
    "INSERT INTO memos (content) VALUES (?)",
    content,
  );
  res.status(201).json({
    id: result.lastID,
    content,
  });
};
