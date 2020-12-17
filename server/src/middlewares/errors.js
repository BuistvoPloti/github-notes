const {log} = require("../utils/logger.utils");

function responseErrorHandler(err, req, res, next) {
  log(err.message || "Unknown error occurred. Error message was not specified.");
  next();
}

module.exports = {
  responseErrorHandler,
};
