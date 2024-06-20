// memoController.test.ts
import request from "supertest";
import express from "express";
import { getAllMemos, createMemo } from "./memoController";
import { openDb } from "../config/db";

// Create an express app for testing
const app = express();
app.use(express.json());
app.get("/memos", getAllMemos);
app.post("/memos", createMemo);

// Mock the openDb function
jest.mock("../config/db", () => ({
  openDb: jest.fn(),
}));

describe("memoController", () => {
  describe("getAllMemos", () => {
    it("should return all memos", async () => {
      // Mock the database methods
      (openDb as jest.Mock).mockResolvedValue({
        all: jest.fn().mockResolvedValue([{ id: 1, content: "Test memo" }]),
      });

      const response = await request(app).get("/memos");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ id: 1, content: "Test memo" }]);
    });
  });

  describe("createMemo", () => {
    it("should create a new memo", async () => {
      // Mock the database methods
      (openDb as jest.Mock).mockResolvedValue({
        run: jest.fn().mockResolvedValue({ lastID: 1 }),
      });

      const response = await request(app).post("/memos").send({ content: "New memo" });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ id: 1, content: "New memo" });
    });

    it("should return 400 if content is missing", async () => {
      const response = await request(app).post("/memos").send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Content is required" });
    });
  });
});
