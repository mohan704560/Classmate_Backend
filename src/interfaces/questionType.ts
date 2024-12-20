import { RowDataPacket } from "mysql2";

export interface IQuestionType extends RowDataPacket {
  id: number;
  type: string;
}
