import { warehouseBaseService } from "./base";

const logsBaseUrl = `/logs`;

const getMarketLogs = async (options = {}) => {
  return await warehouseBaseService(options).get(`${logsBaseUrl}/market.log`);
}
export const warehouseService = {

  getMarketLogs,
};
