import { Router } from "express";
import addProduct from "../controllers/product.controllers/addProduct.ts";
import updateProduct from "../controllers/product.controllers/updateProduct.ts";
import fetchProducts from "../controllers/product.controllers/fetchProducts.ts";
import deleteProduct from "../controllers/product.controllers/deleteProduct.ts";
import getProduct from "../controllers/product.controllers/getProduct.ts";
const productRouter = Router();

productRouter.get("/", fetchProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/add", addProduct);
productRouter.put("/update/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
