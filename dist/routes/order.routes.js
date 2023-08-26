import { Router } from "express";
import fetchAllOrders from "../controllers/product.controllers/fetchAllOrders.js";
import getOrder from "../controllers/product.controllers/getOrder.js";
import createOrder from "../controllers/product.controllers/createOrder.js";
const orderRouter = Router();
orderRouter.get("/", fetchAllOrders);
orderRouter.get("/:id", getOrder);
orderRouter.post("/", createOrder);
export default orderRouter;
