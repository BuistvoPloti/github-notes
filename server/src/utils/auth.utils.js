const { cookiesConfig } = require("../config");

const authenticateRequest = (req, res, credentials) => {
  req.session.isAuthenticated = true;
  req.session.login = credentials.login;
  req.session.user_id = credentials.user_id;
  res.cookie("access_token", credentials.access_token, cookiesConfig);

};

const setAuthFlag = (userData) => {
  return Boolean(userData);
};

module.exports = {
  authenticateRequest,
  setAuthFlag,
};
