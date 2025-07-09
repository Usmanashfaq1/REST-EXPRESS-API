import express from "express";
import userRoutes from "./users.routes.js";
import productRoutes from "./products.routes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);

export default router;
