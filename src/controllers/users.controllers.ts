import { Request, Response } from "express";
import { sendResponse } from "../utils/response.utils";
import { findUsers } from "../services/users.services";

export const getUsersController = async (req: Request, res: Response) => {
  const users = await findUsers({});
  return sendResponse(res, 200, "", users);
};
