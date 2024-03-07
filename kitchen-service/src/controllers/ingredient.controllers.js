import { Ingredient } from "../models/index.js";
import { getSocketConnection } from "../config/index.js";

const getAll = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();

    res.status(200).json(ingredients);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const ingredientControllers = {
  getAll,
};
