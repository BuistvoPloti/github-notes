require("dotenv").config();
const { db: { dbNames } } = require("../config");
const { initMongoDb } = require("./mongodb");
const { initPostgresql } = require("./postgresql");

const strategies = [];

const postgresqlInitStrategy = (databaseName) => {
  (databaseName === dbNames.postgresql) && initPostgresql();
};
strategies.push(postgresqlInitStrategy);

const mongodbInitStrategy = (databaseName) => {
  (databaseName === dbNames.mongodb) && initMongoDb();
};
strategies.push(mongodbInitStrategy);

const initDb = (databaseName) => {
  strategies.forEach(strategy => strategy(databaseName));
};

module.exports = {
  initDb,
};
