import mongoose from "mongoose";
import { recipeControllers } from "./recipe.controllers.js";
import { warehouseServices } from "../services/index.js";

const addNew = async (req, res) => {
  try {
    // Create new order to kitchen using MQRabbit
    const recipes = recipeControllers.getAll();
    // Select random recipe
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    const recipeIngredients = randomRecipe.ingredients;
    // Check if warehouse has enough ingredients
    const ingredientsAvailability =
      await warehouseServices.checkIngredientsAvailability(recipeIngredients);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const orderControllers = {
  addNew,
};
