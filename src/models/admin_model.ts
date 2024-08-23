import { Schema, Document, model } from "mongoose";

interface Admin extends Document {
  phone: string;
  otp: string | undefined;
  otpExpires?: Date | undefined;
  role: "batch" | "admin" | "super admin";
  createdAt: Date;
}

const adminSchema = new Schema<Admin>({
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

export const Admin = model<Admin>("Admin", adminSchema);
