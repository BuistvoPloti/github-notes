import * as request from "superagent";

const fetchGithubData = (source: string, access_token?: string): Promise<any> => {
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

export {
  fetchGithubData
};
