import { ICourse } from "../interfaces/course";
import { mysqlConnect } from "../services/mysql";
import { Connection, ResultSetHeader } from "mysql2/promise";

export const createCourse = async (data: {
  name: string;
  fees: number;
  subject: string[];
}): Promise<ResultSetHeader> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<ResultSetHeader>(
    "Insert into courses(name, fees) value (?,?)",
    [data.name, data.fees]
  );
  const subjectArray: any = [];
  data.subject.map((subject) => {
    subjectArray.push([result.insertId, subject]);
  });
  console.log("subjectArray :>> ", subjectArray);
  const [courseResult] = await connection.query<ResultSetHeader>(
    "Insert into subjects(course, name) value ?",
    [subjectArray]
  );
  return courseResult;
};

export const fetchAllCourse = async (): Promise<ICourse[]> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<ICourse[]>(
    "Select courses.id, courses.name, courses.fees, courses.createdAt, courses.updatedAt, GROUP_CONCAT(subjects.name) as subject from courses inner join subjects on subjects.course = courses.id group by courses.id, courses.name, courses.fees, courses.createdAt, courses.updatedAt"
  );

  result.map((course: any, index: number) => {
    result[index].subject = (result[index].subject as string).split(",");
  });
  return result;
};
