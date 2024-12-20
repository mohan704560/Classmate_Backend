import express, { Request, Response, Router } from "express";
import {
  addAdditionalExamDetail,
  addExamMarks,
  createExam,
  fetchExamDetailById,
  fetchExamMarksByExamId,
  fetchExamMarksByExamIdTeamwise,
  fetchExamStaticByExamId,
  getAllExam,
} from "../operations/exam";
import { ResultSetHeader } from "mysql2";
import {
  IExamDetailWithBatchName,
  IExamStatic,
  IExamWithStudentDetail,
  IExamWithStudentDetailExamStatic,
} from "../interfaces/exam";
var exam: Router = express.Router();

exam.get("/", (req: Request, res: Response) => {
  res.status(200).send("student route");
});

exam.post("/create", async (req: Request, res: Response) => {
  try {
    if (!req.body.name && !req.body.batch) {
      res
        .status(400)
        .send({ data: null, message: "One or more parameters are required" });
      return;
    }
    const sqlRes: ResultSetHeader = await createExam(req.body);
    if (sqlRes) {
      res
        .status(200)
        .send({ data: sqlRes.insertId, message: "Batch created successfully" });
    } else {
      res.send(400).send({ data: null, message: "Unable to create batch" });
    }
  } catch (e: any) {
    console.error("e", e);
    res.status(500).send({ data: e, message: e.message });
  }
});

exam.get("/all", async (req: Request, res: Response) => {
  try {
    const sqlRes: IExamDetailWithBatchName[] | null = await getAllExam();
    if (sqlRes) {
      res.status(200).send({ data: sqlRes, message: "Data send successfully" });
    } else {
      res.status(400).send({ data: null, message: "Unable to get data" });
    }
  } catch (e: any) {
    console.log("e :>> ", e);
    res.status(500).send({ data: e, message: e.message });
  }
});

exam.get("/examDetailById/:id", async (req, res) => {
  try {
    const sqlRes: IExamDetailWithBatchName[] | null = await fetchExamDetailById(
      parseInt(req.params.id)
    );
    if (sqlRes) {
      res.status(200).send({ data: sqlRes, message: "Data send successfully" });
    } else {
      res.status(400).send({ data: null, message: "Unable to get data" });
    }
  } catch (e: any) {
    res.status(500).send({ data: e, message: e.message });
  }
});

exam.get(
  "/examDetailWithMarks/:examId",
  async (req: Request, res: Response) => {
    try {
      const sqlRes: IExamDetailWithBatchName[] | null =
        await fetchExamDetailById(parseInt(req.params.examId));
      let sqlRes4: IExamWithStudentDetailExamStatic[] | null = null;
      if (sqlRes?.[0].isTestTeamwise == 1) {
        sqlRes4 = await fetchExamMarksByExamIdTeamwise(
          parseInt(req.params.examId)
        );
      }
      const sqlRes2: IExamWithStudentDetail[] | null =
        await fetchExamMarksByExamId(parseInt(req.params.examId));
      const sqlRes3: IExamStatic[] | null = await fetchExamStaticByExamId(
        parseInt(req.params.examId)
      );
      if (sqlRes && sqlRes2 && sqlRes3) {
        res.status(200).send({
          data: {
            examDetail: sqlRes,
            examMarks: sqlRes2,
            examStatic: sqlRes3,
            examMarksTeamWise: sqlRes4,
          },
          message: "Data send successfully",
        });
      } else {
        res.status(400).send({ data: null, message: "Unable to get data" });
      }
    } catch (e: any) {
      res.status(500).send({ data: e, message: e.message });
    }
  }
);

exam.post("/examMarks", async (req, res) => {
  try {
    const sqlRes: ResultSetHeader = await addExamMarks(req.body);
    const sqlRes2: ResultSetHeader = await addAdditionalExamDetail(req.body);
    if (sqlRes.affectedRows > 0 && sqlRes2.affectedRows > 0) {
      res.status(200).send({
        data: { sqlRes, sqlRes2 },
        message: "Data inserted Successfully",
      });
    } else {
      res.status(400).send({ data: null, message: "Unable to insert Data" });
    }
  } catch (e: any) {
    res.status(500).send({ data: e, message: e.message });
  }
});

export default exam;
