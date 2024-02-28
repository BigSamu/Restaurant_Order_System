import express from "express";
import { recipeControllers } from "../controllers/index.js";

const recipeRouter = express.Router();

recipeRouter.get("/recipes", recipeControllers.getAll);
recipeRouter.get("/recipes/:id", recipeControllers.getOneById);

export { recipeRouter };
