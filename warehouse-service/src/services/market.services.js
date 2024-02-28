// src/services/warehouse.service.js
import axios from "axios";
import { MARKET_API_BASE_URL as BASE_URL } from "../config/index.js";

// Function to check the availability of ingredients
const buyIngredientInMarket = async (ingredient) => {
  try {
    const response = await axios.get(`${BASE_URL}?ingredient=${ingredient}`);
    return response.data;
  } catch (error) {
    console.error("Error checking ingredient availability:", error);
    throw error;
  }
};

export const marketServices = {
  buyIngredientInMarket,
};
