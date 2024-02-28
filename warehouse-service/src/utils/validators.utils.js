import { Ingredient } from "../models/index.js";

export const areEnoughIngredientsInWarehouse = async (order) => {
  const { ingredients: ingredientsOrder } = order;
  const ingredientsOrderNames = ingredientsOrder.map(
    (ingredient) => ingredient.name
  );
  const ingredientsWarehouse = await Ingredient.find({
    name: { $in: ingredientsOrderNames },
  });
  for (const ingredientWarehouse of ingredientsWarehouse) {
    const ingredientOrder = ingredientsOrder.find(
      (ingredient) => ingredient.name === ingredientWarehouse.name
    );
    if (ingredientWarehouse.available < ingredientOrder.quantity) {
      console.log(
        `${SERVICE_NAME} ingredient '${ingredientWarehouse.name}' are not enough in warehouse: current '${ingredientWarehouse.available}', required '${ingredientOrder.quantity}'`
      );
      return false;
    }
  }
  return true;
};
