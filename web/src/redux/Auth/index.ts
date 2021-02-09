import authSlice from "./auth.reducer";

export const { setAuthUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;
export default authSlice;