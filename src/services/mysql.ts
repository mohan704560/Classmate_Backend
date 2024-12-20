import { ConnectionOptions } from "mysql2";
import mysql, { Connection } from "mysql2/promise";

let connection: Connection | null = null;
const mysqlConnect = async (): Promise<Connection> => {
  if (!connection) {
    try {
      const access: ConnectionOptions = {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
      };
      connection = await mysql.createConnection(access);
      console.log("Database is connected successfully");
    } catch (error) {
      console.error("Error while connecting to the database", error);
      throw error;
    }
  }
  return connection;
};

export { mysqlConnect };
