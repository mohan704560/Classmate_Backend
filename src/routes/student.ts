import express, { Request, Response, Router } from "express";
import {
  createStudent,
  getAllStudent,
  getStudentFromBatch,
} from "../operations/student";
import { ResultSetHeader } from "mysql2";
import { IStudent, IStudentWithBatchNo } from "../interfaces/student";
var student: Router = express.Router();

student.get("/", (req: Request, res: Response) => {
  res.status(200).send("student route");
});

student.post("/create", async (req: Request, res: Response) => {
  try {
    if (!req.body.firstName || !req.body.institute) {
      res
        .status(400)
        .send({ data: null, message: "One or more parameters are missing" });
      return;
    }
    var sqlRes: ResultSetHeader;
    try {
      sqlRes = await createStudent(req.body);
    } catch (e: any) {
      res.status(400).send({ data: e, message: e.message });
      return;
    }
    if (sqlRes) {
      res.status(200).send({
        data: { id: sqlRes.insertId },
        message: "Student added successfully",
      });
    } else {
      res.status(400).send({ data: null, message: "Unable to create student" });
    }
  } catch (error: any) {
    console.error("error", error);
    res.status(500).send({ data: error, message: error.message });
  }
});

student.get("/all", async (req: Request, res: Response) => {
  try {
    var sqlRes: IStudentWithBatchNo[] | null;
    try {
      sqlRes = await getAllStudent();
    } catch (e: any) {
      console.error("e", e);
      res.status(400).send({ data: e, message: e.message });
      return;
    }

    if (sqlRes) {
      res.status(200).send({ data: sqlRes, message: "Data send successfully" });
    } else {
      res.status(400).send({ data: null, message: "Unable to send data" });
    }
  } catch (e: any) {
    console.error("e", e);
    res.status(500).send({ data: e, message: e.message });
  }
});

student.get("/getFromBatch/:batch", async (req: Request, res: Response) => {
  try {
    const sqlRes: IStudent[] | null = await getStudentFromBatch(
      parseInt(req.params.batch)
    );
    if (sqlRes) {
      res.status(200).send({ data: sqlRes, message: "Data send successfully" });
    } else {
      res.status(400).send({ data: null, message: "Unable to send data" });
    }
  } catch (e: any) {
    res.status(500).send({ data: e, message: e.message });
  }
});

export default student;
