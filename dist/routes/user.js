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
const express_1 = __importDefault(require("express"));
const user_1 = require("../operations/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user = express_1.default.Router();
user.get("/", (req, res) => {
    res.status(200).send("user route");
});
user.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userType, email, password } = req.body;
        let userDetail = null;
        if (userType === "student") {
            // userDetail = await getStudentFromEmail(email);
        }
        else {
            userDetail = yield (0, user_1.getUserFromEmail)(email);
        }
        if (!userDetail) {
            res
                .status(400)
                .send({ data: null, message: "User credentials not found" });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, userDetail.password);
        if (isMatch) {
            //   delete userDetail.password;
            const token = jsonwebtoken_1.default.sign({
                data: userDetail,
            }, process.env.jwtSecretToken, { expiresIn: 365 * 24 * 60 * 60 });
            res.status(200).send({
                data: { token, userDetail },
                message: "User credentials found successfully",
            });
        }
        else {
            res.status(400).send({
                data: null,
                message: "Email or password does not match.",
            });
        }
    }
    catch (error) {
        res.status(500).send({
            data: error,
            message: "Internal Server Error",
        });
    }
}));
exports.default = user;
