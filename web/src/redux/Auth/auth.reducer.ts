import { authAPI } from "../../api/api";
import { SET_USER_DATA } from "./auth.types"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  userId: number | string | null,
  login: string | null,
  avatar_url: string
  isAuth: boolean,
}

const INITIAL_STATE: InitialStateType = {
  userId: null,
  login: null,
  avatar_url: "",
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setAuthUserData: {
      reducer: (state, action: PayloadAction<InitialStateType>) => {
        state = action.payload;
        return state;
      },
      prepare: (userId, login, isAuth, avatar_url) => ({
        payload: {
          userId,
          login,
          isAuth,
          avatar_url,
        },
      }),
    },
  },
});

const { setAuthUserData } = authSlice.actions;

/*export const login = async () => {
  await authAPI.logingithub();
};*/

export const logout = createAsyncThunk(
  SET_USER_DATA,
  async () => {
    const response = await authAPI.logout();
    if (response.status === 204) {
      setAuthUserData(null, null, false, "")
    }
  }
);

export default authSlice;
