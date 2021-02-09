import { Document, model, Schema } from "mongoose";
import { INote } from "../../types/types";

import * as plugins from "../../utils/mongoose.plugins";

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
  }
);

type NoteSchemaDocument = INote & Document;

NoteSchema.virtual("related_repository", {
  ref: "Repository",
  localField: "repository_id",
  foreignField: "_id",
});

plugins.prettifyRecords(NoteSchema);

export default model<NoteSchemaDocument>("Note", NoteSchema);
