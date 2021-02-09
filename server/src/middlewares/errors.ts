import { ErrReqResNextTypes, ReqResNextTypes } from "../types/types";
import { logError } from "../utils/logger.utils";

import { handleErrorResponse } from "../utils/response-helpers";

export const errorHandler: ErrReqResNextTypes = (err, _req, _res, next) => {
  logError(err.message || "Unknown error occurred. Error message was not specified.");
  return next();
};

export const resourceNotFoundHandler: ReqResNextTypes = (req, res) => {
  const statusCode = 404;
  const errorDetail = {
    message: `Resource ${req.path} not found`,
  };
  logError(errorDetail);
  return handleErrorResponse(res, errorDetail, statusCode);
};
