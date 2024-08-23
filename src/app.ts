import express, { Application } from "express";
import { connectDB } from "./configs/database";
import cors from "cors";
import { userRoute } from "./routes/batch_routes";
import { adminRoute } from "./routes/admin_routes";
import { superAdminRoute } from "./routes/super_admin_routes";

const app: Application = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use("/", userRoute);
app.use("/admin", adminRoute);
app.use("/super", superAdminRoute);
app.listen(3000, () => console.log("listening ...."));
