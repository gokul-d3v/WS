import { Router } from "express";
import { superAdminLogin } from "../controller/auth_controller";
import { createAdmin } from "../controller/superAdmin_controller";
import { authMiddleware as auth } from "../middleware/auth_middleware";
import { createBatch, deleteBatch } from "../controller/batch_controller";

const router = Router();

router.post("/login", superAdminLogin);
router.post("/createAdmin", auth, createAdmin);
router.post("/createBatch", auth, createBatch);
router.delete("/deleteBatch/:id", auth, deleteBatch);

export { router as superAdminRoute };
