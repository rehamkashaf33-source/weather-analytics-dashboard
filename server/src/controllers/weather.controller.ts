import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import * as weatherService from "../services/weather.service";

const citySchema = z.object({ city: z.string().trim().min(2).max(80) });
const searchSchema = z.object({ q: z.string().trim().min(2).max(80) });

export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { city } = citySchema.parse(req.params);
    res.json(await weatherService.getDashboard(city));
  } catch (err) {
    next(err);
  }
};

export const searchCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = searchSchema.parse(req.query);
    res.json(await weatherService.searchCities(q));
  } catch (err) {
    next(err);
  }
};
