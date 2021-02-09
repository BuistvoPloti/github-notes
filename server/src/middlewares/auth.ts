import { Request } from "express";
import { ReqResNextTypes } from "../types/types";
import config from "../config";

const {
  application: { white_list_urls },
} = config;

export const authProtection: ReqResNextTypes = (req, res, next) => {
  if (req.session.isAuthenticated === false) {
    return res.status(403).send("Not authorized");
  }
  return next();
};

const requestUrlModifier = (req: Request, isPublic: boolean) => {
  if (isPublic) {
    req.url = req.url.replace("", "/api/public");
    req.originalUrl = req.originalUrl.replace("", "/api/public");
  } else {
    req.url = req.url.replace("", "/api");
    req.originalUrl = req.originalUrl.replace("", "/api");
  }
};

export const checkAuthAndPickApiType: ReqResNextTypes = (req, _res, next) => {
  const inWhiteList = white_list_urls.some((url: string) => req.originalUrl.includes(url));
  if (inWhiteList) {
    requestUrlModifier(req, false);
    return next();
  }

  if (req.session.isAuthenticated) {
    requestUrlModifier(req, false);
  } else {
    requestUrlModifier(req, true);
  }
  return next();
};
