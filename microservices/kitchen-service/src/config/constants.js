import dotenv from "dotenv";
import path from "path";

// Determine the current environment based on NODE_ENV, defaulting to 'development'
const env = process.env.NODE_ENV || "development";

// Build the .env file name based on the current environment
const envPath = path.resolve(process.cwd(), `../../.env.${env}`);

// Load environment variables from the corresponding .env file
dotenv.config({ path: envPath });

export const {
  PORT = 8080,
} = process.env;

export const API_PATH_SUFFIX = "/api/v1/kitchen";
