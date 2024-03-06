import { Ingredient } from "../models/index.js";

import { getMessageBrokerChannel } from "../config/index.js";
import { areEnoughSuppliesInWarehouseForIngredient } from "../utils/index.js";
import { kitchenService, marketService } from "./index.js";

import { getSocketConnection } from "../config/index.js";

import {
  SERVICE_NAME,
  INGREDIENTS_CHECK_QUEUE,
} from "../config/constants.config.js";

const startOrderIngredientsCheckConsumer = async () => {

  try {
    const channel = getMessageBrokerChannel();
    console.log(
      `${SERVICE_NAME} service waiting for orders in '${INGREDIENTS_CHECK_QUEUE}' queue...`
    );
    channel.consume(
      INGREDIENTS_CHECK_QUEUE,
      async (message) => {
        if (message === null) {
          console.log(`Empty message`);
          return;
        }

        // Parse message from message broker
        const order = JSON.parse(message.content.toString());
        console.log(
          `${SERVICE_NAME} service received order for ingredients check for '${order.name}'`
        );

        // Go to the market to buy missing ingredients
        let orderReady = false;
        while (!orderReady) {
          for (const ingredient of order.ingredients) {
            while (
              (await areEnoughSuppliesInWarehouseForIngredient(
                ingredient.name,
                ingredient.quantity
              )) === false
            ) {
              console.log(
                `${SERVICE_NAME} does not contain enough '${ingredient.name}' to prepare '${order.name}' order. Going to market to buy missing ingredients...`
              );
              await marketService.buyIngredient(ingredient, order);
            }
          }
          orderReady = true;
          console.log(
            `${SERVICE_NAME} contains enough ingredients for '${order.name}'. Sending confirmation to kitchen service...`
          );
          kitchenService.confirmOrder(order);
        }

        // Acknowledge message
        channel.ack(message);
      },
      {
        noAck: false, // Do not automatically acknowledge messages
      }
    );
  } catch (err) {
    console.error(
      `Failed to consume messages from '${INGREDIENTS_CHECK_QUEUE}' queue:`,
      err
    );
  }
};

export const messageBrokerService = {
  startOrderIngredientsCheckConsumer,
};

// let missingIngredients = await getMissingIngredientsForOrder(order);
// const ioWarehouse = getSocketConnection();
// while (missingIngredients.length > 0) {
//   console.log(
//     `${SERVICE_NAME} does not contain enough ingredients to prepare'${order.name}' order. Missing ingredients:`
//   );
//   missingIngredients.forEach((ingredient) => {
//     console.log(
//       `  - ${ingredient.name} -> required: ${ingredient.required}, available: ${ingredient.available}`
//     );
//   });
//   console.log("Going to market to buy missing ingredients...");
//   // Go to the market to buy missing ingredients
//   await marketService.buyIngredients(missingIngredients);
//   missingIngredients = await getMissingIngredientsForOrder(order);
//   ioWarehouse.emit("ingredients_purchased", await Ingredient.find());
// }
