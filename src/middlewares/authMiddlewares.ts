import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT } from "../server";
const crypto = require("crypto");

export const checkToken = async (req: Request, res: Response, next: any) => {
  let jwtPayload: JWT | undefined;

  const token: string | undefined = req.headers.authorization?.split(" ")[1];

  if (!token) throw new Error("Token not found");

  try {
    jwtPayload = (await verify(token, getJwtSecret())) as JWT;

    req.headers["x-user-id"] = jwtPayload.userId || "";
    req.headers["x-role"] = jwtPayload.role || "";
    req.headers["x-email"] = jwtPayload.email || "";
    req.headers["x-full-name"] = jwtPayload.fullName || "";
    req.headers["Authorization"] = "";

    next();
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const getJwtSecret = (): string => {
  return crypto
    .createHash("sha256")
    .update(process.env.JWT_SECRET)
    .digest("hex");
};
