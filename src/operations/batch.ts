import { Connection, ResultSetHeader } from "mysql2/promise";
import { mysqlConnect } from "../services/mysql";
import { IBatch } from "../interfaces/batch";

export const createBatch = async (
  name: string,
  yos: number,
  yoe: number
): Promise<ResultSetHeader> => {
  const connection: Connection = await mysqlConnect();
  const query = `Insert into batch(name, yearOfStart, yearOfEnd) values ("${name}", "${yos}", "${yoe}")`;
  const [result] = await connection.query<ResultSetHeader>(query);
  return result;
};

export const getAllBatch = async (): Promise<IBatch[] | null> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<IBatch[]>(
    "Select * from batch order by createdAt desc"
  );
  return result;
};
