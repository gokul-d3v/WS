import { Request, Response } from "express";
import { Batch } from "../models/batch_model";
import { hashPassword } from "../utils/password";

export const createBatch = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, password } = req.body;
  try {
    if (!name && !password) {
      res.status(404).json({ message: "name and password are required" });
    }
    const isExist = await Batch.findOne({ name: name, password: password });
    if (!isExist) {
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
): Promise<void> => {};
