import { RowDataPacket } from "mysql2";

export interface IBatch extends RowDataPacket {
  id: number;
  name: string;
  yearOfStart: number;
  yearOfEnd: number;
  createdAt: Date;
  updatedAt: Date;
}
