// ---------------------------------------------------
// SERVER INITIALIZATION AND CONFIGURATION SETUP
// ---------------------------------------------------

import express from "express";

import { PORT, API_PATH_SUFFIX } from "./config/constants.js";

// Initialize express instance
const app = express(); // Express server

// Set up body-parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Subscribe API routes


// Run Express server instance in selected port
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
  console.log("Press Ctrl + C to quit.");
});
