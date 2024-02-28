import express from "express";
import { orderControllers } from "../controllers/index.js";

const orderRouter = express.Router();

orderRouter.post("/orders/new", orderControllers.addNew);

export { orderRouter };