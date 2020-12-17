const {
  application: { github_base_url },
} = require("../config");

const repositoriesUrlBuilder = (configData) => {
  return configData.noApiTemplate
    ? `${github_base_url}/${configData.noApiTemplate}`
    : `${github_base_url}/users/${configData.login}/${configData.source}?access_token=${configData.access_token}`;
};

module.exports = {
  repositoriesUrlBuilder,
};
