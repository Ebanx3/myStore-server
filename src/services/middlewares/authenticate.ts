import { NextFunction, Response } from "express";
import { RequestWithData, ServerResponse } from "../../types";
import { envs } from "../../utils/envVariables";
import { verifyToken } from "../../utils/jwt";

const UnauthorizedJson = { success: false, message: "Unauthorized" };

export const Authenticate = async (
  req: RequestWithData,
  res: Response<ServerResponse>,
  next: NextFunction
) => {
  try {
    const token = req.cookies[envs.TOKEN_NAME];
    if (!token) {
      res.status(401).json(UnauthorizedJson);
      return;
    }

    const user = verifyToken(token);
    if (!user) {
      res.clearCookie(envs.TOKEN_NAME).status(401).json(UnauthorizedJson);
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
