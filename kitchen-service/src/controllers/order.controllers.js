import mongoose from "mongoose";
import { Recipe } from "../models/index.js";
import { sendOrderToCheckIngredients } from "../services/index.js";

const addNew = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    const newOrder = recipes[Math.floor(Math.random() * recipes.length)];
    await sendOrderToCheckIngredients(newOrder);
    res
      .status(201)
      .json({ message: "Order succesfully sent for ingredients check" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const orderControllers = {
  addNew,
};
