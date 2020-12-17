const { Schema, model } = require("mongoose");
const plugins = require("../../utils/mongoose.plugins");

const RepositorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  creator_name: {
    type: String,
    required: true,
  },
  created_at: Date,
});

plugins.prettifyRecords(RepositorySchema);

module.exports = model("Repository", RepositorySchema);
