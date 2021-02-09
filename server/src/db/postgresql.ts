import { log } from "../utils/logger.utils";
import config from "../config";

const { db: { currentDbName } } = config;

export const initPostgresql = async () => {
  const db = await import("../models/postgresql");
  db.sequelize().authenticate()
    .then(() => log(`Database ${currentDbName} connected successfully.`))
    .catch((err: { message: string; }) => log(err.message));
  await db.sequelize().sync();
};
