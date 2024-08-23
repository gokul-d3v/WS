import { Request, Response } from "express";
import { Admin } from "../models/admin_model";
import { Batch } from "../models/batch_model";
import { hashPassword } from "../utils/password";

export const createAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { phone } = req.body;

  try {
    const isExist = await Admin.findOne({ phone: phone });
    if (isExist) {
      res.status(400).json({ message: "phone already exists" });
      return;
    }

    const admin = Admin.create({
      phone: phone,
    });
    (await admin).save;

    res.status(201).json({ message: "admin successfully created" });
  } catch (err) {
    res.status(500).json({ message: "server error", err: err });
  }
};
