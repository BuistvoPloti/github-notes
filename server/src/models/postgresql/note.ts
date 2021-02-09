import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { INote } from "../../types/types";

type NoteModel = Model<INote> & INote;

export type NoteStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): NoteModel;
};

export const Note = (sequelize: Sequelize) => {
  <NoteStatic>sequelize.define("note", {
    repository_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creator_id: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    timestamps: false,
  });
};
