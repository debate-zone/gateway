import { Request, Response } from "express";
import { OutputDecodedToken } from "../../../debate-zone-micro-service-common-library/src/types/auth";
import { verify } from "../../../debate-zone-micro-service-common-library/src/auth/token";

export const checkToken = async (req: Request, res: Response, next: any) => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];

  if (!token) throw new Error("Token not found");

  try {
    const outputDecodedToken: OutputDecodedToken = await verify(token);

    req.headers["x-user-id"] = outputDecodedToken.userId || "";
    req.headers["x-user-role"] = outputDecodedToken.userRole || "";
    req.headers["x-user-email"] = outputDecodedToken.userEmail || "";
    req.headers["x-user-full-name"] = outputDecodedToken.userFullName || "";
    req.headers["Authorization"] = "";

    next();
  } catch (error) {
    throw new Error("Invalid token");
  }
};
