import appSlice from "./app.reducer";

export const { initializeAppAuth } = appSlice.actions;
export const appReducer = appSlice.reducer;
export default appSlice;