import { NextFunction, Request, Response } from "express";
import logger from "./logger";
import { MongoError } from "mongodb";
import { isCodeSuccessful } from "./response.utils";

const handleGlobalError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error.stack);
  let code;
  let status = 500;
  let message = error.message;

  if (error instanceof MongoError) {
    status = 400;
    message = "Database error occured";
    code = error.code;
  }

  return res.status(status).send({
    success: isCodeSuccessful(status),
    status,
    code,
    result: null,
    message,
    stack: process.env.NODE_ENV === "developmenet" ? error.stack : undefined,
  });
};

export default handleGlobalError;

export class RequestError extends Error {
  public statusCode: number;
  public success: boolean;
  public result: any | undefined;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "RequestError";
    this.success = isCodeSuccessful(statusCode);
    this.result = null;
  }
}
