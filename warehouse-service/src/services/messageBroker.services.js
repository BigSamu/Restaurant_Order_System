// Assuming this is in a service file within the warehouse-service

import { Ingredient } from "../models/index.js";
import { getMessageBrokerChannel } from "../config/index.js";
import {
  SERVICE_NAME,
  INGREDIENTS_CHECK_QUEUE,
} from "../config/constants.config.js";

export const startOrderIngredientsCheckConsumer = async () => {
  try {
    const channel = getMessageBrokerChannel();
    console.log(
      `${SERVICE_NAME} service waiting for orders in '${INGREDIENTS_CHECK_QUEUE}' queue...`
    );
    channel.consume(
      INGREDIENTS_CHECK_QUEUE,
      async (message) => {
        if (message === null) {
          console.log(`${SERVICE_NAME} Empty message`);
          return;
        }
        const order = JSON.parse(message.content.toString());
        console.log(
          `${SERVICE_NAME} received order for ingredients check for '${order.name}'`
        );

        channel.ack(message); // Acknowledge the message has been processed
      },
      {
        noAck: false, // Do not automatically acknowledge messages
      }
    );
  } catch (error) {
    console.error(
      `Failed to consume messages from '${INGREDIENTS_CHECK_QUEUE}' queue:`,
      error
    );
    throw err;
  }
};
