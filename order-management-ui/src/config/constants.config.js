
// export const RESTAURANT_ORDER_SYSTEM_DOMAIN = "localhost:8080";
const env = process.env.NODE_ENV || "development";

export const {
  RESTAURANT_ORDER_SYSTEM_DOMAIN,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  MESSAGE_BROKER_USER,
  MESSAGE_BROKER_PASSWORD,
  MESSAGE_BROKER_HOST,
  MESSAGE_BROKER_PORT,
  INGREDIENTS_CHECK_QUEUE,
} = import.meta.env;

export const DATABASE_URL = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

export const SERVICE_NAME = "Warehouse";
export const KITCHEN_API_PATH_SUFFIX = "api/v1/kitchen";
export const WAREHOUSE_API_PATH_SUFFIX = "api/v1/warehouse";

export const KITCHEN_API_BASE_URL =
  env === "production"
    ? `http://${RESTAURANT_ORDER_SYSTEM_DOMAIN}/${KITCHEN_API_PATH_SUFFIX}`
    : `http://localhost:8080/${KITCHEN_API_PATH_SUFFIX}`;
