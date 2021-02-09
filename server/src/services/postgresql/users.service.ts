import { IUser } from "../../types/types";
import { sequelize } from "../../models/postgresql";

const { models } = sequelize();

const User = models.user;

const createUser = async (userBody: IUser): Promise<any> => {
  const user = await User.findOne({
    where: {
      login: userBody.login
    }
  });
  return !user && User.create(userBody);
};

export {
  createUser,
};
