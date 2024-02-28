// preloadIngredients.js

import { Ingredient } from "../models/ingredient.model.js";
import { INGREDIENTS_LIST } from "../config/constants.config.js";

const ingredients = INGREDIENTS_LIST.map(item => ({
  name: item,
  available: 5
}));

export const preloadIngredients = async () => {
  try {
    for (const ingredient of ingredients) {
      await Ingredient.updateOne(
        { name: ingredient.name }, // Match condition
        { $set: ingredient }, // Update operation
        { upsert: true } // Upsert option
      );
    }
    const ingredientsInWarehouse = ingredients.map(item =>
      ` - ${item.name}: ${item.available}`).join("\n");
    console.log(
      `Ingredients preloaded successfully! Ingredients available in warehouse:\n${ingredientsInWarehouse}`);

  } catch (error) {
    console.error("Error preloading/updating ingredients:", error);
  }
};
