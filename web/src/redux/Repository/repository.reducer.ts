import {
  updateObjectInArray
} from "../../utils/object-helpers";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  AddRepositoryType,
  DeleteRepositoryType,
  IRepository,
  SetRepositoriesType,
  UpdateRepositoryType
} from "../../types/types";

type InitialStateType = {
  repositories: IRepository[],
}

const INITIAL_STATE: InitialStateType = {
  repositories: [],
};

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState: INITIAL_STATE,
  reducers: {
    setRepositories: {
      reducer: (state, action: PayloadAction<SetRepositoriesType>) => {
        state.repositories = action.payload.repositories;
      },
      prepare: (repositories) => ({ payload: { repositories } }),
    },
    deleteRepository: {
      reducer: (state, action: PayloadAction<DeleteRepositoryType>) => {
        state.repositories = state.repositories
          .filter(repo => repo.id != action.payload.repository_id);
      },
      prepare: (repository_id) => ({ payload: { repository_id} }),
    },
    updateRepository: {
      reducer: (state, action: PayloadAction<UpdateRepositoryType>) => {
        state.repositories = updateObjectInArray(
          state.repositories,
          action.payload.repository.id,
          action.payload.repository
        )
      },
      prepare: (repository) => ({ payload: { repository } }),
    },
    addRepository: {
      reducer: (state, action: PayloadAction<AddRepositoryType>) => {
        state.repositories.push(action.payload.repository)
      },
      prepare: (repository) => ({ payload: { repository } }),
    }
  }
});

export default repositoriesSlice;
