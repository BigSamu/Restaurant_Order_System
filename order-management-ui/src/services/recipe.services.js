import { baseService } from "./base";

const baseUrl = "/recipes";

const getAll = async (options = {}) => {
  return await baseService(options).get(`${baseUrl}`);
};

const getOneById = async (id, options = {}) => {
  return await baseService(options).get(`${baseUrl}/${id}`);
};

export const recipeService = {
  getAll,
  getOneById
};
