import { Router } from "express";
import * as controller from "../controllers/weather.controller";

export const weatherRouter = Router();


weatherRouter.get("/search", controller.searchCities);
weatherRouter.get("/:city", controller.getDashboard);
