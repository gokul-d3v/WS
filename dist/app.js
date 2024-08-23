"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./configs/database");
const cors_1 = __importDefault(require("cors"));
const batch_routes_1 = require("./routes/batch_routes");
const admin_routes_1 = require("./routes/admin_routes");
const super_admin_routes_1 = require("./routes/super_admin_routes");
const app = (0, express_1.default)();
(0, database_1.connectDB)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", batch_routes_1.userRoute);
app.use("/admin", admin_routes_1.adminRoute);
app.use("/super", super_admin_routes_1.superAdminRoute);
app.listen(3000, () => console.log("listening ...."));
