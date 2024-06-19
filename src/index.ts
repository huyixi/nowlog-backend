import express, { Request, Response } from "express";
import session from "express-session";
import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";
import { authRoutes } from "./routes/auth";

const app = express();
const db = new sqlite3.Database(":memory:");

app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, password TEXT)");
  db.run("CREATE TABLE notes (id INTEGER PRIMARY KEY, user_id INTEGER, content TEXT, tags TEXT)");
});

app.use("/api", authRoutes);

// 健康检查端点
app.get("/health", (req: Request, res: Response) => {
  // 可以在此添加其他健康检查逻辑，例如检查数据库连接状态
  db.get("SELECT 1", [], (err) => {
    if (err) {
      return res.status(500).send({ status: "error", message: "Database connection failed" });
    }
    res.status(200).send({ status: "ok", message: "Server is healthy" });
  });
});

app.listen(5001, () => {
  console.log("后端服务器运行在 http://localhost:5001");
});
