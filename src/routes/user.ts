import express, { Request, Response, Router } from "express";
import {
  forgotPasswordUser,
  getUserFromEmail,
  isExistingEmail,
} from "../operations/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/user";
import { ResultSetHeader } from "mysql2";
import { authMiddleware } from "../middlewares/authMiddleware";
var user: Router = express.Router();

user.get("/", (req: Request, res: Response) => {
  res.status(200).send("user route");
});

user.post("/login", async (req: Request, res: Response) => {
  try {
    const { userType, email, password } = req.body;

    let userDetail: User | null = null;
    if (userType === "student") {
      // userDetail = await getStudentFromEmail(email);
    } else {
      userDetail = await getUserFromEmail(email);
    }

    if (!userDetail) {
      res
        .status(400)
        .send({ data: null, message: "User credentials not found" });
      return;
    }

    const isMatch: boolean = await bcrypt.compare(
      password,
      userDetail.password
    );

    if (isMatch) {
      delete (userDetail as { password?: string }).password;
      const token = jwt.sign(
        {
          data: userDetail,
        },
        process.env.jwtSecretToken as string,
        { expiresIn: 365 * 24 * 60 * 60 }
      );
      res.status(200).send({
        data: { token, userDetail },
        message: "User credentials found successfully",
      });
    } else {
      res.status(400).send({
        data: null,
        message: "Email or password does not match.",
      });
    }
  } catch (error) {
    res.status(500).send({
      data: error,
      message: "Internal Server Error",
    });
  }
});

user.post("/forgotPassword", async (req: Request, res: Response) => {
  const { userType, email, password } = req.body;
  try {
    const isEmailExist: boolean = await isExistingEmail(email);
    if (!isEmailExist) {
      res.status(200).send({ data: null, message: "Email does not exist" });
      return;
    }
    const hashPassword: string = await bcrypt.hash(password, 10);
    let userFetchRes: ResultSetHeader | null;

    if (userType === "student") {
      // userFetchRes = await forgotPasswordStudent(email, hashPassword);
      userFetchRes = null;
    } else {
      userFetchRes = await forgotPasswordUser(email, hashPassword);
    }
    if (!userFetchRes) {
      res
        .status(400)
        .send({ data: null, message: "Unable to change password" });
      return;
    }
    res
      .status(200)
      .send({ data: userFetchRes, message: "Password change successfully" });
  } catch (error: any) {
    res.status(500).send({
      data: error,
      message: "Internal Server Error",
    });
  }
});

user.get("/getUserDetail", authMiddleware, (req: Request, res: Response) => {
  if (!req.user) {
    res
      .status(400)
      .send({ data: null, message: "Unable to fetch user detail from token" });
  }
  res
    .status(200)
    .send({ data: req.user, message: "User details found successfully" });
});

export default user;
