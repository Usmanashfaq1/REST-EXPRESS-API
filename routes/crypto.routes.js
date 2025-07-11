import { Router } from "express";
import getPrices from "../controllers/crypto.controller.js";

const router = Router();

router.get("/prices", getPrices);

export default router;


