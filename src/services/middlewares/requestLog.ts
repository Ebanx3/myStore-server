import { NextFunction, Request, Response } from "express";

export const requestLog = (req: Request, res: Response, next: NextFunction) => {
  console.log(`
New Request
from: ${req.headers.origin}
endpoint: ${req.url}
method: ${req.method}`);
  if (req.body) console.log(JSON.stringify({"body": req.body}, null, 2));
  next();
};
