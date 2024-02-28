import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  ingredients: [
    {
      _id: false,
      ingredient: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

export const Recipe = mongoose.model("Recipe", recipeSchema);
