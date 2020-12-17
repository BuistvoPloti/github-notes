require("dotenv").config();
const Sequelize = require("sequelize");
const { postgresql } = require("../../config");
const { log } = require("../../utils/logger.utils");
const models = [
  require("./repository"),
  require("./note"),
  require("./user"),
];

const sequelize = new Sequelize(
  postgresql.database,
  postgresql.username,
  postgresql.password,
  postgresql.options
);

sequelize.authenticate()
  .then(() => log("connected to db successfully!"))
  .catch(err => log(err.message));

for (const model of models) {
  model(sequelize);
}

module.exports = sequelize;
