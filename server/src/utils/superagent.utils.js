const request = require("superagent");

const fetchGithubData = (source, access_token) => {
  if (!access_token) {
    return request
      .get(source)
      .set("User-Agent", "repositories.organizer");
  }
  return request
    .get(source)
    .set("Authorization", `token ${access_token}`)
    .set("User-Agent", "repositories.organizer");
};

module.exports = {
  fetchGithubData
};
