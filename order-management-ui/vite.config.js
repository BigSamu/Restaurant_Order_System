import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dotenv from 'dotenv';
import path from 'path';

// Determine the current environment based on NODE_ENV, defaulting to 'development'
const env = process.env.VITE_NODE_ENV || "development";

// Manually specify the path to the external .env file
const envPath = path.resolve(process.cwd(), `../.env.${env}`);

// Load environment variables from the corresponding .env file
dotenv.config({ path: envPath });

// Filter out VITE_ prefixed variables and prepare them for the define option
const viteEnvVariables = Object.entries(process.env).reduce((acc, [key, value]) => {
  if (key.startsWith('VITE_')) {
    // Vite replaces `import.meta.env` with the actual environment variables
    // We need to stringify the values for proper inclusion
    acc[`import.meta.env.${key}`] = JSON.stringify(value);
  }
  return acc;
}, {});



// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host: '0.0.0.0',
    port: 3000
  },
  define: viteEnvVariables,
  plugins: [react()],
})
