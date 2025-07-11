// routes/products.routes.js
import express from "express";
const router = express.Router();


router.get("/", (req, res) => res.send("All products"));
router.get("/:id", (req, res) => res.send(`Product ${req.params.id}`));

export default router;
