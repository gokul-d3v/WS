import dotenv from "dotenv";
dotenv.config();

export const configs = {
  mongo_uri: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET_KEY,
  fast2sms: process.env.FAST2SMS,
};
