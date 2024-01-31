import { Request, Response } from "express";
import { sendResponse } from "../utils/response.utils";
import { createUser, findOneUser } from "../services/users.services";
import { RequestError } from "../utils/globalErrorHandler.utils";
import { compareHashString, hashString } from "../utils/encryption.utils";

export const signup = async (req: Request, res: Response) => {
  const requestBody = req.body;
  const { email, password, username, firstName, lastName } = requestBody;
  if (!email || !password || !username || !firstName || !lastName) {
    throw new RequestError(
      "Please provide password, email, first name, last name and username",
      400
    );
  }
  // check if user already exists
  const user = await findOneUser({ $or: [{ email }, { username }] });
  if (user)
    throw new RequestError("User with this information already exists", 400);

  requestBody.password = await hashString(password, 12);
  requestBody.email = email.toLowerCase().trim();

  const newUser = await createUser(requestBody);

  return sendResponse(res, 201, "", newUser);
};

export const signin = async (req: Request, res: Response) => {
  const requestBody = req.body;
  const { email, password, username } = requestBody;
  if ((!email || !username) && !password) {
    throw new RequestError("Please provide proper credentials", 400);
  }
  // check if user already exists
  const user = await findOneUser({ $or: [{ email }, { username }] });
  if (!user)
    throw new RequestError("User with this information doesn't exists", 400);

  const isPasswordValid = await compareHashString(password, user.password);

  if (!isPasswordValid)
    throw new RequestError(
      "Your credentials are wrong, Please try again.",
      400
    );

  return sendResponse(res, 200, "User logged in successfully.", user);
};
