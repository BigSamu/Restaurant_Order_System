import { baseService } from "./base";
import { KITCHEN_API_PATH_SUFFIX } from "../config/constants.config.js";

const ordersBaseUrl = `${KITCHEN_API_PATH_SUFFIX}/orders`;
const recipesBaseUrl = `${KITCHEN_API_PATH_SUFFIX}/recipes`;

const addNewOrder = async (options = {}) => {
  return await baseService(options).post(`${ordersBaseUrl}/new`);
};

const getAllRecipes = async (options = {}) => {
  return await baseService(options).get(`${recipesBaseUrl}`);
};

const getOneRecipeById = async (id, options = {}) => {
  return await baseService(options).get(`${recipesBaseUrl}/${id}`);
};

export const kitchenService = {
  addNewOrder,
  getAllRecipes,
  getOneRecipeById,
};
