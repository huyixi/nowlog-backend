import { Request, Response } from "express";
import { openDb } from "../config/db";

export const healthCheck = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = await openDb();
    await db.get("SELECT 1");
    res.status(200).send({ status: "ok", message: "Server is healthy" });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).send({ status: "error", message: "Database connection failed", error: errorMessage });
  }
};
