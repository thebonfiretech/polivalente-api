import { response } from "express";

import errors from "@assets/errors.json";
import logger from "./logger";

const sendError = (res, errorMessage: string, replaceMessage?: string) => {
  errorMessage = errorMessage.toLowerCase();

  if (!errors[errorMessage]) {
    throw new Error("Error message does not exist");
  }

  const error = errors[errorMessage];
  errorMessage = error.message.replace("%%%", replaceMessage);

  try {
    logger.error(errorMessage);
    return res.status(error.statusCode).json({
      error: {
        code: error.statusCode,
        message: errorMessage,
      },
    });
  } catch {}
};

export default sendError;
