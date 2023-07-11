import jwt from "jsonwebtoken";

import authConfig from "../config/auth.js";
import sendError from "../utils/error.js";

const userAuthenticad = (
  req,
  res,
  next
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return sendError(res, "jwt_not_sent");
  const decoded = jwt.verify(authHeader, authConfig.jwt.secret, (err, decoded) => {
    if (err) sendError(res, "invalid_jwt");
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
  });
  next();
};

export default userAuthenticad;
