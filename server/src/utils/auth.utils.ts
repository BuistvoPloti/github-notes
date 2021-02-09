import { Response } from "express";
import { ExtendedRequest, IUser } from "../types/types";
import config from "../config";

const { cookiesConfig } = config;

type UserCredentials = IUser & {
  access_token: string,
}
type AuthenticateRequestType = (
  req: ExtendedRequest,
  res: Response,
  credentials: UserCredentials) => any;

const authenticateRequest: AuthenticateRequestType = (req, res, credentials) => {
  req.session.isAuthenticated = true;
  req.session.login = credentials.login;
  req.session.user_id = credentials.user_id;
  return res.cookie("access_token", credentials.access_token, cookiesConfig);
};

const setAuthFlag = (userData: Record<string, unknown>) => Boolean(userData);

export {
  authenticateRequest,
  setAuthFlag,
};
