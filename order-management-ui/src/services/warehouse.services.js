import { warehouseBaseService } from "./base";
import { WAREHOUSE_API_PATH_SUFFIX } from "../config";

const ingredientsBaseUrl = `${WAREHOUSE_API_PATH_SUFFIX}/ingredients`;
const logsBaseUrl = `/logs`;

const getMarketLogs = async (options = {}) => {
  return await warehouseBaseService(options).get(`${logsBaseUrl}/market.log`);
};

const resetIngredientsStockAndMarketLogs = async (options = {}) => {
  return await warehouseBaseService(options).get(`${ingredientsBaseUrl}/reset`);
};

export const warehouseService = {
  getMarketLogs,
  resetIngredientsStockAndMarketLogs,
};
