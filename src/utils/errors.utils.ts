import { NextFunction, Request, Response } from "express";
import { RequestError } from "./globalErrorHandler.utils";

const errorWrap = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any> | void,
  contextMessage: string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      const error = err as Error;
      if (!(error instanceof RequestError)) {
        err = new RequestError(`${contextMessage}: ${error.message}`);
      }
      next(err);
    }
  };
};

export default errorWrap;
