const {
  application: { white_list_urls },
} = require("../config");

const authProtection = (req, res, next) => {
  if (req.session.isAuthenticated === false) {
    return res.status(403).send("not authorized!");
  }
  next();
};

const requestUrlModifier = (req, isPublic) => {
  if (isPublic) {
    req.url = req.url.replace("", "/api/public");
    req.originalUrl = req.originalUrl.replace("", "/api/public");
  } else {
    req.url = req.url.replace("", "/api");
    req.originalUrl = req.originalUrl.replace("", "/api");
  }
};

const checkAuthAndPickApiType = (req, res, next) => {
  if (white_list_urls.some((url) => req.originalUrl.includes(url))) {
    requestUrlModifier(req, false);
    return next();
  }

  if (req.session.isAuthenticated) {
    requestUrlModifier(req, false);
  } else {
    requestUrlModifier(req, true);
  }
  next();
};

module.exports = {
  authProtection,
  checkAuthAndPickApiType,
};
