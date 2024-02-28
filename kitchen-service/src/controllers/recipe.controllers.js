import mongoose from "mongoose";
import { Recipe } from "../models/index.js";

const { ObjectId } = mongoose.Types;

const getAll = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
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
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const recipeControllers = {
  getAll,
  getOneById
};
