import { Router } from "express";
import { batchLogin } from "../controller/auth_controller";

const router = Router();

router.post("/login", batchLogin);

export { router as userRoute };
