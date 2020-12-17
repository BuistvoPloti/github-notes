const mongoose = require("mongoose");
const { log } = require("../utils/logger.utils");
const { mongodb: { databaseURI } } = require("../config");

const initMongoDb = () => {
  mongoose
    .connect(databaseURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      log("DB connected!");
    });
};

module.exports = {
  initMongoDb
};
