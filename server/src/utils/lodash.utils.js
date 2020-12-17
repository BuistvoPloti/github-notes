const fp = require("lodash/fp");

const findRepoIdMatch = (repository_id, userRepositories) => {
  return fp.find(["id", Number(repository_id)], userRepositories);
};

const excludeMongoVariables = (data) => {
  return fp.omit(["_id", "__v"], data)
};

module.exports = { findRepoIdMatch, excludeMongoVariables };
