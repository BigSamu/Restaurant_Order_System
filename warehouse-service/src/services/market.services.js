import axios from "axios";

import { Ingredient } from "../models/index.js";
import { getMarketLogger } from "../config/index.js";
import { MARKET_API_BASE_URL as BASE_URL } from "../config/index.js";

// Function to check the availability of ingredients
const buyIngredient = async (ingredient, order) => {
  const marketLogger = getMarketLogger();
  try {
    const { data } = await axios.get(
      `${BASE_URL}?ingredient=${ingredient.name}`
    );
    const { quantitySold } = data;

    try {
      await Ingredient.findOneAndUpdate(
        { name: ingredient.name },
        { $inc: { available: quantitySold } }
      );
      marketLogger.info(
        `Bought ${quantitySold} ${ingredient.name} from market for order #${order.orderId} - Dish: '${order.name}'`
      );
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
