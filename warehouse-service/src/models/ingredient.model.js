import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    available: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Ingredient = mongoose.model("Ingredient", ingredientSchema);
