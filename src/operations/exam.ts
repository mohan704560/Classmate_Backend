import { Connection } from "mysql2/promise";
import {
  ICreateExamDetail,
  IExamDetail,
  IExamDetailWithBatchName,
  IExamMarks,
  IExamStatic,
  IExamWithStudentDetail,
  IExamWithStudentDetailExamStatic,
} from "../interfaces/exam";
import { mysqlConnect } from "../services/mysql";
import { ResultSetHeader } from "mysql2";

export const createExam = async (
  data: ICreateExamDetail
): Promise<ResultSetHeader> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<ResultSetHeader>(
    "Insert into examdetail(testDate, name, subject, testType, passingMark, totalMark, batch, institute, startTime, endTime, testStatus) value (?,?,?,?,?,?,?,?,?,?,?)",
    [
      data.testDate,
      data.name,
      data.subject,
      data.testType,
      data.passingMark,
      data.totalMark,
      data.batch,
      data.institute,
      data.startTime,
      data.endTime,
      data.testStatus,
    ]
  );
  return result;
};

export const getAllExam = async (): Promise<
  IExamDetailWithBatchName[] | null
> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<IExamDetailWithBatchName[]>(
    "Select examdetail.*, batch.name as batchName from examdetail left outer join batch on batch.id=examdetail.batch order by examdetail.createdAt desc"
  );
  return result;
};

export const fetchExamDetailById = async (
  id: number
): Promise<IExamDetailWithBatchName[] | null> => {
  const connection = await mysqlConnect();
  const [result] = await connection.query<IExamDetailWithBatchName[]>(
    `Select examdetail.*, batch.name as batchName from examdetail left outer join batch on batch.id=examdetail.batch where examDetail.id=${id}`
  );
  return result;
};

export const addExamMarks = async (marks: {
  examMarks: IExamMarks[];
  examDetail: IExamDetail;
}): Promise<ResultSetHeader> => {
  const connection: Connection = await mysqlConnect();
  const tempData: any[] = [];
  marks.examMarks.map((mark) => {
    tempData.push([
      mark.id,
      marks.examDetail.id,
      mark.marksObtain,
      mark.team,
      mark.absent,
      mark.correctAnswer,
      mark.incorrectAnswer,
      mark.nonAttempt,
      mark.isCaptain,
    ]);
  });
  const [result] = await connection.query<ResultSetHeader>(
    "Insert into exam (student, test, marksObtain, team, absent, correctanswer, incorrectAnswer, nonattemptQuestion, isCaptain) VALUES ?",
    [tempData]
  );
  return result;
};

export const addAdditionalExamDetail = async (marks: {
  examMarks: IExamMarks[];
  examDetail: IExamDetail;
}): Promise<ResultSetHeader> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<ResultSetHeader>(
    "Update examdetail set testStatus=?, correctAnswerMarks=?, incorrectAnswerMarks=?, nonattemptQuestionMarks=?, isTestTeamwise=? where id=?",
    [
      marks.examDetail.testStatus,
      marks.examDetail.correctAnswerMarks,
      marks.examDetail.incorrectAnswerMarks,
      marks.examDetail.nonattemptQuestionMarks,
      marks.examDetail.isTestTeamwise,
      marks.examDetail.id,
    ]
  );

  return result;
};

export const fetchExamMarksByExamId = async (
  examId: number
): Promise<IExamWithStudentDetail[] | null> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<IExamWithStudentDetail[]>(
    "Select exam.*, student.rollNo, student.firstName, student.middleName, student.lastName from exam inner join student on student.id=exam.student where test=? order by marksObtain desc",
    [examId]
  );
  return result;
};

export const fetchExamMarksByExamIdTeamwise = async (
  examId: number
): Promise<IExamWithStudentDetailExamStatic[] | null> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<IExamWithStudentDetailExamStatic[]>(
    " WITH teamStatics AS ( SELECT team, AVG(marksObtain) AS average, STDDEV(marksObtain) AS stddev FROM exam WHERE test = ? GROUP BY team ) SELECT teamStatics.average, teamStatics.stddev, exam.*, student.rollNo, student.firstName, student.middleName,student.lastName FROM exam INNER JOIN student ON student.id = exam.student INNER JOIN teamStatics ON exam.team = teamStatics.team WHERE exam.test = ? ORDER BY teamStatics.average DESC, teamStatics.stddev ASC",
    [examId, examId]
  );
  return result;
};

export const fetchExamStaticByExamId = async (
  examId: number
): Promise<IExamStatic[] | null> => {
  const connection: Connection = await mysqlConnect();
  const [result] = await connection.query<IExamStatic[]>(
    "Select count(*) as count, min(marksObtain) as lowest, max(marksObtain) as highest, avg(marksObtain) as average from exam where test=?",
    [examId]
  );
  return result;
};
