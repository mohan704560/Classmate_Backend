import { RowDataPacket } from "mysql2";

export interface ICourse extends RowDataPacket {
  id: number;
  name: string;
  fees: number;
  subject: string[] | string;
  createdAt: Date;
  updatedAt: Date;
}
