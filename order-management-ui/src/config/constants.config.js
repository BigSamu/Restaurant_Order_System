export const { VITE_NODE_ENV, VITE_RESTAURANT_ORDER_SYSTEM_DOMAIN } =
  import.meta.env;

export const SERVICE_NAME = "Warehouse";
export const KITCHEN_API_PATH_SUFFIX = "api/v1/kitchen";
export const WAREHOUSE_API_PATH_SUFFIX = "api/v1/warehouse";

export const KITCHEN_API_BASE_URL =
  VITE_NODE_ENV === "production"
    ? `http://${VITE_RESTAURANT_ORDER_SYSTEM_DOMAIN}/${KITCHEN_API_PATH_SUFFIX}`
    : `http://localhost:8080/${KITCHEN_API_PATH_SUFFIX}`;
