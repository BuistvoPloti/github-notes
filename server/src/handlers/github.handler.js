const { resolveServicePath } = require("../utils/helpers");

const githubService = require(resolveServicePath("github", "common"));
const {
  application: { client_login_url },
} = require("../config");
const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../utils/response-helpers");
const { authenticateRequest, setAuthFlag } = require("../utils/auth.utils");

const authorizeGithubUser = (req, res, next) => {
  const { query } = req;
  const { code } = query;

  if (!code) {
    handleErrorResponse(res, "code query failed");
    return;
  }

  if (req.session.isAuthenticated) {
    res.redirect(client_login_url);
    return;
  }

  githubService
    .authorizeGithubUser(req, res, query, code)
    .then((resultUserData) => {
      const { access_token } = resultUserData.body;
      const getUserPromise = githubService.getUser(access_token);
      return { getUserPromise, access_token };
    })
    .then(composedData => Promise.all([
      composedData.getUserPromise,
      composedData.access_token,
    ]))
    .then((composedData) => {
      const [userData, access_token] = composedData;
      return {
        login: userData.body.login,
        user_id: userData.body.id,
        access_token,
      };
    })
    .then((composedData) => {
      const userData = {
        login: composedData.login,
        user_id: composedData.user_id,
      };
      githubService.createUser(userData);
      return Promise.all([
        composedData.login,
        composedData.user_id,
        composedData.access_token,
      ]);
    })
    .then((composedData) => {
      const [login, user_id, access_token] = composedData;

      return authenticateRequest(req, res, {
        access_token,
        login,
        user_id,
      });
    })
    .catch(err => next(err))
    .finally(() => res.redirect(client_login_url));
};

const getUserRepositories = (req, res, next) => {
  const { access_token } = req.signedCookies;
  const { login } = req.session;

  githubService
    .getUserRepositories(login, access_token)
    .then(repositories => handleSuccessResponse({ repositories }, res))
    .catch((err) => {
      handleErrorResponse(res, err);
      next(err);
    });
};

const getUser = (req, res, next) => {
  const { access_token } = req.signedCookies;
  githubService
    .getUser(access_token)
    .then((userData) => {
      handleSuccessResponse(
        {
          userId: userData.body.id,
          login: userData.body.login,
          auth: setAuthFlag(userData),
        },
        res
      );
    })
    .catch((err) => {
      handleSuccessResponse({ auth: false }, res);
      next(err);
    });
};

const logoutGithubUser = (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("connect.sid");
  res.status(204).send("logged out");
};

const getUserRepository = (req, res, next) => {
  githubService
    .getUserRepository(req.params.user, req.params.id)
    .then(repositoryData => handleSuccessResponse(
      {
        repository:
        repositoryData.body
      },
      res
    ))
    .catch((err) => {
      handleErrorResponse(res, err);
      next(err);
    });
};

module.exports = {
  authorizeGithubUser,
  getUserRepositories,
  getUser,
  logoutGithubUser,
  getUserRepository,
};
