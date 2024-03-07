import express from "express";
import { ingredientControllers } from "../controllers/index.js";

const ingredientRouter = express.Router();

ingredientRouter.get("/ingredients", ingredientControllers.getAll);
ingredientRouter.get("/ingredients/reset", ingredientControllers.resetIngredientsStockAndMarketLogs);
ingredientRouter.get("/ingredients/:id", ingredientControllers.getOneById);

export { ingredientRouter };
