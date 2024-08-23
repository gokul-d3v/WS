"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdmin = void 0;
const mongoose_1 = require("mongoose");
const superAdminSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["batch", "admin", "super admin"],
        default: "super admin",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.SuperAdmin = (0, mongoose_1.model)("SuperAdmin", superAdminSchema);
