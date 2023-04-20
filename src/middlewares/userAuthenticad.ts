import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { RequestWithUserRole } from "src/config/userRequestType";
import authConfig from "../config/auth";
import sendError from "../utils/error";

const userAuthenticad = (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return sendError(res, "jwt_not_sent");
  const decoded = verify(authHeader, authConfig.jwt.secret, (err, decoded) => {
    if (err) sendError(res, "invalid_jwt");
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
  });
  next();
};

export default userAuthenticad;
