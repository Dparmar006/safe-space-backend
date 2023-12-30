import { Response } from "express";

export const sendResponse = (
  res: Response,
  code: number,
  message?: string,
  data: any = {}
) => {
  res.status(code).json({
    success: isCodeSuccessful(code),
    message: message ? message : statusMessages[code] || "Unknown Status",
    result: data,
  });
};

const statusMessages: Record<number, string> = {
  200: "The request has succeeded.",
  201: "The request has been fulfilled and resulted in a new resource being created.",
  400: "The server could not understand the request due to invalid syntax or missing parameters.",
  401: "Authentication is required and has failed or has not yet been provided.",
  403: "The server understood the request but refuses to authorize it.",
  404: "The requested resource could not be found on the server.",
  500: "The server encountered an unexpected condition that prevented it from fulfilling the request.",
};

export const isCodeSuccessful = (code: number) => code >= 200 && code < 300;
