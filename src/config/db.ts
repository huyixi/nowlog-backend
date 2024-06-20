import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

let dbInstance: Database | null = null;

export async function openDb(): Promise<Database> {
  if (dbInstance) {
    return dbInstance;
  }

  console.log("Opening in-memory database...");
  dbInstance = await open({
    filename: ":memory:",
    driver: sqlite3.Database,
  });
  console.log("Database opened successfully.");

  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS memos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT
    )
  `);
  console.log("Database initialized successfully.");

  return dbInstance;
}
