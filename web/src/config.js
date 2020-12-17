export const config = {
  api: {
    port: process.env.PORT,
    repositories_url: process.env.REACT_APP_REPOSITORIES_URL,
    github_repositories_url: process.env.REACT_APP_GITHUB_REPOSITORIES_URL,
    notes_url: process.env.REACT_APP_NOTES_URL,
    logout_url: process.env.REACT_APP_LOGOUT_USER_URL,
  },
  app: {
    oauth_github_url: process.env.REACT_APP_OAUTH_GITHUB_URL,
    github_user_url: process.env.REACT_APP_GITHUB_USER_URL,
  },
};
