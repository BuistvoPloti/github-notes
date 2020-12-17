require("dotenv").config();

const env = process.env.NODE_ENV;
const appRoot = require("app-root-path");

const dev = {
  application: {
    port: process.env.PORT,
    baseURL: process.env.BASE_URL,
    client_repositories_url: process.env.CLIENT_REPOSITORIES_URL,
    client_login_url: process.env.CLIENT_LOGIN_URL,
    secret: process.env.COOKIE_SECRET,
    client_app_id: process.env.CLIENT_APP_ID,
    client_app_secret: process.env.CLIENT_APP_SECRET,
    github_auth_url: process.env.GITHUB_AUTH_URL,
    github_base_url: process.env.GITHUB_BASE_URL,
    white_list_urls: [
      "/github/authorize/callback",
      "/github/user",
      "/github/logout",
    ],
    root_path: appRoot.toString(),
  },
  cookiesConfig: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hrs
    signed: true,
    httpOnly: true,
  },
  db: {
    dbNames: {
      postgresql: process.env.DATABASE_NAME_POSTGRESQL,
      mongodb: process.env.DATABASE_NAME_MONGODB,
    },
    currentDbName: process.env.DATABASE_NAME_POSTGRESQL, //or DATABASE_NAME_XXXXX
  },
  mongodb: {
    databaseURI: process.env.DATABASE_URI,
    dbPassword: process.env.DATABASE_PASSWORD,
  },
  postgresql: {
    database: process.env.DATABASE_POSTGRESQL_DATABSE,
    username: process.env.DATABASE_POSTGRESQL_USERNAME,
    password: process.env.DATABASE_POSTGRESQL_PASSWORD,
    options: {
      host: process.env.DATABASE_POSTGRESQL_HOST,
      dialect: process.env.SEQUELIZE_DIALECT,
    }
  }
};

// here should be an object for prod or test

const config = {
  dev,
};

module.exports = config[env];
