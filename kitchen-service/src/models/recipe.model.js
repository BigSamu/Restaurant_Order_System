import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    ingredients: [
      {
        _id: false,
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
