import { Connection } from "mysql2/promise";
import { mysqlConnect } from "../services/mysql";
import { IQuestionType } from "../interfaces/questionType";

export const getAllQuestionType = async (): Promise<IQuestionType[]> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<IQuestionType[]>(
    "Select * from questiontype"
  );
  return result;
};

export const getQuestionTypeDetailFromId = async (
  id: number
): Promise<IQuestionType[]> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<IQuestionType[]>(
    `Select * from questiontype where id = ${id}`
  );
  return result;
};
