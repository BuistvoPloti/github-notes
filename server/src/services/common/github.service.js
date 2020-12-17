const request = require("superagent");
const { fetchGithubData } = require("../../utils/superagent.utils");
const { repositoriesUrlBuilder } = require("../../utils/url-bilders");
const { log } = require("../../utils/logger.utils");
const {
  application: { client_app_id, client_app_secret, github_auth_url },
} = require("../../config");
const { transformRepositories } = require("../../utils/helpers");
const { resolveServicePath } = require("../../utils/helpers");

const usersService = require(resolveServicePath("users"));

const authorizeGithubUser = (req, res, query, code) => request
  .post(github_auth_url)
  .send({
    client_id: client_app_id,
    client_secret: client_app_secret,
    code: code,
  })
  .set("Accept", "application/json");

const createUser = (userBody) => {
  usersService.createUser(userBody);
};

const getUser = (access_token) => {
  log(access_token);
  return fetchGithubData(
    repositoriesUrlBuilder({ noApiTemplate: "user" }),
    access_token
  );
};

const getTypedRepositories = (login, access_token, source) => fetchGithubData(
  repositoriesUrlBuilder({ login, source, access_token }),
  access_token
);

const getUserRepositories = (login, access_token) => {
  const publicForkedRepositoriesPromise = getTypedRepositories(
    login,
    access_token,
    "repos"
  );
  const starredRepositoriesPromise = getTypedRepositories(
    login,
    access_token,
    "starred"
  );

  return Promise.all([
    publicForkedRepositoriesPromise,
    starredRepositoriesPromise,
  ]).then((composedData) => {
    const publicForkedRepositories = transformRepositories(
      composedData[0].body,
      false
    );
    const starredRepositories = transformRepositories(
      composedData[1].body,
      true
    );

    return [...publicForkedRepositories, ...starredRepositories];
  });
};

const getUserRepository = (login, repository_name) => fetchGithubData(
  repositoriesUrlBuilder({
    login,
    noApiTemplate: `repos/${login}/${repository_name}`,
  })
);

module.exports = {
  authorizeGithubUser,
  getUserRepositories,
  getUser,
  createUser,
  getUserRepository,
};
