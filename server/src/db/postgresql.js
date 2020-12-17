const initPostgresql = () => {
  const sequelize = require("../models/postgresql");
  sequelize.sync();
};

module.exports = {
  initPostgresql
};
