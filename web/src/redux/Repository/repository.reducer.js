import {
  SET_REPOSITORIES,
  DELETE_REPOSITORY,
  ADD_REPOSITORY,
  UPDATE_REPOSITORY,
} from "./repository.types";
import { repositoriesAPI } from "../../api/api";
import {
  setRepositories,
  deleteRepository,
  addRepositoryAC,
  updateRepositoryAC,
} from "./repository.actions";
import { updateObjectInArray } from "../../utils/object-helpers";

const INITIAL_STATE = {
  repositories: [],
};

const repositoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_REPOSITORIES:
      return {
        ...state,
        repositories: action.repositories,
      };
    case DELETE_REPOSITORY:
      return {
        ...state,
        repositories: state.repositories.filter(
          (repository) => repository.id !== action.repository_id
        ),
      };
    case ADD_REPOSITORY:
      return {
        ...state,
        repositories: [...state.repositories, action.repository],
      };
    case UPDATE_REPOSITORY:
      return {
        ...state,
        repositories: updateObjectInArray(state.repositories, action.repository_id, action.repository),
      };
    default:
      return state;
  }
};

export const requestRepositories = (isAuth) => {
  return async (dispatch) => {
    const data = await repositoriesAPI.getRepositories(isAuth);
    dispatch(setRepositories(data));
  };
};

export const deleteRequestRepository = (repository_id) => {
  return async (dispatch) => {
    await repositoriesAPI.deleteRepositories(repository_id);
    dispatch(deleteRepository(repository_id));
  };
};

export const addRepository = (repository) => {
  return async (dispatch) => {
    await repositoriesAPI.createRepositoryRequest(repository);
    //dispatch(addRepositoryAC(repository))  might use it instead
    const data = await repositoriesAPI.getRepositories();
    dispatch(setRepositories(data));
  };
};

export const updateRepository = (repository) => {
  return async (dispatch) => {
    await repositoriesAPI.updateRepositoryRequest(repository, repository.id);
    dispatch(updateRepositoryAC(repository, repository.id));
  };
};

export default repositoryReducer;