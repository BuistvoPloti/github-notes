import * as pino from "pino";

const logger = pino({
  prettyPrint: {
    colorize: true,
    translateTime: "yyyy-mm-dd HH:MM:ss",
    ignore: "pid,hostname",
  }
});

type LoggerType = {
  (body: any): void;
}

const log: LoggerType = body => logger.info(body);

const logChild: LoggerType = body => logger.child(body);

const logError: LoggerType = body => logger.error(body);

const logWarn: LoggerType = body => logger.warn(body);

const logFatal: LoggerType = body => logger.fatal(body);

export {
  log,
  logChild,
  logError,
  logWarn,
  logFatal
};
