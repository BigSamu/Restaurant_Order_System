import axios from "axios";

import { Ingredient } from "../models/index.js";
import { MARKET_API_BASE_URL as BASE_URL } from "../config/index.js";

// Function to check the availability of ingredients
const buyIngredients = async (ingredients) => {
  try {
    for (const ingredient of ingredients) {
      const { data } = await axios.get(
        `${BASE_URL}?ingredient=${ingredient.name}`
      );
      const { quantitySold } = data;

      try {
        await Ingredient.findOneAndUpdate(
          { name: ingredient.name },
          { $inc: { available: quantitySold } }
        );
      } catch (error) {
        console.error("Error updating ingredient availability:", error);
        throw error;
      }
    }
  } catch (error) {
    console.error("Error checking ingredient availability:", error);
    throw error;
  }
};

export const marketService = {
  buyIngredients,
};
