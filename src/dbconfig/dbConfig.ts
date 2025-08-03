import mongoose from "mongoose";

const dbConfig = async () => {
  try {
    const mongoURI = process.env.MONGOOSE_CONNECTION || "mongodb://localhost:27017/fallback_db";
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default dbConfig;
