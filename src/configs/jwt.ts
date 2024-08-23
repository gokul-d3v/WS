import jwt from "jsonwebtoken";
import { configs } from "./config";

const secretKey = configs.jwt_secret;

interface jwtPayload {
  id: string;
  role: "batch" | "admin" | "super admin";
}

export const generateToken = (payload: jwtPayload): string => {
  return jwt.sign(payload, secretKey!, { expiresIn: "3d" });
};

export const verifyToken = (token: string): jwtPayload | null => {
  try {
    return jwt.verify(token, secretKey!) as jwtPayload;
  } catch (error) {
    return null;
  }
};
