// authMiddleware.test.ts
import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import { authMiddleware } from "./authMiddleware";

// Create a simple express app for testing
const app = express();

// Use the middleware in the test app
app.use(authMiddleware);

// Dummy routes to test the middleware
app.get("/test", (req: Request, res: Response) => {
  res.status(200).send("GET OK");
});

app.post("/test", (req: Request, res: Response) => {
  res.status(200).send("POST OK");
});

app.put("/test", (req: Request, res: Response) => {
  res.status(200).send("PUT OK");
});

app.delete("/test", (req: Request, res: Response) => {
  res.status(200).send("DELETE OK");
});

describe("authMiddleware", () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it("should log the request method and url for GET requests", async () => {
    await request(app).get("/test");
    expect(logSpy).toHaveBeenCalledWith("Auth Middleware: Request authenticated for GET /test");
  });

  it("should log the request method and url for POST requests", async () => {
    await request(app).post("/test");
    expect(logSpy).toHaveBeenCalledWith("Auth Middleware: Request authenticated for POST /test");
  });

  it("should log the request method and url for PUT requests", async () => {
    await request(app).put("/test");
    expect(logSpy).toHaveBeenCalledWith("Auth Middleware: Request authenticated for PUT /test");
  });

  it("should log the request method and url for DELETE requests", async () => {
    await request(app).delete("/test");
    expect(logSpy).toHaveBeenCalledWith("Auth Middleware: Request authenticated for DELETE /test");
  });

  it("should call next and not interfere with the request", async () => {
    const getResponse = await request(app).get("/test");
    expect(getResponse.status).toBe(200);
    expect(getResponse.text).toBe("GET OK");

    const postResponse = await request(app).post("/test");
    expect(postResponse.status).toBe(200);
    expect(postResponse.text).toBe("POST OK");

    const putResponse = await request(app).put("/test");
    expect(putResponse.status).toBe(200);
    expect(putResponse.text).toBe("PUT OK");

    const deleteResponse = await request(app).delete("/test");
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.text).toBe("DELETE OK");
  });
});
