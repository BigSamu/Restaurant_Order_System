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

export const PORT = 8080;

export const DATABASE_URL = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

console.log(DATABASE_URL);

export const SERVICE_NAME = "Kitchen";
export const API_PATH_SUFFIX = "/api/v1/kitchen";

export const RECIPES_LIST = [
  {
    name: "Grilled Chicken with Lemon Herb",
    description: "Juicy grilled chicken seasoned with lemon and herbs.",
    ingredients: [
      { ingredient: "chicken", quantity: 1 },
      { ingredient: "lemon", quantity: 2 },
    ],
  },
  {
    name: "Classic Cheeseburger",
    description: "A delicious cheeseburger with lettuce, tomato, and ketchup.",
    ingredients: [
      { ingredient: "meat", quantity: 1 },
      { ingredient: "cheese", quantity: 1 },
      { ingredient: "lettuce", quantity: 1 },
      { ingredient: "tomato", quantity: 1 },
      { ingredient: "ketchup", quantity: 1 },
    ],
  },
  {
    name: "Veggie Rice Bowl",
    description:
      "A healthy bowl of rice with tomatoes, onions, and lemon dressing.",
    ingredients: [
      { ingredient: "rice", quantity: 1 },
      { ingredient: "tomato", quantity: 1 },
      { ingredient: "onion", quantity: 1 },
      { ingredient: "lemon", quantity: 1 },
    ],
  },
  {
    name: "Lemon Roasted Potatoes",
    description: "Crispy potatoes roasted with a tangy lemon flavor.",
    ingredients: [
      { ingredient: "potato", quantity: 3 },
      { ingredient: "lemon", quantity: 1 },
    ],
  },
  {
    name: "Tomato and Lettuce Salad",
    description: "A fresh salad with tomatoes, lettuce, and a hint of lemon.",
    ingredients: [
      { ingredient: "tomato", quantity: 2 },
      { ingredient: "lettuce", quantity: 1 },
      { ingredient: "lemon", quantity: 1 },
    ],
  },
  {
    name: "Chicken and Rice Casserole",
    description: "Hearty casserole with chicken, rice, and tomatoes.",
    ingredients: [
      { ingredient: "chicken", quantity: 1 },
      { ingredient: "rice", quantity: 1 },
      { ingredient: "tomato", quantity: 2 },
    ],
  },
];
