import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitializeAppAuthType } from "../../types/types";

type InitialStateType = {
  initializedIsAuth: boolean | null,
}

const INITIAL_STATE: InitialStateType = {
  initializedIsAuth: null,
};

const appSlice = createSlice({
  name: "app",
  initialState: INITIAL_STATE,
  reducers: {
    initializeAppAuth: {
      reducer: (state, action: PayloadAction<InitializeAppAuthType>) => {
        state.initializedIsAuth = action.payload.status;
      },
      prepare: (status = false) => ({ payload: { status } }),
    },
  },
});

export default appSlice;
