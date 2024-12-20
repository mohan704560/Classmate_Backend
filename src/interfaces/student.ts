import { RowDataPacket } from "mysql2";

export interface IStudent extends RowDataPacket {
  id: number;
  rollNo: number;
  institute: number;
  address: string;
  batch: number;
  mobileNo: string;
  emailId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  pincode: number;
  district: string;
  state: string;
  Gender: string;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateStudent extends RowDataPacket {
  rollNo: number;
  institute: number;
  address: string;
  batch: number;
  mobileNo: string;
  emailId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  pincode: number;
  district: string;
  state: string;
  Gender: string;
  dateOfBirth: Date;
}

export interface IStudentWithBatchNo extends RowDataPacket{
  batchName : string
}
