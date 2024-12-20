import {
  ICreateStudent,
  IStudent,
  IStudentWithBatchNo,
} from "../interfaces/student";
import { mysqlConnect } from "../services/mysql";
import { ResultSetHeader } from "mysql2";
import { Connection, RowDataPacket } from "mysql2/promise";

export const createStudent = async (
  data: ICreateStudent
): Promise<ResultSetHeader> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<ResultSetHeader>(
    "insert into student(rollNo, institute, address, batch, mobileNo, emailId, firstName, middleName, lastName, pincode, district, state, gender, dateOfBirth) value (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      data.rollNo,
      data.institute,
      data.address,
      data.batch,
      data.mobileNo,
      data.emailId,
      data.firstName,
      data.middleName,
      data.lastName,
      data.pincode,
      data.district,
      data.state,
      data.gender,
      data.dateOfBirth,
    ]
  );
  return result;
};

export const getAllStudent = async (): Promise<
  IStudentWithBatchNo[] | null
> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<IStudentWithBatchNo[]>(
    "Select student.*, batch.name as batchName from student inner join batch on student.batch=batch.id order by createdAt desc"
  );
  return result.length > 0 ? result : null;
};

export const getStudentFromBatch = async (
  batch: number
): Promise<IStudent[] | null> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<IStudent[]>(
    `Select * from student where batch = ${batch} order by rollNo asc`
  );
  return result.length > 0 ? result : null;
};
