import axios from "axios";

import { Ingredient } from "../models/index.js";
import { MARKET_API_BASE_URL as BASE_URL } from "../config/index.js";

// Function to check the availability of ingredients
const buyIngredient = async (name) => {
  try {
    const { data } = await axios.get(`${BASE_URL}?ingredient=${name}`);
    const { quantitySold } = data;

    try {
      await Ingredient.findOneAndUpdate(
        { name: name },
        { $inc: { available: quantitySold } }
      );
      return quantitySold;
    } catch (err) {
      console.error("Error updating ingredient availability:", err);
    }
  } catch (err) {
    console.error("Error checking ingredient availability:", err);
  }
};

export const marketService = {
  buyIngredient,
};
