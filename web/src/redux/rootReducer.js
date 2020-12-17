import { combineReducers } from "redux";

import repositoryReducer from "./Repository/repository.reducer";
import noteReducer from "./Note/note.reducer";
import authReducer from "./Auth/auth.reducer";
import appReducer from "./app.reducer";

const rootReducer = combineReducers({
  repositoriesPage: repositoryReducer,
  notesPage: noteReducer,
  auth: authReducer,
  app: appReducer,
});

export default rootReducer;
