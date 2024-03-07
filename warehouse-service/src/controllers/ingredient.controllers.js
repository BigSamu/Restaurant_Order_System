import fs from "fs";

import mongoose from "mongoose";
import { Ingredient } from "../models/index.js";

import {
  MARKET_LOGS_FILE_PATH,
  INGREDIENTS_CHECK_QUEUE,
} from "../config/index.js";
import { preloadIngredients } from "../scripts/ingredient.script.js";

import {
  getSocketConnection,
  getMessageBrokerChannel,
  connectMessageBroker,
} from "../config/index.js";
import { messageBrokerService } from "../services/index.js";

const { ObjectId } = mongoose.Types;

const getAll = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res
      .status(400)
      .json({ message: "UUID doesn't match the specified format" });
  try {
    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    res.status(200).json(ingredient);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

const resetIngredientsStockAndMarketLogs = async (req, res) => {
  const ioWarehouse = getSocketConnection();
  const channel = getMessageBrokerChannel();
  try {

    await channel.purgeQueue(INGREDIENTS_CHECK_QUEUE);
    console.log(`Queue '${INGREDIENTS_CHECK_QUEUE}' purged successfully.`);

    await preloadIngredients();
    ioWarehouse.emit("ingredients_stock_reset", await Ingredient.find());
    fs.truncate(MARKET_LOGS_FILE_PATH, 0, () => {
      console.log("Market logs file cleared");
    });
    res.status(200).json({
      message: "Ingredients stock and market logs reset successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const ingredientControllers = {
  getAll,
  getOneById,
  resetIngredientsStockAndMarketLogs,
};
