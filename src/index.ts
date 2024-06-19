import express, { Request, Response } from "express";
import session from "express-session";
import sqlite3 from "sqlite3";

const app = express();
const db = new sqlite3.Database(":memory:");

app.use(express.json());

// 初始化数据库
db.serialize(() => {
  db.run(`CREATE TABLE memos(id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)`);
});

// 健康检查端点
app.get("/health", (req: Request, res: Response) => {
  db.get("SELECT 1", [], (err) => {
    if (err) {
      return res.status(500).send({ status: "error", message: "Database connection failed" });
    }
    res.status(200).send({ status: "ok", message: "Server is healthy" });
  });
});

app.post("/api/memos", (req: Request, res: Response) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).send({ status: "error", message: "Content is required" });
  }
  db.run("INSERT INTO memos(content) VALUES(?)", [content], function (err) {
    if (err) {
      return res.status(500).send({ status: "error", message: "Failed to create memo" });
    }
    res.status(201).send({ status: "ok", id: this.lastID });
  });
});

// 获取所有 memos 的端点
app.get("/api/memos", (req: Request, res: Response) => {
  db.all("SELECT * FROM memos", [], (err, rows) => {
    if (err) {
      return res.status(500).send({ status: "error", message: "Failed to retrieve memos" });
    }
    res.status(200).send(rows);
  });
});

app.listen(5001, () => {
  console.log("后端服务器运行在 http://localhost:5001");
});
