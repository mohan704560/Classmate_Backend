"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var exam = express_1.default.Router();
exam.get("/", (req, res) => {
    res.status(200).send("student route");
});
exports.default = exam;
