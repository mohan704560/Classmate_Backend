import { RowDataPacket } from "mysql2";
import { CountResult, User } from "../interfaces/user";
import { Connection, ResultSetHeader } from "mysql2/promise";

const { mysqlConnect } = require("../services/mysql");

export const isExistingUser = async (
  email: string,
  password: string
): Promise<boolean> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<CountResult[]>(
    `select count(*) as count from users where email = "${email}" and password = "${password}"`
  );
  return result[0].count !== 0;
};

export const getUserFromEmail = async (email: string): Promise<User | null> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<User[]>(
    `select * from users where email="${email}"`
  );
  return result.length > 0 ? result[0] : null;
};

export const forgotPasswordUser = async (
  email: string,
  password: string
): Promise<ResultSetHeader> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<ResultSetHeader>(
    "Update users set password=? where email=?",
    [password, email]
  );
  console.log("result", result);
  return result;
};

export const isExistingEmail = async (email: string): Promise<boolean> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<CountResult[]>(
    `select count(*) as count from users where email = "${email}"`
  );
  return result[0].count !== 0;
};
