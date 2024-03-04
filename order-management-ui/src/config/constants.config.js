export const SERVICE_NAME = "Warehouse";
export const KITCHEN_API_PATH_SUFFIX = "api/v1/kitchen";
export const WAREHOUSE_API_PATH_SUFFIX = "api/v1/warehouse";

const { MODE, VITE_RESTAURANT_ORDER_SYSTEM_DOMAIN } = import.meta.env;

console.log(`MODE: ${MODE}`);
console.log(`VITE_RESTAURANT_ORDER_SYSTEM_DOMAIN: ${VITE_RESTAURANT_ORDER_SYSTEM_DOMAIN}`);

export const KITCHEN_API_BASE_URL =
  MODE === "production"
    ? `http://${VITE_RESTAURANT_ORDER_SYSTEM_DOMAIN}/${KITCHEN_API_PATH_SUFFIX}`
    : `http://localhost:8080/${KITCHEN_API_PATH_SUFFIX}`;
