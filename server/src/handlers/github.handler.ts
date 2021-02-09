import {
  ReqResNextTypes
} from "../types/types";
import config from "../config";
import { log } from "../utils/logger.utils";
import {
  handleSuccessResponse,
  handleErrorResponse,
} from "../utils/response-helpers";
import { authenticateRequest, setAuthFlag } from "../utils/auth.utils";
import * as githubService from "../services/common/github.service";
import { services } from "../services/db-resolver.service";

const { usersService } = services;
const {
  application: { client_login_url },
} = config;

const authorizeGithubUser: ReqResNextTypes = async (req, res, next) => {
  const { query } = req;
  const { code } = query;

  if (!code) {
    const err = { message: "code query failed" };
    handleErrorResponse(res, err);
    return next({});
  }

  if (req.session.isAuthenticated) {
    res.redirect(client_login_url);
    return next({});
  }

  try {
    const userAccessData: any = await githubService.authorizeGithubUser(String(code));
    const { access_token } = userAccessData.body;
    const user = await githubService.getUser(access_token);
    const userCredentials = {
      login: user.body.login,
      user_id: user.body.id,
    };
    await usersService.createUser(userCredentials);
    await authenticateRequest(req, res, {
      access_token,
      login: userCredentials.login,
      user_id: userCredentials.user_id,
    });
  } catch (err) {
    return next(err);
  } finally {
    res.redirect(client_login_url);
  }
};

const getUserRepositories: ReqResNextTypes = async (req, res, next) => {
  const { access_token } = req.signedCookies;
  const { login } = req.session;

  try {
    const repositories = await githubService.getUserRepositories(
      login,
      access_token
    );
    return handleSuccessResponse({ repositories }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const getUser: ReqResNextTypes = async (req, res, next) => {
  const { access_token } = req.signedCookies;
  if (!access_token) {
    log("Invalid token. Unauthorized");
    return handleSuccessResponse({ auth: false }, res);
  }

  try {
    const user = await githubService.getUser(access_token);
    return handleSuccessResponse(
      {
        userId: user.body.id,
        login: user.body.login,
        avatar_url: user.body.avatar_url,
        auth: setAuthFlag(user),
      },
      res
    );
  } catch (err) {
    handleSuccessResponse({ auth: false }, res);
    return next(err);
  }
};

const logoutGithubUser: ReqResNextTypes = (_req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("connect.sid");
  res.status(204).send("logged out");
};

const getUserRepository: ReqResNextTypes = async (req, res, next) => {
  try {
    const userRepository = await githubService.getUserRepository(
      req.params.user,
      req.params.id
    );
    return handleSuccessResponse(
      {
        repository: userRepository.body
      },
      res
    );
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

export {
  authorizeGithubUser,
  getUserRepositories,
  getUser,
  logoutGithubUser,
  getUserRepository,
};
