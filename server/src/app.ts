import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { errorHandler, notFound } from "./middlewares/errorHandler";
import { weatherRouter } from "./routes/weather.routes";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL }));
app.use(express.json());
app.use("/api", rateLimit({ windowMs: 60_000, limit: 60, standardHeaders: true, legacyHeaders: false }));

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/weather", weatherRouter);

app.use(notFound);
app.use(errorHandler);
