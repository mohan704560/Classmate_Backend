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
exports.mysqlConnect = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
let connection = null;
const mysqlConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!connection) {
        try {
            const access = {
                host: process.env.host,
                user: process.env.user,
                password: process.env.password,
                database: process.env.database,
            };
            connection = yield promise_1.default.createConnection(access);
            console.log("Database is connected successfully");
        }
        catch (error) {
            console.error("Error while connecting to the database", error);
            throw error;
        }
    }
    return connection;
});
exports.mysqlConnect = mysqlConnect;
