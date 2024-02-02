import { NextFunction, Request, Response } from "express";
import logger from "./logger";
import { MongoError } from "mongodb";
import { isCodeSuccessful, statusMessages } from "./response.utils";

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
  let success = false;

  if (error instanceof MongoError) {
    status = 400;
    message = "Database error occured";
    code = error.code;
  }

  if (error instanceof RequestError) {
    status = error.status;
    message = error.message;
    code = error.code;
    success = isCodeSuccessful(error.status);
  }

  if (error instanceof AuthenticationError) {
    status = error.status;
    message = error.message;
    code = error.code;
    success = isCodeSuccessful(error.status);
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
  public status: number;
  public success: boolean;
  public result: any | undefined;
  public code: string;
  constructor(message: string = statusMessages[400], status = 400) {
    super(message);
    this.status = status;
    this.name = "RequestError";
    this.success = isCodeSuccessful(status);
    this.result = null;
    this.code = "REQUEST_ERROR";
  }
}

export class AuthenticationError extends Error {
  public status: number;
  public success: boolean;
  public result: any | undefined;
  public code: string;
  constructor(message: string = statusMessages[401], status = 401) {
    super(message);
    this.status = status;
    this.name = "AuthenticationError";
    this.success = isCodeSuccessful(status);
    this.result = null;
    this.code = "AUTHENTICATION_ERROR";
  }
}
