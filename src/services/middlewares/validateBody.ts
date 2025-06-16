import { NextFunction, Response } from "express";
import { RequestWithData, ServerResponse } from "../../types";
import { SchemasNames } from "../zod/validation";
import { ValidateBody } from "../zod/validation";

export const validateBodyMiddleware = (BodySchema: SchemasNames) => {
  return async (
    req: RequestWithData,
    res: Response<ServerResponse>,
    next: NextFunction
  ) => {
    try {
      const validation = await ValidateBody({
        schema: BodySchema,
        body: req.body,
      });

      if (validation.error) {
        res
          .status(400)
          .json({ success: false, message: "Invalid body", data: validation });
        return;
      }

      req.validatedData = validation;
      next();

    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
      return;
    }
  };
};
