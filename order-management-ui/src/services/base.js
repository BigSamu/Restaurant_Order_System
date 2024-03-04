import axios from 'axios';
import { RESTAURANT_ORDER_SYSTEM_DOMAIN } from '../config/index.js';

const baseService = (options = {}) => {
  const { headers = {}, params = {} } = options;
  const baseServiceDefault = axios.create({
    baseURL: `${RESTAURANT_ORDER_SYSTEM_DOMAIN}`,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    params: { ...params },
    withCredentials: true,
  });

  baseServiceDefault.interceptors.response.use(
    (response) => {
      // Return unwrapped response ---the "body" of it
      return response.data;
    },
    (error) => {
      // Return Error to be handled by React Component
      return Promise.reject(error);
    }
  );

  return baseServiceDefault;
};

export { baseService };
