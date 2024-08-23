import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../configs/jwt";

interface User {
  id: string;
  role: string;
}
interface authReq extends Request {
  user?: User;
}

// check the token
export const authMiddleware = (
  req: authReq,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: "Invalid token." });
    return;
  }
  req.user = decoded;
  next();
};

// auth the role
export const auth = (roles: string[]) => {
  return (req: authReq, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        message: "Access denied. You don't have the required role.",
      });
      return;
    }
    next();
  };
};
