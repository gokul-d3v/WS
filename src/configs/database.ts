import mongoose from "mongoose";
import { configs } from "../configs/config";
const URI: string = configs.mongo_uri || " ";

export const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("database connection is established");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};
