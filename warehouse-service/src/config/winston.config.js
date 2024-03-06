import winston from "winston";
import path from "path";

let marketLogger = null;

export const setupMarketLogger = () => {
  if (marketLogger) return marketLogger;
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
        filename: path.resolve(process.cwd(), `./logs/market.log`),
      }),
    ],
  });

  marketLogger = logger;
};

export const getMarketLogger = () => {
  if (!marketLogger) throw new Error("Market logger not initialized.");
  return marketLogger;
};
