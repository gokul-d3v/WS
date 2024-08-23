import { Schema, Document, model } from "mongoose";

interface Batch extends Document {
  name: string;
  password: string;
  role: "batch" | "admin" | "super admin";
  createdAt: Date;
}

const batchSchema = new Schema<Batch>({
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

export const Batch = model<Batch>("Batch", batchSchema);
