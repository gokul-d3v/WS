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
exports.createAdmin = void 0;
const admin_model_1 = require("../models/admin_model");
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.body;
    try {
        const isExist = yield admin_model_1.Admin.findOne({ phone: phone });
        if (isExist) {
            res.status(400).json({ message: "phone already exists" });
            return;
        }
        const admin = admin_model_1.Admin.create({
            phone: phone,
        });
        (yield admin).save;
        res.status(201).json({ message: "admin successfully created" });
    }
    catch (err) {
        res.status(500).json({ message: "server error", err: err });
    }
});
exports.createAdmin = createAdmin;
