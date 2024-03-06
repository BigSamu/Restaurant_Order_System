import axios from 'axios';
import { KITCHEN_API_BASE_URL } from '../config/index.js';

const kitchenBaseService = (options = {}) => {
  const { headers = {}, params = {} } = options;
  const baseServiceDefault = axios.create({
    baseURL: `${KITCHEN_API_BASE_URL}`,
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

export { kitchenBaseService };
