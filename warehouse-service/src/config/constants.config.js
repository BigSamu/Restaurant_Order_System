import dotenv from "dotenv";
import path from "path";

// Determine the current environment based on NODE_ENV, defaulting to 'development'
const env = process.env.NODE_ENV || "development";

// Build the .env file name based on the current environment
const envPath = path.resolve(process.cwd(), `../.env.${env}`);

// Load environment variables from the corresponding .env file
dotenv.config({ path: envPath });

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
  INGREDIENTS_CHECK_QUEUE
} = process.env;

export const PORT = 8081;
export const DATABASE_URL = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

export const SERVICE_NAME = "Warehouse";
export const KITCHEN_API_PATH_SUFFIX = "api/v1/kitchen";
export const WAREHOUSE_API_PATH_SUFFIX = "api/v1/warehouse";

export const KITCHEN_API_BASE_URL = RESTAURANT_ORDER_SYSTEM_DOMAIN
  ? `https://${RESTAURANT_ORDER_SYSTEM_DOMAIN}/${KITCHEN_API_PATH_SUFFIX}`
  : `http://localhost:8080/${WAREHOUSE_API_PATH_SUFFIX}`;

export const MARKET_API_BASE_URL =
  "https://recruitment.alegra.com/api/farmers-market/buy";

export const INGREDIENTS_LIST = [
  "tomato",
  "lemon",
  "potato",
  "rice",
  "ketchup",
  "lettuce",
  "onion",
  "cheese",
  "meat",
  "chicken",
];
