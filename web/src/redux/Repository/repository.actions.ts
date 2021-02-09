import {
  LOAD_REPOSITORIES,
} from "./repository.types";
import {createAction} from "@reduxjs/toolkit";

export const loadRepositories = createAction(LOAD_REPOSITORIES, isAuth => (
  {
    payload: {
      isAuth,
    }
  }
));
