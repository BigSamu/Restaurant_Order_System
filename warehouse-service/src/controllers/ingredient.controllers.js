import mongoose from "mongoose";
import { Ingredient } from "../models/index.js";
import { marketService } from "../services/index.js";

const { ObjectId } = mongoose.Types;

const getAll = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

const getOneById = async (req, res, next) => {
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

export const ingredientControllers = {
  getAll,
  getOneById,
};
