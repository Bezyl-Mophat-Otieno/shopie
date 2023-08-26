import dotenv from "dotenv";
import { dbConnection } from "./config/db.js";
import cors from "cors";
dotenv.config();
import express from "express";
import { json } from "express";
import userRoutes from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
const app = express();
app.use(cors());
app.use(json());
const PORT = process.env.PORT || 5000;
// Endpoints for my api
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/products/", productRouter);
app.use("/api/v1/orders/", orderRouter);
app.listen(PORT, async () => {
  await dbConnection();
  console.log(`Server running on port ${PORT}`);
});
