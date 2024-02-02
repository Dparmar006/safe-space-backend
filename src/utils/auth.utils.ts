import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

const JWT_ACCESS_TOKEN_EXPIRES_IN = process.env
  .JWT_ACCESS_TOKEN_EXPIRES_IN as string;

const JWT_REFRESH_TOKEN_EXPIRES_IN = process.env
  .JWT_REFRESH_TOKEN_EXPIRES_IN as string;

export interface IJWTPayload {
  email: string;
  _id: string;
}

export const generateJWTAccessToken = (payload: IJWTPayload) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
  });
  return token;
};

export const generateJWTAccessTokenFromRefreshToken = (refrehToken: string) => {
  const decoded = jwt.verify(refrehToken, JWT_SECRET);
  return jwt.sign(decoded, JWT_SECRET);
};

export const generateJWTRefrehToken = (payload: IJWTPayload) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
  });
  return token;
};

export const isTokenValid = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as IJWTPayload;
};
