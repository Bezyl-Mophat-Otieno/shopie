import { Router } from "express";
import fetchAllOrders from "../controllers/product.controllers/fetchAllOrders.ts";
import getOrder from "../controllers/product.controllers/getOrder.ts";
import createOrder from "../controllers/product.controllers/createOrder.ts";

const orderRouter = Router();

orderRouter.get("/", fetchAllOrders);
orderRouter.get("/:id", getOrder);
orderRouter.post("/", createOrder);
export default orderRouter;
