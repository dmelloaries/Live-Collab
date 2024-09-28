import mongoose from "mongoose";
import { config } from "dotenv";
config();

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));
