import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { IUser } from "../../types/types";

type UserModel = Model<IUser> & IUser;

export type UserStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): UserModel;
};

export const User = (sequelize: Sequelize) => {
  <UserStatic>sequelize.define("user", {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
