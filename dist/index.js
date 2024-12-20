"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const student_1 = __importDefault(require("./routes/student"));
const exam_1 = __importDefault(require("./routes/exam"));
const batch_1 = __importDefault(require("./routes/batch"));
const questionType_1 = __importDefault(require("./routes/questionType"));
const dotenv = __importStar(require("dotenv"));
const app = (0, express_1.default)();
const port = process.env.port || 5000;
dotenv.config();
const allowedOrigins = [
    "http://localhost:3000",
    "http://192.168.0.105:3000",
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/user", user_1.default);
app.use("/api/student", student_1.default);
app.use("/api/batch", batch_1.default);
app.use("/api/exam", exam_1.default);
app.use("/api/questionType", questionType_1.default);
app.get("/", (req, res) => {
    console.log("process.env.user :>> ", process.env.user);
    res.send("Hello, TypeScript Express!");
});
app.listen(port, (error) => {
    if (error) {
        console.error("Server is unable to start.", error);
    }
    console.log("Server is running on " + port);
});
