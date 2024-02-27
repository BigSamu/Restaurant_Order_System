import { Recipe } from "../models/index.js";
import { RECIPES_LIST } from "../config/index.js";

export const preloadRecipes = async () => {
  try {
    await Recipe.deleteMany();
    // Insert recipes into the database
    await Recipe.insertMany(RECIPES_LIST);
    const recipesInMenu = RECIPES_LIST.map((item) => ` - ${item.name}`).join(
      "\n"
    );
    console.log(
      `Recipes preloaded successfully! Recipies in menu:\n${recipesInMenu}`
    );
  } catch (error) {
    console.error("Error preloading recipes:", error);
  }
};
