import express, { Request, Response, Router } from "express";
import { getAllQuestionType } from "../operations/questionType";
import { IQuestionType } from "../interfaces/questionType";
var questionType: Router = express.Router();

questionType.get("/", (req: Request, res: Response) => {
  res.status(200).send("questionType route");
});

questionType.get("/all", async (req: Request, res: Response) => {
  try {
    const sqlRes: IQuestionType[] = await getAllQuestionType();
    if (sqlRes) {
      res.status(200).send({ data: sqlRes, message: "data send successfully" });
    } else {
      res.status(400).send({ data: null, message: "Data not found" });
    }
  } catch (e: any) {
    res.status(500).send({ data: e, message: e.messge });
  }
});

export default questionType;
