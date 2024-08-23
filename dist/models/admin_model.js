"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        default: undefined,
    },
    otpExpires: {
        type: Date,
        default: undefined,
    },
    role: {
        type: String,
        enum: ["batch", "admin", "super admin"],
        default: "admin",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.Admin = (0, mongoose_1.model)("Admin", adminSchema);
