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
exports.getUserFromEmail = exports.isExistingUser = void 0;
const { mysqlConnect } = require("../services/mysql");
const isExistingUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield mysqlConnect();
    const [result] = yield connection.query(`select count(*) as count from users where email = "${email}" and password = "${password}"`);
    return result[0].count !== 0;
});
exports.isExistingUser = isExistingUser;
const getUserFromEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield mysqlConnect();
    const [result] = yield connection.query(`select * from users where email="${email}"`);
    return result.length > 0 ? result[0] : null;
});
exports.getUserFromEmail = getUserFromEmail;
