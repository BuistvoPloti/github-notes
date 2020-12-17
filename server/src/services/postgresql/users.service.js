const { models } = require("../../models/postgresql");

const User = models.user;

const createUser = (userBody) => {
  User.findOne({
    where: {
      login: userBody.login
    }
  })
    .then(user => !user && User.create(userBody));
};

module.exports = {
  createUser,
};
