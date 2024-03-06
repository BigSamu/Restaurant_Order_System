import { kitchenBaseService } from "./base";

const ordersBaseUrl = "/orders";
const recipesBaseUrl = "/recipes";
const ingredientsBaseUrl = "/ingredients";

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

export const kitchenService = {
  addNewOrder,
  getAllRecipes,
  getOneRecipeById,
  getAllIngredients,
};
