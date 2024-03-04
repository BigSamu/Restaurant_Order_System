import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import dotenv from "dotenv";
import path from "path";

// Determine the current environment based on NODE_ENV, defaulting to 'development'
const env = process.env.NODE_ENV || "development";

// Manually specify the path to the external .env file
const envPath = path.resolve(process.cwd(), `../.env.${env}`);

console.log(process.env.RESTAURANT_ORDER_SYSTEM_DOMAIN)

// Load environment variables from the corresponding .env file
dotenv.config({ path: envPath });

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [react()],
  define: {
    "import.meta.env.VITE_RESTAURANT_ORDER_SYSTEM_DOMAIN": JSON.stringify(
      process.env.RESTAURANT_ORDER_SYSTEM_DOMAIN
    ),
  },
});
