import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { IRepository } from "../../types/types";

type RepositoryModel = Model<IRepository> & IRepository;

export type RepositoryStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): RepositoryModel;
};

export const Repository = (sequelize: Sequelize) => {
  <RepositoryStatic>sequelize.define("repository", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creator_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    timestamps: false,
  });
};
