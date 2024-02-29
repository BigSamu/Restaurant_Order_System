import mongoose from "mongoose";
import { Recipe, Ingredient } from "../models/index.js";
import { messageBrokerService } from "../services/index.js";

const addNew = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    const newOrder = recipes[Math.floor(Math.random() * recipes.length)];
    await messageBrokerService.sendOrderToCheckIngredients(newOrder);
    res
      .status(200)
      .json({ message: `Order for '${newOrder.name}' succesfully sent for ingredients check to warehouse service` });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

const confirmOrder = async (req, res) => {
  const { order } = req.body;
  try {
    res.status(200).json({
      message: `Confirmation to prepare order '${order.name}' recieved from warehouse service`,
    });
    console.log(
      `Recived confirmation from warehouse service with sufficient ingredients for it. Starting to prepare order '${order.name}...`
    );
    for (const ingredient of order.ingredients) {
      await Ingredient.findOneAndUpdate(
        { name: ingredient.name },
        { $inc: { available: -ingredient.quantity } },
        { new: true } // If you want to see the updated document
      );
    }
    console.log(`Order '${order.name}' is ready for delivery`);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const orderControllers = {
  addNew,
  confirmOrder,
};
