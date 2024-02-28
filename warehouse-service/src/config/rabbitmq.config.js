import amqp from "amqplib";
import {
  SERVICE_NAME,
  MESSAGE_BROKER_USER,
  MESSAGE_BROKER_PASSWORD,
  MESSAGE_BROKER_HOST,
  MESSAGE_BROKER_PORT,
  INGREDIENTS_CHECK_QUEUE
} from "./constants.config.js";

let messageBrokerChannel = null;

const rabbitMQSettings = {
  protocol: "amqp",
  hostname: MESSAGE_BROKER_HOST,
  port: MESSAGE_BROKER_PORT,
  username: MESSAGE_BROKER_USER,
  password: MESSAGE_BROKER_PASSWORD,
};

export const connectMessageBroker = async () => {
  if (messageBrokerChannel) return messageBrokerChannel;

  try {
    const connection = await amqp.connect(rabbitMQSettings);
    const newChannel = await connection.createChannel();

    // Declare the 'ingredients_check' queue
    await newChannel.assertQueue(INGREDIENTS_CHECK_QUEUE, {
      durable: true, // Ensures the queue is not lost even if RabbitMQ restarts
    });

    console.log(
      `${SERVICE_NAME} service established a connection to message broker service and declared '${INGREDIENTS_CHECK_QUEUE}' queue`
    );

    messageBrokerChannel = newChannel;
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
  }
};

export const getMessageBrokerChannel = () => {
  if (!messageBrokerChannel)
    throw new Error("Message broker channel not initialized.");
  return messageBrokerChannel;
};
