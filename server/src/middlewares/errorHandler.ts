import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";

export const notFound = (_req: Request, _res: Response, next: NextFunction) =>
  next(new AppError(404, "Route not found"));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: "Invalid request", issues: err.flatten().fieldErrors });
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  logger.error("Unhandled error", { path: req.path, err });
  return res.status(500).json({ message: "Something went wrong on our side" });
};
