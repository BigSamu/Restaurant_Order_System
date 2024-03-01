// ---------------------------------------------------
// SERVER INITIALIZATION AND CONFIGURATION SETUP
// ---------------------------------------------------

import express from "express";
import cors from "cors";

import { PORT, SERVICE_NAME, KITCHEN_API_PATH_SUFFIX } from "./config/index.js";
import { recipeRouter, orderRouter } from "./routes/index.js";
import { connectDB, connectMessageBroker } from "./config/index.js";
import { preloadRecipes } from "./scripts/index.js";

// Initialize express instance
const app = express(); // Express server

// Set up body-parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up CORS policy
const corsOptions = {
  credentials: true, // Allow credentials (cookies) to be sent to/from origin
  origin: 'http://localhost:3000', // Allow only this origin
  methods: 'GET, POST, PUT, DELETE', // Allow these methods
};
app.use(cors(corsOptions));

// Initializing connection to NoSQL database (MongoDB) using Moongose interface
await connectDB();

// Initializing connection to RabbitMQ message broker
await connectMessageBroker();

// Preload ingredients in Database
preloadRecipes();

// Subscribe API routes
app.use(`/${KITCHEN_API_PATH_SUFFIX}`, recipeRouter);
app.use(`/${KITCHEN_API_PATH_SUFFIX}`, orderRouter);

// Run Express server instance in selected port
app.listen(PORT, () => {
  console.log(`${SERVICE_NAME} service is listening on port: ${PORT}`);
});
