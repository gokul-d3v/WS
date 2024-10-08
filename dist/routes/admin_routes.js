"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth_controller");
const auth_middleware_1 = require("../middleware/auth_middleware");
const batch_controller_1 = require("../controller/batch_controller");
const router = (0, express_1.Router)();
exports.adminRoute = router;
router.post("/login", auth_controller_1.adminLogin);
router.post("/verify", auth_controller_1.AdminOtpVerification);
router.post("/createBatch", auth_middleware_1.authMiddleware, batch_controller_1.createBatch);
