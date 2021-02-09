import { appReducer } from "./App";
import { authReducer } from "./Auth"
import { noteReducer } from "./Note"
import { repositoryReducer } from "./Repository"
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  repositoriesPage: repositoryReducer,
  notesPage: noteReducer,
  auth: authReducer,
  app: appReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType  = ReturnType<RootReducerType>
export default rootReducer;