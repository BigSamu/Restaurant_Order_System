import { baseService } from "./base";

const baseUrl = "/orders";

const addNew = async (options = {}) => {
  return await baseService(options).post(`${baseUrl}/new`);
};

export const orderService = {
  addNew,
};
