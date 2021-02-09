import { Document, model, Schema } from "mongoose";
import { IRepository } from "../../types/types";

import * as plugins from "../../utils/mongoose.plugins";

const RepositorySchema: Schema = new Schema({
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

type RepositorySchemaDocument = IRepository & Document;

plugins.prettifyRecords(RepositorySchema);

export default model<RepositorySchemaDocument>("Repository", RepositorySchema);
