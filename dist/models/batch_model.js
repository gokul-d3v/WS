"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Batch = void 0;
const mongoose_1 = require("mongoose");
const batchSchema = new mongoose_1.Schema({
    name: {
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
        default: "batch",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.Batch = (0, mongoose_1.model)("Batch", batchSchema);
