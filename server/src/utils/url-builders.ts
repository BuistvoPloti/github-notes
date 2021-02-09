import config from "../config";

const {
  application: { github_base_url },
} = config;

export const githubRepositoriesUrlBuilder = (
  dataConfig: Record<string, unknown>,
  paginationConfig: Record<string, unknown> = {}
) => {
  const { per_page = 100 } = paginationConfig;
  return dataConfig.noApiTemplate
    ? `${github_base_url}/${dataConfig.noApiTemplate}`
    : `${github_base_url}/users/${dataConfig.login}/${dataConfig.source}?access_token=${dataConfig.access_token}&per_page=${per_page}`;
};

export const githubBaseUrlBuilder = (dataConfig: Record<string, unknown>) => (
  `${github_base_url}/${dataConfig.resource}`
);
