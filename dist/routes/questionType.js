"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var questionType = express_1.default.Router();
questionType.get("/", (req, res) => {
    res.status(200).send("questionType route");
});
exports.default = questionType;
