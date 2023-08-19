import { Router } from "express";
import addProduct from "../controllers/product.controllers/addProduct.js";
import updateProduct from "../controllers/product.controllers/updateProduct.js";
import fetchProducts from "../controllers/product.controllers/fetchProducts.js";
import deleteProduct from "../controllers/product.controllers/deleteProduct.js";
import getProduct from "../controllers/product.controllers/getProduct.js";
const productRouter = Router();

productRouter.get("/", fetchProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/add", addProduct);
productRouter.put("/update/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
