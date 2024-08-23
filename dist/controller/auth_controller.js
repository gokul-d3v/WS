"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchLogout = exports.superAdminLogin = exports.AdminOtpVerification = exports.adminLogin = exports.batchLogin = void 0;
const batch_model_1 = require("../models/batch_model");
const password_1 = require("../utils/password");
const jwt_1 = require("../configs/jwt");
const admin_model_1 = require("../models/admin_model");
const otp_service_1 = require("../services/otp_service");
const super_admin_model_1 = require("../models/super_admin_model");
// batch logging
const batchLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    try {
        const isExist = yield batch_model_1.Batch.findOne({ name: name });
        if (!isExist) {
            res.status(404).json({ message: "batch not found" });
            return;
        }
        const isPassword = yield (0, password_1.comparePassword)(isExist.password, password);
        if (!isPassword) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }
        const token = (0, jwt_1.generateToken)({ id: isExist.id, role: isExist.role });
        res.status(200).json({ message: "success", token: token });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "server error", error: error.message });
        return;
    }
});
exports.batchLogin = batchLogin;
// for login form
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.body;
    try {
        const isAdmin = yield admin_model_1.Admin.findOne({ phone: phone });
        if (!isAdmin) {
            res.status(404).json({ message: "Admin not found" });
            return;
        }
        const otp = (0, otp_service_1.generateOTP)();
        if (otp) {
            isAdmin.otp = otp;
            isAdmin.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
            yield isAdmin.save();
        }
        yield (0, otp_service_1.sendOtp)(phone, otp);
        res.status(200).json({ message: "success", otp: otp });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "server error", error: error.message });
        return;
    }
});
exports.adminLogin = adminLogin;
// verify the otp
const AdminOtpVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, otp } = req.body;
    try {
        const isAdmin = yield admin_model_1.Admin.findOne({
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
        yield isAdmin.save();
        const token = (0, jwt_1.generateToken)({ id: isAdmin.id, role: isAdmin.role });
        res.status(200).json({ message: "success", token: token });
        return;
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "server error", error: error.message });
        return;
    }
});
exports.AdminOtpVerification = AdminOtpVerification;
// superAdmin Login
const superAdminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const isExist = yield super_admin_model_1.SuperAdmin.findOne({
            username: username,
            password: password,
        });
        console.log(isExist);
        if (!isExist) {
            res.status(404).json({ message: "Super Admin not found" });
            return;
        }
        const token = (0, jwt_1.generateToken)({ id: isExist.id, role: isExist.role });
        res.status(200).json({ message: "success", token: token });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "server error", error: error.message });
        return;
    }
});
exports.superAdminLogin = superAdminLogin;
const batchLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.headers.authorization = undefined;
        res.status(200).json({ message: "success" });
    }
    catch (error) { }
});
exports.batchLogout = batchLogout;
