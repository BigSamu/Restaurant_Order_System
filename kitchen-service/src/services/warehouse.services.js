// src/services/warehouse.service.js
import axios from "axios";
import { WAREHOUSE_API_BASE_URL as BASE_URL } from "../config/index.js";

// Function to check the availability of ingredients
const retrieveRecipeIngredients = async (ingredients) => {
  try {
    const response = await axios.post(`${BASE_URL}/ingredients/check`, {
      ingredients,
    });
    return response.data;
  } catch (error) {
    console.error("Error checking ingredient availability:", error);
    throw error;
  }
};

export const warehouseServices = {
  retrieveRecipeIngredients,
};
