import React, { useEffect } from "react";
import { Repositories } from "./Repositories";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  deleteRepository,
} from "../../redux/Repository";
import {
  loadRepositories,
} from "../../redux/Repository/repository.actions";
import { AppStateType } from "../../redux/rootReducer";

type Props = DispatchProps & ReturnType<typeof stateToProps>;

const RepositoriesContainer: React.FC<Props> = ({
   isAuth, repositories, initializedIsAuth, deleteRepository, loadRepositories
}) => {
  useEffect(() => {
    loadRepositories(initializedIsAuth);
  }, []);

  return (
    <>
      <Repositories
        githubUser={isAuth}
        repositories={repositories}
        deleteRequestRepository={deleteRepository}
        isAuth={isAuth}
      />
    </>
  )
};

type DispatchProps = {
  loadRepositories: (initializedIsAuth: boolean | null) => void
  deleteRepository: (repository_id: number | string) => void
}

const stateToProps = (state: AppStateType) => {
  return {
    repositories: state.repositoriesPage.repositories,
    isAuth: state.auth.isAuth,
    initializedIsAuth: state.app.initializedIsAuth,
  };
};

const dispatchToProps:DispatchProps = {
  loadRepositories,
  deleteRepository,
};

export default compose(
  connect(stateToProps, dispatchToProps)
)(RepositoriesContainer);
