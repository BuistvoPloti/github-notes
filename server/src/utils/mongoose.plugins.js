const { getFormattedDate } = require("./date.utils");

const prettifyRecords = (schema) => {
  schema.plugin((schema) => {
    schema.options.toJSON = {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        //ret.repository_id && delete ret.repository_id;
        ret.created_at = getFormattedDate(ret.created_at);
      },
    };
  });
};

module.exports = { prettifyRecords };
