import { Schema, Document, model } from "mongoose";

interface SuperAdmin extends Document {
  username: string;
  password: string;
  role: "batch" | "admin" | "super admin";
  createdAt: Date;
}

const superAdminSchema = new Schema<SuperAdmin>({
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

export const SuperAdmin = model<SuperAdmin>("SuperAdmin", superAdminSchema);
