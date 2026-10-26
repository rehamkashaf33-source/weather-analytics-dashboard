import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  CLIENT_URL: z.string().url().default("http://localhost:5173"),
  OPENWEATHER_API_KEY: z.string().min(1, "OPENWEATHER_API_KEY is required"),
  REDIS_URL: z.string().optional().transform((v) => v || undefined),
  CACHE_TTL_SECONDS: z.coerce.number().default(600),
});

export const env = schema.parse(process.env);
