import winston from "winston";
import path from "path";
import { ORDERS_LOGS_FILE_PATH } from "./constants.config.js";

let ordersLogger = null;

export const setupOrdersLogger = () => {
  if (ordersLogger) return ordersLogger;
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.printf(({ timestamp, message }) => {
        return `${timestamp} - ${message}`;
      })
    ),
    defaultMeta: { service: "kitchen-service" },
    transports: [
      // File transport for logging to a file
      new winston.transports.File({
        filename: ORDERS_LOGS_FILE_PATH,
      }),
    ],
  });

  ordersLogger = logger;
};

export const getOrdersLogger = () => {
  if (!ordersLogger) throw new Error("Orders logger not initialized.");
  return ordersLogger;
};
