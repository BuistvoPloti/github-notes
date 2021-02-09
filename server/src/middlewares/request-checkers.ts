import { ReqResNextTypes } from "../types/types";
import { log } from "../utils/logger.utils";

export const logRequestDetails: ReqResNextTypes = (req, _res, next) => {
  const requestDetails = {
    method: req.method,
    url: req.url,
    "content-type": req.headers["content-type"],
  };
  log(requestDetails);
  return next();
};

export const contentTypeChecker: ReqResNextTypes = (req, res, next) => {
  const whiteListMethods = ["GET", "DELETE"];
  const isWrongContentType = (req.headers["content-type"] !== "application/json")
    && !whiteListMethods.includes(req.method);
  if (isWrongContentType) {
    next({ message: `Wrong content type: ${req.headers["content-type"]}` });
    return res.sendStatus(415);
  }
  return next();
};
