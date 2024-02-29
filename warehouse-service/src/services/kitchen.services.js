import axios from "axios";

import { Ingredient } from "../models/index.js";
import { KITCHEN_API_BASE_URL as BASE_URL } from "../config/index.js";

// Function to check the availability of ingredients
const confirmOrder = async (order) => {
  try {
    await axios.post(`${BASE_URL}/orders/confirm`, { order });
  } catch (error) {
    console.error("Error sending order confimration to kitchen service:", error);
    throw error;
  }
};

export const kitchenService = {
  confirmOrder,
};
