import { getMessageBrokerChannel } from "../config/index.js";
import { SERVICE_NAME, INGREDIENTS_CHECK_QUEUE } from "../config/index.js";

const sendOrderToCheckIngredients = async (order) => {
  try {
    const channel = getMessageBrokerChannel();
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
  sendOrderToCheckIngredients,
  emptyOrdersQueue,
};
