import {authAPI} from "../api/api";
import {setAuthUserData} from "./Auth/auth.actions";

const SET_INITIALIZED_AUTH = "SET_INITIALIZED_SUCCESSED";

let initialState = {
  initializedIsAuth: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED_AUTH:
      return {
        ...state,
        initializedIsAuth: action.status,
      };
    default:
      return state;
  }
};

export const initializedSuccess = (status = false) => ({
  type: SET_INITIALIZED_AUTH,
  status,
});

export const initializeApp = () => async (dispatch) => {
  await authAPI.me().then((response) => {
    if (response.data.auth) {
      dispatch(initializedSuccess(true));
      dispatch(
        setAuthUserData(response.data.userId, response.data.login, true)
      );
    }else {
      dispatch(initializedSuccess(false));
    }
  });
};

export default appReducer;
