import config from "../config";
import { initMongoDb } from "./mongodb";
import { initPostgresql } from "./postgresql";
import { log } from "../utils/logger.utils";

const { db: { dbNames } } = config;

const dbInitializers: { [index: string]: () => void} = {
  [dbNames.mongodb]: initMongoDb,
  [dbNames.postgresql]: initPostgresql,
  nodb: () => log("No db specified, check the config file"),
};

const initDb = (dbName: string) => {
  // eslint-disable-next-line security/detect-object-injection
  const initialize = dbInitializers[dbName] || dbInitializers.nodb;
  return () => initialize();
};

export default initDb;
