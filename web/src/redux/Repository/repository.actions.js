import {
  SET_REPOSITORIES,
  DELETE_REPOSITORY,
  ADD_REPOSITORY,
  UPDATE_REPOSITORY,
} from "./repository.types";

export const setRepositories = (repositories) => {
  return {
    type: SET_REPOSITORIES,
    repositories,
  };
};

export const deleteRepository = (repository_id) => {
  return {
    type: DELETE_REPOSITORY,
    repository_id,
  };
};

export const addRepositoryAC = (repository) => {
  return {
    type: ADD_REPOSITORY,
    repository,
  };
};

export const updateRepositoryAC = (repository, repository_id) => {
  return {
    type: UPDATE_REPOSITORY,
    repository,
    repository_id,
  };
};
