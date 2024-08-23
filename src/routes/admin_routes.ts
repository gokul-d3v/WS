import { Router } from "express";
import {
  adminLogin,
  AdminOtpVerification,
} from "../controller/auth_controller";
import { authMiddleware as auth } from "../middleware/auth_middleware";
import { createBatch } from "../controller/batch_controller";

const router = Router();

router.post("/login", adminLogin);
router.post("/verify", AdminOtpVerification);
router.post("/createBatch", auth, createBatch);
export { router as adminRoute };
