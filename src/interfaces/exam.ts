import { RowDataPacket } from "mysql2";

export interface IExam extends RowDataPacket {
  id: number;
  student: number;
  test: number;
  marksObtain: number;
  team: string;
  absent: boolean;
  correctAnswer: number;
  incorrectAnswer: number;
  nonattemptQuestion: number;
  isCaptain: boolean;
}

export interface IExamCreate extends RowDataPacket {
  student: number;
  test: number;
  marksObtain: number;
  team: string;
  absent: boolean;
  correctAnswer: number;
  incorrectAnswer: number;
  nonattemptQuestion: number;
  isCaptain: boolean;
}

export interface IExamDetail extends RowDataPacket {
  id: number;
  testDate: Date;
  name: string;
  subject: string;
  testType: number;
  passingMark: number;
  totalMark: number;
  batch: number;
  institute: number;
  createdAt: Date;
  updatedAt: Date;
  startTime: Date;
  endTime: Date;
  testStatus: string;
  correctAnswerMarks: number;
  incorrectAnswerMarks: number;
  nonattemptQuestionMarks: number;
  isTestTeamwise: number;
}

export interface ICreateExamDetail extends RowDataPacket {
  testDate: Date;
  name: string;
  subject: string;
  testType: number;
  passingMark: number;
  totalMark: number;
  batch: number;
  institute: number;
  startTime: Date;
  endTime: Date;
  testStatus: string;
}

export interface IExamDetailWithBatchName extends IExamDetail {
  batchName: string;
}

export interface IExamWithStudentDetail extends IExam {
  rollNo: number;
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface IExamWithStudentDetailExamStatic
  extends IExamWithStudentDetail {
  average: number;
  stddev: number;
}

export interface IExamStatic extends RowDataPacket {
  count: number;
  lowest: number;
  highest: number;
  average: number;
}

export interface IExamMarks extends RowDataPacket {
  id: number;
  rollNo: number;
  marksObtain: number;
  absent: number;
  correctAnswer: number;
  incorrectAnswer: number;
  nonAttempt: number;
  isCaptain: boolean;
  team: string | null;
}
