import { Ingredient } from "../models/index.js";

export const getMissingIngredientsForOrder = async (order) => {
  const missingIngredients = [];
  const { ingredients: ingredientsInOrder } = order;
  const ingredientsInWarehouseForOrder = await Ingredient.find({
    name: { $in: ingredientsInOrder.map((ingredient) => ingredient.name) },
  });
  for (const ingredientInWarehouseForOrder of ingredientsInWarehouseForOrder) {
    const ingredientInOrder = ingredientsInOrder.find(
      (ingredient) => ingredient.name === ingredientInWarehouseForOrder.name
    );

    if (ingredientInWarehouseForOrder.available < ingredientInOrder.quantity) {
      missingIngredients.push({
        name: ingredientInOrder.name,
        required: ingredientInOrder.quantity,
        available: ingredientInWarehouseForOrder.available,
      });
    }
  }
  return missingIngredients;
};

export const areEnoughSuppliesInWarehouseForIngredient = async (
  ingredient,
  quantity
) => {
  const ingredientWarehouse = await Ingredient.findOne({ name: ingredient });
  return ingredientWarehouse.available >= quantity;
};
