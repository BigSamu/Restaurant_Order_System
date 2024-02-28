// ---------------------------------------------------
// CONFIG SETUP - Database
// ---------------------------------------------------

import mongoose from "mongoose";
import { DATABASE_URL } from "./constants.config.js";

// Setting connection to Mongo DB using 'mongoose' instance
export const connectDB = async () => {
  try {
    await mongoose.connect(`${DATABASE_URL}`);
    console.log("Waiter Service established a connection to the database");
  } catch (err) {
    console.log("Something went wrong when connecting to the database", err);
  }
};
