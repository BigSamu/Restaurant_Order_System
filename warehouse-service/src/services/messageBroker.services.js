import { Ingredient } from "../models/index.js";

import {
  getMessageBrokerChannel,
  getMarketLogger,
  getSocketConnection,
} from "../config/index.js";
import { areEnoughSuppliesInWarehouseForOrder } from "../utils/index.js";
import { kitchenService, marketService } from "./index.js";

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

    await channel.prefetch(1);

    channel.consume(
      INGREDIENTS_CHECK_QUEUE,
      async (message) => {
        if (message === null) {
          console.log(`Empty message`);
          return;
        }

        const marketLogger = getMarketLogger();
        const ioWarehouse = getSocketConnection();
        // Parse message from message broker
        const order = JSON.parse(message.content.toString());
        console.log(
          `${SERVICE_NAME} service received order for ingredients check for '${order.name}'`
        );

        // Check if there are enough ingredients in the warehouse
        let enoughSupplies = await areEnoughSuppliesInWarehouseForOrder(order);
        if (!enoughSupplies) {
          console.log(
            `${SERVICE_NAME} does not contain enough ingredients to prepare '${order.name}' order. Going to market to buy missing ingredients...`
          );
          for (const { name, quantity } of order.ingredients) {
            let { available } = await Ingredient.findOne({ name });
            while (available < quantity) {
              let quantitySold = await marketService.buyIngredient(name);
              marketLogger.info(
                `Bought ${quantitySold} '${name}' from market for order #${
                  order.orderId
                } - Dish: '${order.name} \n
                          (Current Stock: ${available}, Required Stock: ${quantity}, Final Stock (before consume): ${
                  available + quantitySold
                })`
              );
              ioWarehouse.emit(
                "ingredients_purchased",
                await Ingredient.find()
              );
              ({ available } = await Ingredient.findOne({ name }));
            }
          }
          enoughSupplies = await areEnoughSuppliesInWarehouseForOrder(order);
        }

        console.log(
          `${SERVICE_NAME} contains enough ingredients for '${order.name}'. Sending confirmation to kitchen service...`
        );
        await kitchenService.confirmOrder(order);
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

const emptyOrdersQueue = async () => {
  const channel = getMessageBrokerChannel();

  try {
    await channel.purgeQueue(INGREDIENTS_CHECK_QUEUE);
    console.log(`Queue ${INGREDIENTS_CHECK_QUEUE} purged successfully.`);
  } catch (error) {
    console.error("Failed to purge the queue:", error);
  }
};

export const messageBrokerService = {
  startOrderIngredientsCheckConsumer,
  emptyOrdersQueue,
};
