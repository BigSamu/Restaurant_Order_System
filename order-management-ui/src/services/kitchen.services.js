import { kitchenBaseService } from "./base";
import { KITCHEN_API_PATH_SUFFIX } from "../config/index.js";

const ordersBaseUrl = `${KITCHEN_API_PATH_SUFFIX}/orders`;
const recipesBaseUrl = `${KITCHEN_API_PATH_SUFFIX}/recipes`;
const ingredientsBaseUrl = `${KITCHEN_API_PATH_SUFFIX}/ingredients`;
const logsBaseUrl = `/logs`;

const addNewOrder = async (options = {}) => {
  return await kitchenBaseService(options).post(`${ordersBaseUrl}/new`);
};

const getAllRecipes = async (options = {}) => {
  return await kitchenBaseService(options).get(`${recipesBaseUrl}`);
};

const getOneRecipeById = async (id, options = {}) => {
  return await kitchenBaseService(options).get(`${recipesBaseUrl}/${id}`);
};

const getAllIngredients = async (options = {}) => {
  return await kitchenBaseService(options).get(`${ingredientsBaseUrl}`);
}

const getOrdersLogs = async (options = {}) => {
  return await kitchenBaseService(options).get(`${logsBaseUrl}/orders.log`);
}

export const kitchenService = {
  addNewOrder,
  getAllRecipes,
  getOneRecipeById,
  getAllIngredients,
  getOrdersLogs
};
