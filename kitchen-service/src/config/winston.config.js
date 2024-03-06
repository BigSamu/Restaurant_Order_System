import winston from "winston";
import path from "path";

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

        return `${timestamp} - ${message}`;       })
    ),
    defaultMeta: { service: "kitchen-service" },
    transports: [
      // File transport for logging to a file
      new winston.transports.File({
        filename: path.resolve(process.cwd(), `./logs/orders.log`),
      }),
    ],
  });

  ordersLogger = logger;
};

export const getOrdersLogger = () => {
  if (!ordersLogger) throw new Error("Orders logger not initialized.");
  return ordersLogger;
};
