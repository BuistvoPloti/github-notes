const { Schema, model } = require("mongoose");
const plugins = require("../../utils/mongoose.plugins");

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

plugins.prettifyRecords(UserSchema);

module.exports = model("User", UserSchema);
