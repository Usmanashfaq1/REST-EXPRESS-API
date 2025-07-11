// ----- Global Crash Handlers -----
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});


// imports

import express from "express";
import dotenv from "dotenv/config";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import routeIndex from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173", // for local dev
      "https://crypto-coin-price-track.netlify.app", // your deployed frontend
    ],
    credentials: true,
  })
); // allow everything
const PORT = process.env.PORT || 5000;


// --- MIDDLEWARES ---

// 1. Log incoming HTTP requests
app.use(morgan("dev"));

// 2. Parse incoming JSON requests
app.use(express.json());

// parse cookies
app.use(cookieParser());

// 3. Custom middleware (for fun or debugging)
app.use((req, res, next) => {
  console.log("hey you meet me again wow! okay now go to next door");
  next();
});

// --- ROUTES ---
app.use("/api", routeIndex); // All API routes go through routeIndex

// --- 404 Not Found Handler (Optional but good) ---
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// --- GLOBAL ERROR HANDLER ---
app.use(errorHandler);

// --- START SERVER ---
const startServer = async () => {
  try {
    await connectDB(); // Wait for MongoDB connection

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to DB:", error.message);
    process.exit(1); // Exit the app with failure code
  }
};

startServer(); // Start the app
