import express, { Request, Response, Router } from "express";
import { ResultSetHeader } from "mysql2";
import { createCourse, fetchAllCourse } from "../operations/course";
import { ICourse } from "../interfaces/course";

var course: Router = express.Router();

course.get("/", (req: Request, res: Response) => {
  res.status(200).send("course route");
});

course.post("/create", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const sqlRes: ResultSetHeader = await createCourse(data);
    if (!sqlRes) {
      res.status(400).send({ data: null, message: "Course is not created" });
    } else {
      res
        .status(200)
        .send({ data: sqlRes, message: "Course created successfully" });
    }
  } catch (e: any) {
    res.status(500).send({ data: e.message, message: "Internal server error" });
  }
});

course.get("/all", async (req: Request, res: Response) => {
  try {
    const sqlRes: ICourse[] = await fetchAllCourse();
    if (!sqlRes) {
      res.status(400).send({ data: null, message: "Unable to fetch course" });
    } else {
      res
        .status(200)
        .send({ data: sqlRes, message: "Courses fetch successfully" });
    }
  } catch (e: any) {
    res.status(500).send({ data: e.message, message: "Internal server error" });
  }
});

export default course;
