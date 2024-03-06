import axios from "axios";
import {
  KITCHEN_SERVICE_DOMAIN,
  WAREHOUSE_SERVICE_DOMAIN,
} from "../config/index.js";

export const kitchenBaseService = (options = {}) => {
  const { headers = {}, params = {} } = options;
  const kitchenBaseServiceDefault = axios.create({
    baseURL: `${KITCHEN_SERVICE_DOMAIN}`,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    params: { ...params },
    withCredentials: true,
  });

  kitchenBaseServiceDefault.interceptors.response.use(
    (response) => {
      // Return unwrapped response ---the "body" of it
      return response.data;
    },
    (error) => {
      // Return Error to be handled by React Component
      return Promise.reject(error);
    }
  );

  return kitchenBaseServiceDefault;
};

export const warehouseBaseService = (options = {}) => {
  const { headers = {}, params = {} } = options;
  const warehouseBaseServiceDefault = axios.create({
    baseURL: `${WAREHOUSE_SERVICE_DOMAIN}`,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    params: { ...params },
    withCredentials: true,
  });

  warehouseBaseServiceDefault.interceptors.response.use(
    (response) => {
      // Return unwrapped response ---the "body" of it
      return response.data;
    },
    (error) => {
      // Return Error to be handled by React Component
      return Promise.reject(error);
    }
  );

  return warehouseBaseServiceDefault;
};
