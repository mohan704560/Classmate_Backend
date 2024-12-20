import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user: JwtPayload | string;
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization as string;
    if (!authHeader) {
      res
        .status(401)
        .send({ data: null, message: "You are unauthorised to access" });
      return;
    }
    const jwtData = jwt.verify(
      authHeader.split(" ")[1],
      process.env.jwtSecretToken as string
    );
    if (!jwtData) {
      res
        .status(401)
        .send({ data: null, message: "You are unauthorised to access" });
      return;
    }
    req.user = jwtData;
    return next();
  } catch (e: any) {
    res.status(500).send({ data: e.message, message: "Internal server error" });
  }
}
