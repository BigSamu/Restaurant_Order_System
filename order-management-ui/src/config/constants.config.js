const { MODE, VITE_RESTAURANT_ORDER_SYSTEM_DOMAIN } = import.meta.env;

export const KITCHEN_API_PATH_SUFFIX = "api/v1/kitchen";
export const WAREHOUSE_API_PATH_SUFFIX = "api/v1/warehouse";

export const RESTAURANT_ORDER_SYSTEM_DOMAIN =
  MODE === "production"
    ? `http://${VITE_RESTAURANT_ORDER_SYSTEM_DOMAIN}`
    : `http://localhost:8080`;
