import { authAPI } from "../../api/api";
import { SET_USER_DATA } from "./auth.types";
import { setAuthUserData } from "./auth.actions";

let initialState = {
  userId: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setUserData = () => async (dispatch) => {
  await authAPI.me().then((response) => {
    if (response.data.auth) {
      dispatch(
        setAuthUserData(response.data.userId, response.data.login, true)
      );
    }
    return response;
  });
};

export const login = () => async () => {
  await authAPI.logingithub();
};

export const logout = () => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.status === 204) {
    dispatch(setAuthUserData(null, null, false));
  }
};

export default authReducer;
