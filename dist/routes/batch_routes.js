"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth_controller");
const router = (0, express_1.Router)();
exports.userRoute = router;
router.post("/login", auth_controller_1.batchLogin);
