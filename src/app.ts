import express from "express";
import cors from "cors";
import memoRoutes from "./routes/memoRoutes";
import healthRoutes from "./routes/healthRoutes";
import { authMiddleware } from "./middleware/authMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use("/api", memoRoutes);
app.use("/", healthRoutes);

export default app;
