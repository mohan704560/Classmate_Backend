import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  userRole: number;
  institute: number;
}

export interface CountResult extends RowDataPacket {
  count: number;
}

export interface IUserFromJwt {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  userRole: number;
  institute: number;
}
