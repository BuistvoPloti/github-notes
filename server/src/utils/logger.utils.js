const pino = require('pino')();

const log = (body) => {
  pino.info(body)
};

const logChild = (body) => {
  return pino.child(body)
};

const logError = (body) => {
  return pino.error(body)
};

const logWarn = (body) => {
  return pino.warn(body)
};

const logFatal = (body) => {
  return pino.fatal(body)
};

//other pino wrappers.

module.exports = {
  log,
  logChild,
  logError,
  logWarn,
  logFatal
};
