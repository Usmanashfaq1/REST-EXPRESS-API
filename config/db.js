import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.Mongo_Url;

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, {

    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    // Just throw the error to let server.js decide
    throw new Error("❌ MongoDB connection failed: " + error.message);
  }
};

