import * as request from "superagent";
import { IRepository } from "../../types/types";
import {
  GithubReposBody,
  GithubRepositories,
  GithubResponseUser,
  GithubResponseRepository
} from "../../types/github-response";
import config from "../../config";
import { fetchGithubData } from "../../utils/superagent.utils";
import {
  githubRepositoriesUrlBuilder,
  githubBaseUrlBuilder,
} from "../../utils/url-builders";
import { transformRepositories } from "../../utils/helpers";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-self-import
import * as selfGithubService from "./github.service";
// self import is needed in order to test some logic

const {
  application: { client_app_id, client_app_secret, github_auth_url },
} = config;

const authorizeGithubUser = (code: string) => request
  .post(github_auth_url)
  .send({
    client_id: client_app_id,
    client_secret: client_app_secret,
    code,
  })
  .set("Accept", "application/json");

const getUser = async (access_token: string): Promise<GithubResponseUser> => fetchGithubData(
  githubBaseUrlBuilder({
    resource: "user",
  }),
  access_token,
);

async function getTypedRepositories(
  login: string,
  access_token: string,
  source: string
): Promise<GithubRepositories<GithubReposBody[]>> {
  return fetchGithubData(
    githubRepositoriesUrlBuilder({
      login,
      source,
      access_token,
    }),
    access_token
  );
}

const getUserRepositories = async (
  login: string,
  access_token: string
): Promise<IRepository[]> => {
  const publicForkedRepositories = await selfGithubService.getTypedRepositories(
    login,
    access_token,
    "repos"
  );
  const starredRepositories = await selfGithubService.getTypedRepositories(
    login,
    access_token,
    "starred"
  );
  const transformedPublicForkedRepositories: IRepository[] = transformRepositories(
    publicForkedRepositories.body,
    false
  );
  const transformedStarredRepositories: IRepository[] = transformRepositories(
    starredRepositories.body,
    true
  );
  return [
    ...transformedPublicForkedRepositories,
    ...transformedStarredRepositories
  ];
};

const getUserRepository = (
  login: string,
  repository_name: string
): Promise<GithubResponseRepository> => fetchGithubData(
  githubRepositoriesUrlBuilder({
    login,
    noApiTemplate: `repos/${login}/${repository_name}`,
  })
);

export {
  authorizeGithubUser,
  getUserRepositories,
  getUser,
  getUserRepository,
  getTypedRepositories,
};
