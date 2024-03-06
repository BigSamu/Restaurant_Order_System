import { Recipe, Ingredient } from "../models/index.js";
import { messageBrokerService } from "../services/index.js";

import { getSocketConnection } from "../config/index.js";

let orderId = 1;

const addNew = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    const newOrder =
      recipes[Math.floor(Math.random() * recipes.length)].toObject();
    newOrder["status"] = "pending";
    newOrder["orderId"] = orderId++;

    await messageBrokerService.sendOrderToCheckIngredients(newOrder);

    res.status(200).json({
      message: `Order for '${newOrder.name}' succesfully sent for ingredients check to warehouse service`,
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

const confirmOrder = async (req, res) => {
  const { order } = req.body;
  try {
    console.log(
      `Recived confirmation from warehouse service with sufficient ingredients for it.`
    );

    // Prepare order and update ingredients stock
    console.log(`Starting to prepare order '${order.name}...`);
    for (const ingredient of order.ingredients) {
      await Ingredient.findOneAndUpdate(
        { name: ingredient.name },
        { $inc: { available: -ingredient.quantity } },
        { new: true } // If you want to see the updated document
      );
    }
    const ioKitchen = getSocketConnection();
    ioKitchen.emit("ingredients_consumed", await Ingredient.find());
    console.log(`Order '${order.name}' is ready for delivery`);

    // Send order ready event to UI
    order.status = "ready";
    ioKitchen.emit("order_ready", order);

    // Send confirmation to warehouse service
    res.status(200).json({
      message: `Confirmation to prepare order '${order.name}' recieved from warehouse service`,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const orderControllers = {
  addNew,
  confirmOrder,
};
