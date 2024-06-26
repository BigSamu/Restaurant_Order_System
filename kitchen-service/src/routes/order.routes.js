import express from "express";
import { orderControllers } from "../controllers/index.js";

const orderRouter = express.Router();

orderRouter.post("/orders/new", orderControllers.addNew);
orderRouter.post("/orders/confirm", orderControllers.confirmOrder);
orderRouter.get("/orders/reset", orderControllers.resetOrdersIdsAndLogs);

export { orderRouter };
