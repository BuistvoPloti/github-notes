import { Document, model, Schema } from "mongoose";
import { IUser } from "../../types/types";

import * as plugins from "../../utils/mongoose.plugins";

const UserSchema: Schema = new Schema({
  login: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

type UserSchemaDocument = IUser & Document;

plugins.prettifyRecords(UserSchema);

export default model<UserSchemaDocument>("User", UserSchema);
