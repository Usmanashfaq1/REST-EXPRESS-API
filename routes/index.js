import express from "express";
import userRoutes from "./users.routes.js";
import productRoutes from "./products.routes.js";
import authRoutes from "./auth.routes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/auth",authRoutes);

export default router;
