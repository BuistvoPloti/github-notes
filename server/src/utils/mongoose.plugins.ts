import { getFormattedDate } from "./date.utils";

export const prettifyRecords = (baseSchema: { plugin: (arg0: (schema: any) => void) => void; }) => {
  baseSchema.plugin((schema) => {
    // eslint-disable-next-line no-param-reassign
    schema.options.toJSON = {
      virtuals: true,
      versionKey: false,
      transform(_doc: any, ret: any) {
        // eslint-disable-next-line no-param-reassign
        ret.id = ret._id;
        // eslint-disable-next-line no-param-reassign
        delete ret._id;
        // eslint-disable-next-line no-param-reassign
        ret.created_at = getFormattedDate(ret.created_at);
      },
    };
  });
};
