import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");
const authRoutes = Router();

authRoutes.post("/register", (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], function (err) {
    if (err) {
      return res.status(500).send("注册失败");
    }
    res.status(201).send("注册成功");
  });
});

export { authRoutes };
