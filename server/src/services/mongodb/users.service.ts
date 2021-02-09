import { IUser } from "../../types/types";
import User from "../../models/mongodb/user";

const createUser = async (userBody: IUser) => {
  const userExists: boolean = await User.exists({ user_id: userBody.user_id });
  const newUser: any = !userExists && await new User(userBody);
  return newUser && newUser.save();
};

export {
  createUser,
};
