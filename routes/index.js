import express from "express";
import userRoutes from "./users.routes.js";
import productRoutes from "./products.routes.js";
import authRoutes from "./auth.routes.js";
import requireAuth from "../middlewares/authMiddleware.js";
// using auth middleware here bcz all my routes are protected
// there is no specfic protected and public routes in users and products
const router = express.Router();

router.use("/users",requireAuth, userRoutes);
router.use("/products",requireAuth, productRoutes);
router.use("/auth",authRoutes);

export default router;
