import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.Mongo_Url; // ✅ this exists in your .env
  

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (error) {
    throw new Error("❌ MongoDB connection failed: " + error.message);
  }
};
