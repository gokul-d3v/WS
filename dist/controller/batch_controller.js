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
exports.deleteBatch = exports.createBatch = void 0;
const batch_model_1 = require("../models/batch_model");
const password_1 = require("../utils/password");
const mongoose_1 = require("mongoose");
const createBatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    try {
        if (!name || !password) {
            res.status(404).json({ message: "name and password are required" });
        }
        const isExist = yield batch_model_1.Batch.findOne({ name: name });
        if (isExist) {
            res.status(400).json({ message: "batch name already exists" });
            return;
        }
        const pass = yield (0, password_1.hashPassword)(password);
        const batch = batch_model_1.Batch.create({
            name: name,
            password: pass,
        });
        (yield batch).save;
        res.status(201).json({ message: "batch successfully created" });
    }
    catch (error) {
        res.status(500).json({ message: "server error", err: error });
    }
});
exports.createBatch = createBatch;
const deleteBatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res
                .status(404)
                .json({ statusCode: 404, status: "error", message: "id is required" });
            return;
        }
        const isExist = yield batch_model_1.Batch.findOneAndDelete({
            _id: new mongoose_1.Types.ObjectId(String(id)),
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
    }
    catch (error) {
        res.status(500).json({
            statusCode: 500,
            status: "internal server error",
            message: error.message,
        });
    }
});
exports.deleteBatch = deleteBatch;
