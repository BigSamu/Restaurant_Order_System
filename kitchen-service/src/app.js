// ---------------------------------------------------
// SERVER INITIALIZATION AND CONFIGURATION SETUP
// ---------------------------------------------------

import express from "express";
import cors from "cors";
import http from "http"; // Import http module
import { Server as SocketIOServer } from "socket.io"; // Import Socket.IO

import {
  RESTAURANT_ORDER_SYSTEM_DOMAIN,
  KITCHEN_PORT_SERVICE,
  UI_PORT_SERVICE,
  SERVICE_NAME,
  KITCHEN_API_PATH_SUFFIX,
} from "./config/index.js";
import { recipeRouter, orderRouter } from "./routes/index.js";
import {
  connectDB,
  connectMessageBroker,
  setupSocketConnection,
} from "./config/index.js";
import { preloadRecipes } from "./scripts/index.js";

// Initialize express instance
const app = express(); // Express server

// Set up body-parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up CORS policy

const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? [
        `http://localhost:${UI_PORT_SERVICE}`,
        `http://127.0.0.1:${UI_PORT_SERVICE}`,
      ]
    : [`http://${RESTAURANT_ORDER_SYSTEM_DOMAIN}`];

const corsOptions = {
  credentials: true,
  origin: allowedOrigins,
  methods: "GET, POST, PUT, DELETE", // Allow these methods
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

// Create an HTTP server and pass the Express app
const httpServer = http.createServer(app);

// Set up Socket.IO connection
setupSocketConnection(httpServer, corsOptions);

// Run Express server instance in selected port
httpServer.listen(KITCHEN_PORT_SERVICE, () => {
  console.log(
    `${SERVICE_NAME} service is listening on port: ${KITCHEN_PORT_SERVICE}`
  );
});
