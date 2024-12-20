import express, { Request, Response } from "express";
import { mysqlConnect } from "./services/mysql";
import cors from "cors";
import user from "./routes/user";
import student from "./routes/student";
import exam from "./routes/exam";
import batch from "./routes/batch";
import questionType from "./routes/questionType";
import course from "./routes/course";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.port || 5000;

const allowedOrigins: string[] = [
  "http://localhost:3000",
  "http://192.168.0.101:3000",
];

type StaticOrigin =
  | boolean
  | string
  | RegExp
  | Array<boolean | string | RegExp>;

app.use(
  cors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, origin?: StaticOrigin) => void
    ) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", user);
app.use("/api/student", student);
app.use("/api/batch", batch);
app.use("/api/exam", exam);
app.use("/api/questionType", questionType);
app.use("/api/course", course);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(port, (error?: Error) => {
  if (error) {
    console.error("Server is unable to start.", error);
  }
  console.log("Server is running on " + port);
});
