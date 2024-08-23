import { Request, Response } from "express";
import { Batch } from "../models/batch_model";
import { comparePassword } from "../utils/password";
import { generateToken } from "../configs/jwt";
import { Admin } from "../models/admin_model";
import { generateOTP, sendOtp } from "../services/otp_service";
import { SuperAdmin } from "../models/super_admin_model";

// batch logging
export const batchLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, password } = req.body;

  try {
    const isExist = await Batch.findOne({ name: name });

    if (!isExist) {
      res.status(404).json({ message: "batch not found" });
      return;
    }

    const isPassword = await comparePassword(isExist.password, password);

    if (!isPassword) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = generateToken({ id: isExist.id, role: isExist.role });

    res.status(200).json({ message: "success", token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "server error", error: (error as Error).message });
    return;
  }
};

// for login form
export const adminLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { phone } = req.body;
  try {
    const isAdmin = await Admin.findOne({ phone: phone });
    if (!isAdmin) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    const otp: string = generateOTP();

    if (otp) {
      isAdmin.otp = otp;
      isAdmin.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      await isAdmin.save();
    }
    await sendOtp(phone, otp);
    res.status(200).json({ message: "success", otp: otp });
  } catch (error) {
    res
      .status(500)
      .json({ message: "server error", error: (error as Error).message });
    return;
  }
};

// verify the otp

export const AdminOtpVerification = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { phone, otp } = req.body;

  try {
    const isAdmin = await Admin.findOne({
      phone: phone,
      otp: otp,
      otpExpires: { $gt: new Date() },
    });

    if (!isAdmin) {
      res.status(401).json({ message: "Invalid OTP" });
      return;
    }

    isAdmin.otp = undefined;
    isAdmin.otpExpires = undefined;
    await isAdmin.save();

    const token = generateToken({ id: isAdmin.id, role: isAdmin.role });
    res.status(200).json({ message: "success", token: token });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "server error", error: (error as Error).message });
    return;
  }
};

// superAdmin Login
export const superAdminLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;
  try {
    const isExist = await SuperAdmin.findOne({
      username: username,
      password: password,
    });

    if (!isExist) {
      res.status(404).json({ message: "Super Admin not found" });
      return;
    }
    const token = generateToken({ id: isExist.id, role: isExist.role });
    res.status(200).json({ message: "success", token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "server error", error: (error as Error).message });
    return;
  }
};

export const batchLogout = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    req.headers.authorization = undefined;
    res.status(200).json({ message: "success" });
  } catch (error) {}
};
