const { Schema, model } = require("mongoose");
const plugins = require("../../utils/mongoose.plugins");

const NoteSchema = new Schema(
  {
    repository_id: {
      type: String,
      ref: "Repository",
      required: true,
    },
    creator_id: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      required: true,
    },
    created_at: Date,
  },
  {
    virtuals: true,
  }
);

NoteSchema.virtual("related_repository", {
  ref: "Repository",
  localField: "repository_id",
  foreignField: "_id",
});

plugins.prettifyRecords(NoteSchema);

module.exports = model("Note", NoteSchema);
