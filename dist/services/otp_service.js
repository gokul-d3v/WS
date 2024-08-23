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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = exports.sendOtp = void 0;
const axios_1 = __importDefault(require("axios"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const config_1 = require("../configs/config");
const sendOtp = (phone, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = config_1.configs.fast2sms;
    const response = yield axios_1.default.post("https://www.fast2sms.com/dev/bulkV2", {
        route: "q",
        language: "english",
        flash: 0,
        message: `Your OTP is ${otp}`,
        numbers: phone,
    }, {
        headers: {
            Authorization: `${apiKey}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
});
exports.sendOtp = sendOtp;
const generateOTP = () => {
    return otp_generator_1.default.generate(6, {
        digits: true,
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
    });
};
exports.generateOTP = generateOTP;
