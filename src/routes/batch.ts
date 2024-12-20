import express, { Request, Response, Router } from "express";
import { createBatch, getAllBatch } from "../operations/batch";
import { ResultSetHeader } from "mysql2";
import { IBatch } from "../interfaces/batch";
var batch: Router = express.Router();

batch.get("/", (req: Request, res: Response) => {
  res.status(200).send("batch route");
});

batch.post("/create", async (req: Request, res: Response) => {
  try {
    const { name, yos, yoe } = req.body;
    if (!name || !yos || !yoe) {
      res
        .status(400)
        .send({ data: null, message: "One or more parameters are missing" });
      return;
    }
    var sqlRes: ResultSetHeader;
    try {
      sqlRes = await createBatch(name, yos, yoe);
    } catch (error: any) {
      res.status(400).send({ data: error, message: error.message });
      return;
    }
    if (sqlRes) {
      res.status(200).send({
        data: { id: sqlRes.insertId },
        message: "Batch Created successfully",
      });
    } else {
      res.status(400).send({ data: null, message: "Unable to create batch" });
    }
  } catch (error: any) {
    console.error("error", error);
    res.status(500).send({ data: error, message: error.message });
  }
});

batch.get("/all", async (req: Request, res: Response) => {
  const sqlRes: IBatch[] | null = await getAllBatch();
  res.status(200).send({ data: sqlRes, message: "data send successfully" });
});

export default batch;
