import * as mongoose from "mongoose";
import { log } from "../utils/logger.utils";
import config from "../config";

const { mongodb: { databaseURI } } = config;
const { db: { currentDbName } } = config;

export const initMongoDb = () => {
  mongoose
    .connect(databaseURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      log(`Database ${currentDbName} connected successfully.`);
    });
};
