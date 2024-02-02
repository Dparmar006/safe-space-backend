import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../utils/globalErrorHandler.utils";
import {
  IJWTPayload,
  generateJWTAccessTokenFromRefreshToken,
  isTokenValid,
} from "../utils/auth.utils";
import logger from "../utils/logger";
import { findOneUser } from "../services/users.services";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const refreshToken = req.headers["x-refreh-token"] as string;
    const xAccessToken = req.headers["x-access-token"] as string;

    if (!authHeader)
      return next(new AuthenticationError("Missing authorization header"));

    const accessToken = authHeader.split(" ")[1] || xAccessToken;

    if (!accessToken)
      return next(new AuthenticationError("Missing bearer token"));

    let decoded: IJWTPayload | null = null;
    try {
      decoded = isTokenValid(accessToken);
    } catch (error) {
      logger.warn(
        "Access token has been expired, generating new from refresh token"
      );

      if (!refreshToken)
        return next(new AuthenticationError("Missing refreh token"));

      const newAccessToken =
        generateJWTAccessTokenFromRefreshToken(refreshToken);
      decoded = isTokenValid(newAccessToken);
      res.header("Authorization", newAccessToken);
      res.header("x-access-token", newAccessToken);
      res.header("x-refreh-token", refreshToken);
    }

    if (!decoded) next(new AuthenticationError("JWT Token error."));

    const user = await findOneUser({ _id: decoded._id }, {}, { lean: true });

    if (!user) return next(new AuthenticationError("User not found."));

    req.user = user;

    next();
  } catch (error) {
    return next(new AuthenticationError("Could not authenticate the user"));
  }
};

export default auth;
