import express from "express";

import {
  WAREHOUSE_PORT_SERVICE,
  SERVICE_NAME,
  WAREHOUSE_API_PATH_SUFFIX,
} from "./config/index.js";
import { ingredientRouter } from "./routes/index.js";
import { connectDB, connectMessageBroker } from "./config/index.js";
import { preloadIngredients } from "./scripts/index.js";
import { messageBrokerService } from "./services/index.js";

// Initialize express instance
const app = express(); // Express server

// Set up body-parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initializing connection to NoSQL database (MongoDB) using Moongose interface
await connectDB();

// Initializing connection to RabbitMQ message broker and start the consumer
await connectMessageBroker();
await messageBrokerService.startOrderIngredientsCheckConsumer();

// Preload ingredients in Database
preloadIngredients();

// Subscribe API routes
app.use(`/${WAREHOUSE_API_PATH_SUFFIX}`, ingredientRouter);

// Run Express server instance in selected port
app.listen(WAREHOUSE_PORT_SERVICE, () => {
  console.log(
    `${SERVICE_NAME} service is listening on port: ${WAREHOUSE_PORT_SERVICE}`
  );
});
