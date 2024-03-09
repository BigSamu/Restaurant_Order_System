import { Ingredient } from "../models/index.js";

export const areEnoughSuppliesInWarehouseForOrder = async (order) => {
  const ingredientNames = order.ingredients.map(
    (ingredient) => ingredient.name
  );
  const ingredientsOrder = order.ingredients;
  const ingredientsInWarehouseForOrder = await Ingredient.find({
    name: { $in: ingredientNames },
  });

  const areEnoughIngredients = ingredientsOrder.every((ingredientOrder) => {
    const ingredientWarehouse = ingredientsInWarehouseForOrder.find(
      (ingredient) => ingredient.name === ingredientOrder.name
    );
    return ingredientWarehouse.available >= ingredientOrder.quantity;
  });

  return areEnoughIngredients;
};
