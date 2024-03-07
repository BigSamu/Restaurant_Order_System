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
  INGREDIENTS_CHECK_QUEUE,
} = process.env;

export const KITCHEN_PORT_SERVICE = 8080;
export const WAREHOUSE_PORT_SERVICE = 8081;
export const UI_PORT_SERVICE = 3000;

export const DATABASE_URL = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

export const SERVICE_NAME = "Kitchen";
export const KITCHEN_API_PATH_SUFFIX = "api/v1/kitchen";

export const ORDERS_LOGS_FILE_PATH = path.resolve(process.cwd(), "./logs/orders.log");

export const RECIPES_LIST = [
  {
    name: "Grilled Chicken with Lemon Herb",
    description: "Juicy grilled chicken seasoned with lemon and herbs.",
    ingredients: [
      { name: "chicken", quantity: 2 },
      { name: "lemon", quantity: 3 },
    ],
  },
  {
    name: "Classic Cheeseburger",
    description: "A delicious cheeseburger with lettuce, tomato, and ketchup.",
    ingredients: [
      { name: "meat", quantity: 3 },
      { name: "cheese", quantity: 2 },
      { name: "lettuce", quantity: 2 },
      { name: "tomato", quantity: 2 },
      { name: "ketchup", quantity: 1 },
    ],
  },
  {
    name: "Veggie Rice Bowl",
    description:
      "A healthy bowl of rice with tomatoes, onions, and lemon dressing.",
    ingredients: [
      { name: "rice", quantity: 4 },
      { name: "tomato", quantity: 2 },
      { name: "onion", quantity: 1 },
      { name: "lemon", quantity: 2 },
    ],
  },
  {
    name: "Lemon Roasted Potatoes",
    description: "Crispy potatoes roasted with a tangy lemon flavor.",
    ingredients: [
      { name: "potato", quantity: 4 },
      { name: "lemon", quantity: 4 },
    ],
  },
  {
    name: "Tomato and Lettuce Salad",
    description: "A fresh salad with tomatoes, lettuce, and a hint of lemon.",
    ingredients: [
      { name: "tomato", quantity: 3 },
      { name: "lettuce", quantity: 3 },
      { name: "lemon", quantity: 2 },
    ],
  },
  {
    name: "Chicken and Rice Casserole",
    description: "Hearty casserole with chicken, rice, and tomatoes.",
    ingredients: [
      { name: "chicken", quantity: 3 },
      { name: "rice", quantity: 3 },
      { name: "tomato", quantity: 2 },
    ],
  },
];
