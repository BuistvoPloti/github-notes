import { SET_USER_DATA } from "./auth.types";

export const setAuthUserData = (userId, login, isAuth) => {
  return {
    type: SET_USER_DATA,
    payload: { userId, login, isAuth },
  };
};