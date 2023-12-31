import { Response } from "express";

export const sendResponse = (
  res: Response,
  status: number,
  message?: string,
  data: any = {}
) => {
  res.status(status).json({
    success: isCodeSuccessful(status),
    message: message ? message : statusMessages[status] || "Unknown Status",
    result: data,
  });
};

export const statusMessages: Record<number, string> = {
  200: "The request has succeeded.",
  201: "The request has been fulfilled and resulted in a new resource being created.",
  400: "The server could not understand the request due to invalid syntax or missing parameters.",
  401: "Authentication is required and has failed or has not yet been provided.",
  403: "The server understood the request but refuses to authorize it.",
  404: "The requested resource could not be found on the server.",
  500: "The server encountered an unexpected condition that prevented it from fulfilling the request.",
};

export const isCodeSuccessful = (status: number) =>
  status >= 200 && status < 300;
