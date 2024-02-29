import { getMessageBrokerChannel } from "../config/index.js";
import { SERVICE_NAME, INGREDIENTS_CHECK_QUEUE } from "../config/index.js";

const sendOrderToCheckIngredients = async (order) => {
  try {
    const channel = getMessageBrokerChannel(); // Use the existing channel
    channel.sendToQueue(
      INGREDIENTS_CHECK_QUEUE,
      Buffer.from(JSON.stringify(order))
    );
    console.log(
      `${SERVICE_NAME} service sent order for '${order.name}' to '${INGREDIENTS_CHECK_QUEUE}' queue...`
    );
  } catch (err) {
    console.error(
      `Failed to send order to '${INGREDIENTS_CHECK_QUEUE}' queue:`,
      err
    );
    throw err;
  }
};

export const messageBrokerService = {
  sendOrderToCheckIngredients,
};
