const moment = require("moment");

const getFormattedDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

module.exports = {
  getFormattedDate,
};