import { Router } from "express";
import addProduct from "../controllers/product.controllers/addProduct.ts";
import updateProduct from "../controllers/product.controllers/updateProduct.ts";
import fetchProducts from "../controllers/product.controllers/fetchProducts.ts";
import deleteProduct from "../controllers/product.controllers/deleteProduct.ts";
import getProduct from "../controllers/product.controllers/getProduct.ts";
import createOrder from "../controllers/product.controllers/createOrder.ts";
import fetchAllOrders from "../controllers/product.controllers/fetchAllOrders.ts";
import getOrder from "../controllers/product.controllers/getOrder.ts";
const productRouter = Router();

productRouter.get("/", fetchProducts);
productRouter.get("/:id", getProduct);
productRouter.get("/:id", getOrder);
productRouter.post("/add", addProduct);
productRouter.post("/order", createOrder);
productRouter.put("/update/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/orders", fetchAllOrders);

export default productRouter;
