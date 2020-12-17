const User = require("../../models/mongodb/user");

const createUser = (userBody) => {
  User.exists({ user_id: userBody.user_id })
    .then(userExists => !userExists && new User(userBody))
    .then(user => user && user.save());
};

module.exports = {
  createUser,
};
