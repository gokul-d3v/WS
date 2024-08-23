import { Request, Response } from "express";
import { Batch } from "../models/batch_model";
import { hashPassword } from "../utils/password";
import { Types } from "mongoose";

export const createBatch = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, password } = req.body;
  try {
    if (!name || !password) {
      res.status(404).json({ message: "name and password are required" });
    }

    const isExist = await Batch.findOne({ name: name });
    if (isExist) {
      res.status(400).json({ message: "batch name already exists" });
      return;
    }

    const pass = await hashPassword(password);
    const batch = Batch.create({
      name: name,
      password: pass,
    });
    (await batch).save;
    res.status(201).json({ message: "batch successfully created" });
  } catch (error) {
    res.status(500).json({ message: "server error", err: error });
  }
};

export const deleteBatch = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res
        .status(404)
        .json({ statusCode: 404, status: "error", message: "id is required" });
      return;
    }
    const isExist = await Batch.findOneAndDelete({
      _id: new Types.ObjectId(String(id)),
    });
    if (!isExist) {
      res
        .status(404)
        .json({ statusCode: 404, status: "error", message: "Batch not found" });
      return;
    }
    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Batch deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "internal server error",
      message: (error as Error).message,
    });
  }
};
