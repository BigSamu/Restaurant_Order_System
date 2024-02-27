import dotenv from "dotenv";
import path from "path";

// Determine the current environment based on NODE_ENV, defaulting to 'development'
const env = process.env.NODE_ENV || "development";

// Build the .env file name based on the current environment
const envPath = path.resolve(process.cwd(), `../.env.${env}`);

// Load environment variables from the corresponding .env file
dotenv.config({ path: envPath });

const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
} = process.env;

export const PORT = 8081;
export const DATABASE_URL = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

console.log(DATABASE_URL);

export const SERVICE_NAME = "Warehouse";
export const API_PATH_SUFFIX = "/api/v1/warehouse";

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
